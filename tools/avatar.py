# Draws avatar.png: a cute, detailed GitHub profile picture of Mini Muzi with Captain peeking,
# in the site's palette. Square PNG (GitHub circle-crops it). Usage: python3 tools/avatar.py
import os, math, random
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = 640; S = 3; W = B * S                 # supersample x3, then downscale
P = lambda *v: [x * S for x in v]

BG, BG2 = (13, 18, 36), (20, 16, 52)
SKIN, SKIN_SH = (247, 214, 194), (233, 190, 168)
HAIR, HAIR_HI = (58, 45, 79), (86, 66, 112)
TOP, TOP_SH, COLLAR = (187, 154, 247), (157, 124, 216), (243, 238, 250)
BLUSH, MOUTH, BROW = (247, 150, 168), (201, 97, 120), (74, 58, 92)
EYE, WHITE, SHINE = (42, 32, 58), (255, 255, 255), (200, 185, 255)
CATW, CATO, CATN, CATK = (245, 237, 222), (239, 178, 124), (247, 161, 176), (42, 32, 58)
YELLOW, PURPLE = (255, 243, 163), (187, 154, 247)

img = Image.new("RGB", (W, W), BG)
d = ImageDraw.Draw(img, "RGBA")

# ---------- background: soft glow + stars ----------
glow = Image.new("RGBA", (W, W), (0, 0, 0, 0))
ImageDraw.Draw(glow).ellipse(P(120, -120, 520, 320), fill=(187, 154, 247, 70))
img.paste(glow.filter(ImageFilter.GaussianBlur(70 * S)), (0, 0), glow.filter(ImageFilter.GaussianBlur(70 * S)))
rng = random.Random(11)
for _ in range(60):
    x, y, r = rng.uniform(0, B), rng.uniform(0, B), rng.uniform(1.2, 3)
    c = rng.choice([(255, 255, 255), YELLOW, PURPLE, (255, 255, 255)])
    d.ellipse(P(x - r, y - r, x + r, y + r), fill=c + (rng.randint(70, 180),))
def star4(cx, cy, s, col):
    pts = [(cx + (s if i % 2 == 0 else s * 0.3) * math.cos(-math.pi / 2 + i * math.pi / 4),
            cy + (s if i % 2 == 0 else s * 0.3) * math.sin(-math.pi / 2 + i * math.pi / 4)) for i in range(8)]
    d.polygon([v * S for p in pts for v in p], fill=col)
star4(120, 110, 18, YELLOW); star4(540, 150, 12, PURPLE); star4(90, 360, 9, YELLOW)

CX = 320
# ---------- hair (back) ----------
d.ellipse(P(CX - 150, 120, CX + 150, 430), fill=HAIR)                 # head mass
for sx in (CX - 150, CX + 92):                                        # two long locks down past shoulders
    d.rounded_rectangle(P(sx, 250, sx + 58, 600), 28 * S, fill=HAIR)
d.ellipse(P(CX - 128, 150, CX + 128, 300), fill=HAIR_HI)              # subtle top highlight
d.ellipse(P(CX - 150, 170, CX + 150, 430), fill=HAIR)

# ---------- face ----------
d.ellipse(P(CX - 96, 196, CX + 96, 420), fill=SKIN)
d.ellipse(P(CX - 96, 300, CX + 96, 420), fill=SKIN_SH)               # soft jaw shade
d.ellipse(P(CX - 96, 196, CX + 96, 404), fill=SKIN)
# ears
for ex in (CX - 92, CX + 76):
    d.ellipse(P(ex, 300, ex + 20, 340), fill=SKIN_SH)

# ---------- bangs (blunt fringe) ----------
d.pieslice(P(CX - 104, 150, CX + 104, 320), 180, 360, fill=HAIR)      # forehead cap
d.rectangle(P(CX - 104, 232, CX + 104, 262), fill=HAIR)
for i in range(-3, 4):                                                # little fringe tips
    bx = CX + i * 30
    d.polygon(P(bx - 16, 258, bx + 16, 258, bx, 272), fill=HAIR)
d.polygon(P(CX - 104, 232, CX - 150, 250, CX - 150, 360, CX - 96, 300), fill=HAIR)   # left temple
d.polygon(P(CX + 104, 232, CX + 150, 250, CX + 150, 360, CX + 96, 300), fill=HAIR)   # right temple

# ---------- eyebrows ----------
for bx in (CX - 52, CX + 20):
    d.arc(P(bx, 288, bx + 32, 312), 200, 340, fill=BROW, width=4 * S)

