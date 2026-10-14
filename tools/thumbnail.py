# Draws og-image.png (1200x627): the link-preview / LinkedIn "Featured" thumbnail for muzi1i.dev,
# in the site's palette: terminal window, welcome heading, dotted portrait with sparkles, Mini Muzi & Captain.
# Usage: python3 tools/thumbnail.py      (needs Pillow; fonts are in tools/fonts, SIL Open Font License)
import json, math, os, random, re
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, "tools", "fonts")
W, H, S = 1200, 627, 2                      # draw at 2x, then scale down for smooth edges

PAGE, BG, BORDER = (7, 11, 26), (13, 18, 36), (28, 26, 79)
FG, MUTED, PURPLE, VIOLET = (192, 202, 245), (169, 177, 214), (187, 154, 247), (157, 124, 216)
YELLOW, CYAN, ORANGE, PORTRAIT = (255, 243, 163), (125, 207, 255), (255, 158, 100), (200, 185, 255)

def font(name, size, weight):
    f = ImageFont.truetype(os.path.join(FONTS, name), size * S)
    f.set_variation_by_axes([weight])
    return f
mono = lambda size, w=400: font("FiraCode.ttf", size, w)
serif = lambda size, w=600: font("PlayfairItalic.ttf", size, w)

img = Image.new("RGB", (W * S, H * S), PAGE)
d = ImageDraw.Draw(img, "RGBA")
P = lambda *v: [x * S for x in v]

# ---------- starry background with a soft glow ----------
glow = Image.new("RGBA", img.size, (0, 0, 0, 0))
ImageDraw.Draw(glow).ellipse(P(250, -260, 950, 260), fill=(187, 154, 247, 40))
img.paste(glow.filter(ImageFilter.GaussianBlur(90 * S)), (0, 0), glow.filter(ImageFilter.GaussianBlur(90 * S)))
rng = random.Random(7)
for _ in range(170):
    x, y, r = rng.uniform(0, W), rng.uniform(0, H), rng.uniform(0.6, 1.6)
    c = rng.choice([(255, 255, 255), (255, 255, 255), YELLOW, PURPLE])
    d.ellipse(P(x - r, y - r, x + r, y + r), fill=c + (int(rng.uniform(90, 230)),))

def sparkle(cx, cy, size, color, alpha=255):
    pts = []
    for i in range(8):
        a = -math.pi / 2 + i * math.pi / 4
        rad = size if i % 2 == 0 else size * 0.28
        pts.append((cx + rad * math.cos(a), cy + rad * math.sin(a)))
    d.polygon([v * S for p in pts for v in p], fill=color + (alpha,))
for (x, y, s) in [(30, 40, 7), (1170, 70, 6), (20, 590, 5), (1180, 600, 8), (600, 18, 5)]:
    sparkle(x, y, s, YELLOW, 200)

# ---------- terminal window ----------
WX0, WY0, WX1, WY1, TB = 48, 44, 1152, 590, 62
d.rounded_rectangle(P(WX0 + 4, WY0 + 10, WX1 + 4, WY1 + 14), 18 * S, fill=(0, 0, 0, 110))   # shadow
d.rounded_rectangle(P(WX0, WY0, WX1, WY1), 16 * S, fill=BG, outline=BORDER, width=3 * S)
d.line(P(WX0, WY0 + TB, WX1, WY0 + TB), fill=BORDER, width=3 * S)
for i, (col, mark) in enumerate([((255, 95, 87), "x"), ((254, 188, 46), "-"), ((40, 200, 64), "/")]):
    cx, cy = WX0 + 34 + i * 30, WY0 + TB / 2
    d.ellipse(P(cx - 10, cy - 10, cx + 10, cy + 10), fill=col)
    dark = tuple(int(v * 0.45) for v in col)
    if mark == "x": d.line(P(cx - 4, cy - 4, cx + 4, cy + 4), fill=dark, width=2 * S); d.line(P(cx + 4, cy - 4, cx - 4, cy + 4), fill=dark, width=2 * S)
    if mark == "-": d.line(P(cx - 5, cy, cx + 5, cy), fill=dark, width=2 * S)
    if mark == "/": d.polygon(P(cx - 5, cy + 5, cx - 5, cy - 1, cx + 1, cy + 5), fill=dark); d.polygon(P(cx + 5, cy - 5, cx + 5, cy + 1, cx - 1, cy - 5), fill=dark)
t = "muzi@portfolio: ~"
f = mono(17)
d.text(((WX0 + WX1) / 2 * S, (WY0 + TB / 2) * S), t, font=f, fill=(107, 114, 153), anchor="mm")

# ---------- Mini Muzi & Captain on the title bar (same pixel art as mascot.js) ----------
PAL = {"H": (58, 45, 79), "h": (91, 72, 120), "S": (246, 211, 189), "E": (27, 20, 38), "B": (247, 118, 142),
       "T": (187, 154, 247), "t": (157, 124, 216), "P": (75, 67, 135), "F": (255, 243, 163),
       "W": (243, 234, 216), "O": (239, 178, 124), "K": (27, 20, 38), "N": (247, 161, 176)}
MUZI_WAVE = ["...HHHHHH...", "..HHhhHHHH..", ".HHHHHHHHHH.", ".HSSSSSSSSH.", ".HSESSSSESH.", ".HSBSSSSBSH.",
             ".HHSSSSSSHHS", ".HH..SS..HHS", ".HTTTTTTTTHS", ".HTtTTTTtTH.", "..STTTTTT...", "...TTTTTT...",
             "....PPPP....", "....PPPP....", "...FFFFFF...", "............"]
