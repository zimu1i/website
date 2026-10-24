# Renders mascot-banner.gif: a looping terminal-strip banner with Mini Muzi walking
# (and Captain the cat trotting behind), using the same sprites as mascot.js.
# Muzi is the chibi in tools/muzi-chibi.png; she hop-steps while walking and sways to wave.
# Usage: python3 tools/mascot_gif.py        (needs Pillow; font in tools/fonts)
import os, re
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = ImageFont.truetype(os.path.join(ROOT, "tools", "fonts", "FiraCode.ttf"), 15)

BG, BAR, BORDER, MUTED, YELLOW, PURPLE = (13, 18, 36), (13, 18, 36), (42, 40, 119), (107, 114, 153), (255, 243, 163), (187, 154, 247)

# Captain's frames and colors are read straight from mascot.js so the two never drift apart
JS = open(os.path.join(ROOT, "mascot.js")).read()
_cat = JS[JS.index("const CAT = {"):]
_cat = _cat[:_cat.index("\n  };")]
CAT = {m.group(1)[4]: re.findall(r'"([.A-Z]+)"', m.group(2))      # walkA -> "A", walkB -> "B"
       for m in re.finditer(r"(\w+): \[(.*?)\]", _cat, re.S) if m.group(1).startswith("walk")}
PAL = {k: tuple(int(v[i:i + 2], 16) for i in (1, 3, 5))
       for k, v in re.findall(r'\b([A-Z]): "(#[0-9a-f]{6})"', JS)}

def blit(d, rows, x0, y0, scale, flip):
    w = len(rows[0])
    for y, row in enumerate(rows):
        for x, ch in enumerate(row):
            if ch in PAL:
                xx = (w - 1 - x) if flip else x
                d.rectangle([x0 + xx * scale, y0 + y * scale,
                             x0 + (xx + 1) * scale - 1, y0 + (y + 1) * scale - 1], fill=PAL[ch])

W, H, BARH = 820, 180, 40
MS = CS = 2                           # muzi / cat pixel scale (same, so they match)
GROUND = 166          # the feet line
STARS = [(60, 70, PURPLE), (140, 58, (255, 255, 255)), (260, 80, YELLOW), (360, 62, (255, 255, 255)),
         (470, 74, PURPLE), (560, 60, YELLOW), (660, 78, (255, 255, 255)), (740, 66, PURPLE), (780, 92, (255, 255, 255))]

chibi = Image.open(os.path.join(ROOT, "tools", "muzi-chibi.png")).convert("RGBA")
MUZI = chibi.resize((chibi.width * MS, chibi.height * MS), Image.NEAREST)
MW, MH = MUZI.size

def muzi_pose(face, tilt):
    im = MUZI.transpose(Image.FLIP_LEFT_RIGHT) if face < 0 else MUZI
    if tilt:   # pad first so the rotation pivots at her feet
        pad = Image.new("RGBA", (MW, MH * 2), (0, 0, 0, 0)); pad.paste(im, (0, 0))
        im = pad.rotate(tilt, resample=Image.NEAREST, center=(MW / 2, MH)).crop((0, 0, MW, MH))
    return im

# Muzi bounces left<->right; frames list of (x, facing)
path = []
L, R = 70, 640
for x in range(L, R, 7): path.append((x, 1))
for _ in range(6): path.append((R, 1))          # pause + wave at the right
for x in range(R, L, -7): path.append((x, -1))
for _ in range(6): path.append((L, -1))         # pause at the left

frames = []
for i, (mx, face) in enumerate(path):
    im = Image.new("RGBA", (W, H), BG + (255,))
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, W - 1, H - 1], outline=BORDER, width=2)
    # title bar
    d.line([(0, BARH), (W, BARH)], fill=BORDER, width=2)
    for j, c in enumerate([(255, 95, 87), (254, 188, 46), (40, 200, 64)]):
        d.ellipse([20 + j * 26, BARH // 2 - 7, 34 + j * 26, BARH // 2 + 7], fill=c)
    d.text((W // 2, BARH // 2), "muzi@portfolio: ~", font=FONT, fill=MUTED, anchor="mm")
    for (sx, sy, sc) in STARS:
        d.rectangle([sx, sy, sx + 2, sy + 2], fill=sc)
    # cat trails behind in the direction of travel
    paused = i > 0 and path[i][0] == path[i - 1][0]
    rows = CAT["A" if (i // 2) % 2 else "B"]
    cx = mx - CS * len(rows[0]) - 4 if face > 0 else mx + MW + 4
    blit(d, rows, int(cx), GROUND - CS * len(rows), CS, face < 0)
    # muzi: hop-steps while walking, sways side to side while waving at the right
    step = (i // 2) % 2
    if paused and face == 1:
        pose, lift = muzi_pose(face, 8 if step else -8), 0
    else:
        pose, lift = muzi_pose(face, 0), 0 if paused else 4 * step
    im.alpha_composite(pose, (mx, GROUND - MH - lift))
    frames.append(im.convert("RGB"))

out = os.path.join(ROOT, "mascot-banner.gif")
frames[0].save(out, save_all=True, append_images=frames[1:], duration=110, loop=0, optimize=True, disposal=2)
print("saved", out, len(frames), "frames")
