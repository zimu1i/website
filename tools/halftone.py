# Turns assets/photo.jpg into portrait.js (the dot portrait shown by `about`).
# Usage: python3 tools/halftone.py [columns]   — needs Pillow, NumPy, SciPy
import numpy as np, json, sys
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(ROOT, "assets", "photo.jpg")
img = Image.open(src).convert("RGB")
img = img.resize((600, round(600 * img.height / img.width)))
a = np.asarray(img).astype(float)
H, W, _ = a.shape
lum = 0.299*a[...,0] + 0.587*a[...,1] + 0.114*a[...,2]
sat = a.max(-1) - a.min(-1)
yy, xx = np.mgrid[0:H, 0:W]

# crop window, as fractions of the image (keeps head + shoulders)
BOTTOM = 0.72
LEFT, RIGHT = 0.10, 0.90

# background = bright, unsaturated region connected to the top/left/right edges
bright = (lum > 200) & (sat < 35)
lab, n = ndi.label(bright)
bg_labels = set(np.unique(lab[:20])) | set(np.unique(lab[:, :20])) | set(np.unique(lab[:, -20:]))
bg_labels.discard(0)
bg = ndi.binary_dilation(np.isin(lab, list(bg_labels)), iterations=2)

subject = ~bg
subject = ndi.binary_opening(subject, iterations=3)
subject = ndi.binary_fill_holes(subject)
lab, n = ndi.label(subject)
sizes = ndi.sum(subject, lab, range(1, n+1))
subject = lab == (np.argmax(sizes) + 1)
crop = (yy < int(H * BOTTOM)) & (xx > int(W * LEFT)) & (xx < int(W * RIGHT))

# distance from silhouette edge -> rim light
dist = ndi.distance_transform_edt(subject)
rim = np.clip(1 - dist/7, 0, 1) * subject
subject &= crop  # crop after the rim so cut edges do not glow

# tone: normalise lum inside the subject, gamma for contrast
tone = np.clip((lum - 70) / (240 - 70), 0, 1) ** 1.7 * subject
# gentle unsharp mask so eyes/brows/lips read at dot resolution
blur = ndi.gaussian_filter(tone, 6)
tone = np.clip(tone + 1.2 * (tone - blur), 0, 1) * subject
val = np.maximum(tone, rim * 0.9)

COLS = int(sys.argv[1]) if len(sys.argv) > 1 else 72
ys, xs = np.nonzero(subject)
x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
cell = (x1 - x0 + 1) / COLS
ROWS = int(np.ceil((y1 - y0 + 1) / cell))
grid, mask = [], []
for rI in range(ROWS):
    row, mrow = "", ""
    for cI in range(COLS):
        ya, yb = int(y0 + rI*cell), int(y0 + (rI+1)*cell)
        xa, xb = int(x0 + cI*cell), int(x0 + (cI+1)*cell)
        ok = yb > ya and xb > xa
        v = val[ya:yb, xa:xb].mean() if ok else 0
        row += "0123456789"[min(9, int(round(v * 9)))]
        mrow += "1" if ok and subject[ya:yb, xa:xb].mean() > 0.3 else "0"
    grid.append(row)
    mask.append(mrow)

# random sparse dropout in hair for texture, like the reference
rng = np.random.default_rng(3)
out = []
for row in grid:
    out.append("".join(ch if ch != "1" or rng.random() > 0.45 else "0" for ch in row))

open(os.path.join(ROOT, "portrait.js"), "w").write(
    "// Generated from assets/photo.jpg by tools/halftone.py.\n"
    "// data: one digit (0-9) per dot = brightness. mask: 1 where the person is (hides background stars).\n"
    f"const PORTRAIT = {json.dumps({'cols': COLS, 'rows': ROWS, 'data': out, 'mask': mask}, indent=1)};\n")

# preview
S = 10
prev = Image.new("RGB", (COLS*S, ROWS*S), (13, 18, 36))
d = ImageDraw.Draw(prev)
for rI, row in enumerate(out):
    for cI, ch in enumerate(row):
        v = int(ch) / 9
        if v <= 0: continue
        rad = S/2 * (0.25 + 0.75*v)
        cxp, cyp = cI*S + S/2, rI*S + S/2
        d.ellipse([cxp-rad, cyp-rad, cxp+rad, cyp+rad], fill=(200, 185, 255))
prev.save(os.path.join(ROOT, "tools", "preview.png"))
print(COLS, ROWS)