CAT_SIT = ["............", "........O..O", "........OWWO", "........WKWK", "OO.....WWWNW", ".OWWWWWWWWW.",
           "..WOOWWWOWWW", "..WWWWWWWWWW"]
def pixels(rows, x0, y_bottom, scale, flip=False):
    h = len(rows) * scale
    for y, row in enumerate(rows):
        for x, ch in enumerate(row):
            if ch in PAL:
                xx = (len(row) - 1 - x) if flip else x
                d.rectangle(P(x0 + xx * scale, y_bottom - h + y * scale, x0 + (xx + 1) * scale - 0.01, y_bottom - h + (y + 1) * scale - 0.01), fill=PAL[ch])
base = WY0 + TB - 1.5
pixels(CAT_SIT, 880, base, 2.4, flip=True)
pixels(MUZI_WAVE, 920, base, 3.2)
bx, by = 963, WY0 + 12          # speech bubble
d.rounded_rectangle(P(bx, by, bx + 52, by + 22), 9 * S, fill=(22, 28, 54), outline=BORDER, width=2 * S)
d.text(((bx + 26) * S, (by + 11) * S), "hi!", font=mono(13, 500), fill=FG, anchor="mm")

# ---------- heading ----------
x0, y = WX0 + 50, WY0 + TB + 86
f_user = mono(60, 700)
d.text((x0 * S, y * S), "muzi:$", font=f_user, fill=YELLOW, anchor="ls")
user_w = d.textlength("muzi:$ ", font=f_user) / S
f_head = serif(58)
d.text(((x0 + user_w) * S, (y + 2) * S), "welcome to my", font=f_head, fill=(169, 177, 214), anchor="ls")
y2 = y + 72
d.text((x0 * S, y2 * S), "portfolio", font=f_head, fill=(169, 177, 214), anchor="ls")
pw = d.textlength("portfolio", font=f_head) / S
cx, cy, R = x0 + pw + 30, y2 - 20, 17           # the outline ☆
pts = [(cx + (R if i % 2 == 0 else R * 0.42) * math.cos(-math.pi / 2 + i * math.pi / 5),
        cy + (R if i % 2 == 0 else R * 0.42) * math.sin(-math.pi / 2 + i * math.pi / 5)) for i in range(10)]
d.line([v * S for p in pts + pts[:2] for v in p], fill=(169, 177, 214), width=int(3.4 * S), joint="curve")

d.text((x0 * S, (y2 + 52) * S), "type 'help' to start", font=mono(24, 500), fill=VIOLET, anchor="ls")

# tagline + prompt
d.text((x0 * S, (y2 + 118) * S), "Data Science @ UWaterloo", font=mono(19, 500), fill=FG, anchor="ls")
d.text((x0 * S, (y2 + 148) * S), "reinforcement learning · ML · retrieval", font=mono(17), fill=MUTED, anchor="ls")
py = WY1 - 46
parts = [("λ", ORANGE), (" :: ", MUTED), ("~", VIOLET), (" >> ", YELLOW), ("muzi1i.dev", FG)]
xx = x0
f_p = mono(22, 500)
for txt, col in parts:
    d.text((xx * S, py * S), txt, font=f_p, fill=col, anchor="ls")
    xx += d.textlength(txt, font=f_p) / S
d.rectangle(P(xx + 6, py - 20, xx + 18, py + 4), fill=VIOLET)    # block cursor

# ---------- dotted portrait with sparkle stars (same data as the site) ----------
src = open(os.path.join(ROOT, "portrait.js")).read()
port = json.loads(re.search(r"const PORTRAIT = (\{.*\});", src, re.S).group(1))
cols, rows = port["cols"], port["rows"]
PW = 330
cell = PW / cols
px0, py0 = WX1 - PW - 46, WY0 + TB + (WY1 - WY0 - TB - rows * cell) / 2 + 6
STARS = [(9, 10, 9), (63, 7, 6), (66, 38, 7), (5, 42, 5), (54, 22, 3), (18, 27, 3), (40, 2, 2.5)]
def spark(dx, dy, size):
    x, y = abs(dx) / size, abs(dy) / size
    core = 1 - (math.sqrt(x) + math.sqrt(y)) ** 2
    return max(0, min(1, max(core, 0.35 * math.exp(-(x * x + y * y) * 9))))
for r in range(rows):
    for c in range(cols):
        x, y = px0 + (c + 0.5) * cell, py0 + (r + 0.5) * cell
        v = int(port["data"][r][c]) / 9
        if v > 0:
            rad = cell / 2 * (0.25 + 0.75 * v)
            d.ellipse(P(x - rad, y - rad, x + rad, y + rad), fill=PORTRAIT + (int(255 * (0.55 + 0.45 * v)),))
        elif port["mask"][r][c] == "0":
            best = max(spark(c - sc, r - sr, ss) for sc, sr, ss in STARS)
            if best > 0.08:
                rad = cell / 2 * (0.25 + 0.7 * best)
                d.ellipse(P(x - rad, y - rad, x + rad, y + rad), fill=YELLOW + (int(255 * (0.35 + 0.6 * best)),))

out = img.resize((W, H), Image.LANCZOS)
out.save(os.path.join(ROOT, "og-image.png"), optimize=True)
print("saved og-image.png", out.size)