# ---------- eyes (big & cute) ----------
for ex in (CX - 46, CX + 18):
    d.ellipse(P(ex, 300, ex + 28, 338), fill=WHITE)
    d.ellipse(P(ex + 3, 303, ex + 25, 336), fill=EYE)                # iris
    d.ellipse(P(ex + 12, 309, ex + 23, 324), fill=SHINE, )           # big shine
    d.ellipse(P(ex + 16, 312, ex + 22, 320), fill=WHITE)
    d.ellipse(P(ex + 6, 326, ex + 11, 331), fill=(255, 255, 255, 160))
# lashes
for ex in (CX - 46, CX + 18):
    d.arc(P(ex - 1, 298, ex + 29, 340), 200, 340, fill=EYE, width=3 * S)

# ---------- blush, nose, mouth ----------
for bx in (CX - 70, CX + 42):
    d.ellipse(P(bx, 350, bx + 28, 368), fill=BLUSH + (150,))
d.ellipse(P(CX - 4, 344, CX + 4, 352), fill=SKIN_SH)
d.arc(P(CX - 20, 356, CX + 20, 384), 20, 160, fill=MOUTH, width=4 * S)   # smile
d.polygon(P(CX - 7, 372, CX + 7, 372, CX, 382), fill=(247, 160, 170))    # little tongue/lip

# ---------- shoulders / top ----------
top = Image.new("RGBA", (W, W), (0, 0, 0, 0))
dt = ImageDraw.Draw(top)
dt.ellipse(P(CX - 190, 470, CX + 190, 760), fill=TOP)
dt.ellipse(P(CX - 190, 540, CX + 190, 820), fill=TOP_SH)
dt.ellipse(P(CX - 190, 470, CX + 190, 740), fill=TOP)
img.paste(top, (0, 0), top)
d = ImageDraw.Draw(img, "RGBA")
# little collar
d.polygon(P(CX - 40, 452, CX, 500, CX - 8, 455), fill=COLLAR)
d.polygon(P(CX + 40, 452, CX, 500, CX + 8, 455), fill=COLLAR)
# front hair locks over the top
for sx in (CX - 150, CX + 92):
    d.rounded_rectangle(P(sx, 360, sx + 58, 600), 28 * S, fill=HAIR)
    d.rounded_rectangle(P(sx + 8, 380, sx + 20, 560), 8 * S, fill=HAIR_HI)

# ---------- Captain peeking (bottom-right) ----------
ccx, ccy = 436, 540
d.ellipse(P(ccx - 150, ccy + 40, ccx + 150, ccy + 300), fill=CATW)   # body peeking over shoulder
d.polygon(P(ccx - 46, ccy - 34, ccx - 18, ccy + 10, ccx - 70, ccy + 8), fill=CATW)   # ears
d.polygon(P(ccx + 46, ccy - 34, ccx + 18, ccy + 10, ccx + 70, ccy + 8), fill=CATW)
d.polygon(P(ccx - 40, ccy - 24, ccx - 24, ccy + 4, ccx - 56, ccy + 4), fill=CATN)
d.polygon(P(ccx + 40, ccy - 24, ccx + 24, ccy + 4, ccx + 56, ccy + 4), fill=CATN)
d.ellipse(P(ccx - 58, ccy - 20, ccx + 58, ccy + 92), fill=CATW)      # head
d.chord(P(ccx - 58, ccy - 40, ccx + 10, ccy + 50), 90, 270, fill=CATO + (180,))      # orange patch
for ex in (ccx - 30, ccx + 12):                                      # eyes looking up
    d.ellipse(P(ex, ccy + 20, ex + 18, ccy + 42), fill=CATK)
    d.ellipse(P(ex + 9, ccy + 22, ex + 15, ccy + 28), fill=WHITE)
d.polygon(P(ccx - 6, ccy + 44, ccx + 6, ccy + 44, ccx, ccy + 52), fill=CATN)         # nose
d.arc(P(ccx - 14, ccy + 48, ccx, ccy + 62), 20, 160, fill=CATK, width=2 * S)
d.arc(P(ccx, ccy + 48, ccx + 14, ccy + 62), 20, 160, fill=CATK, width=2 * S)
for wy in (ccy + 44, ccy + 52):                                      # whiskers
    d.line(P(ccx - 30, wy, ccx - 72, wy - 6), fill=(180, 170, 160, 180), width=2 * S)
    d.line(P(ccx + 30, wy, ccx + 72, wy - 6), fill=(180, 170, 160, 180), width=2 * S)

star4(196, 470, 10, YELLOW)

final = img.resize((B, B), Image.LANCZOS)
final.save(os.path.join(ROOT, "profile-readme", "avatar.png"))
mask = Image.new("L", (B, B), 0)
ImageDraw.Draw(mask).ellipse([0, 0, B - 1, B - 1], fill=255)
circ = Image.new("RGBA", (B, B), (0, 0, 0, 0)); circ.paste(final, (0, 0), mask)
circ.save(os.path.join(ROOT, "profile-readme", "avatar-circle-preview.png"))
print("saved avatar.png + circle preview")
