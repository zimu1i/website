# Renders four tiny looping mascot "mood" GIFs (transparent bg) for the profile README:
#   muzi-dance.gif, muzi-tennis.gif, muzi-coffee.gif, muzi-sleep.gif
# Same pixel art / palette as mascot.js. Usage: python3 tools/mascot_moods.py  (needs Pillow)
import os
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "profile-readme")
PAL = {"H": (58, 45, 79), "h": (91, 72, 120), "S": (246, 211, 189), "E": (27, 20, 38), "B": (247, 118, 142),
       "T": (187, 154, 247), "t": (157, 124, 216), "P": (75, 67, 135), "F": (255, 243, 163),
       "W": (243, 234, 216), "O": (239, 178, 124), "K": (27, 20, 38), "N": (247, 161, 176),
       "y": (255, 243, 163), "g": (217, 242, 107), "r": (187, 154, 247), "k": (120, 90, 70), "c": (255, 255, 255)}

HEAD = ["...HHHHHH...", "..HHhhHHHH..", ".HHHHHHHHHH.", ".HSSSSSSSSH.",
        ".HSESSSSESH.", ".HSBSSSSBSH.", ".HHSSSSSSHH.", ".HH..SS..HH."]
BODY = [".HTTTTTTTTH.", ".HTtTTTTtTH.", "..STTTTTTS..", "...TTTTTT..."]
LEGS_A = ["...PP..PP...", "..PP....PP..", ".FFF....FFF.", "............"]
LEGS_B = ["....PPPP....", "....PPPP....", "...FFFFFF...", "............"]
ARMS_UP = ["SHTTTTTTTTHS", ".HTtTTTTtTH.", "..STTTTTTS..", "...TTTTTT..."]
ARM_R = [".HTTTTTTTTHS", ".HTtTTTTtTH.", "..STTTTTT...", "...TTTTTT..."]
ARM_L = ["SHTTTTTTTTH.", ".HTtTTTTtTH.", "...TTTTTTS..", "...TTTTTT..."]
WAVEHEAD = HEAD[:6] + [".HHSSSSSSHHS", ".HH..SS..HHS"]

def canvas(w, h):
    return Image.new("RGBA", (w, h), (0, 0, 0, 0))

def blit(im, rows, x0, y0, s, flip=False, pal=PAL):
    d = ImageDraw.Draw(im)
    w = len(rows[0])
    for y, row in enumerate(rows):
        for x, ch in enumerate(row):
            if ch in pal:
                xx = (w - 1 - x) if flip else x
                d.rectangle([x0 + xx * s, y0 + y * s, x0 + (xx + 1) * s - 1, y0 + (y + 1) * s - 1], fill=pal[ch])

def px(im, x, y, s, col):
    ImageDraw.Draw(im).rectangle([x, y, x + s - 1, y + s - 1], fill=col)

S = 5                      # pixel scale
CW, CH = 90, 110           # canvas
FX = (CW - 12 * S) // 2    # sprite x so the 12-wide sprite is centred

def save_gif(frames, name, dur):
    def to_p(im):
        a = im.split()[3]
        p = im.convert("RGB").convert("P", palette=Image.ADAPTIVE, colors=255)
        p.paste(255, Image.eval(a, lambda v: 255 if v <= 128 else 0))
        return p
    ps = [to_p(f) for f in frames]
    ps[0].save(os.path.join(OUT, name), save_all=True, append_images=ps[1:],
               transparency=255, disposal=2, loop=0, duration=dur, optimize=False)
    print("saved", name)

def base(lift=0, head=HEAD, arms=BODY, legs=LEGS_B):
    im = canvas(CW, CH)
    top = CH - 16 * S - lift
    blit(im, head + arms + legs, FX, top, S)
    return im, top

# ---------- dance: arms up, hop, music notes ----------
dance = []
for k in range(4):
    lift = [0, 6, 10, 6][k]
    im, top = base(lift, head=WAVEHEAD, arms=ARMS_UP, legs=LEGS_A if k % 2 else LEGS_B)
    note = PAL["y"] if k % 2 else PAL["r"]
    nx = FX + (12 * S) + 4 + (k % 2) * 3
    px(im, nx, top + 4 - k, S, note); px(im, nx + S, top - 3 - k, S, note)
    px(im, nx + S, top + 4 - k, S, note); px(im, nx + S, top - 1 - k, S, note)
    px(im, FX - 10, top + 20, S, PAL["r"] if k % 2 else PAL["y"])
    dance.append(im)
save_gif(dance, "muzi-dance.gif", 200)

# ---------- tennis: swing a racket + ball ----------
tennis = []
for k in range(4):
    im, top = base(0, arms=ARM_R, legs=LEGS_A if k % 2 else LEGS_B)
    d = ImageDraw.Draw(im)
    # racket in the raised right hand
    hx, hy = FX + 12 * S - S, top + 16 * S - 14 * S
    ang = [0, -6, 2, -6][k]
    rcx, rcy = hx + 16, hy - 10 + ang
    d.ellipse([rcx - 11, rcy - 13, rcx + 11, rcy + 13], outline=PAL["r"], width=3)
    d.line([hx, hy, rcx - 6, rcy + 10], fill=PAL["t"], width=3)
    # ball
    bx, by = rcx + [20, 6, 24, 6][k], rcy - [6, 2, 10, 2][k]
    d.ellipse([bx - 4, by - 4, bx + 4, by + 4], fill=PAL["g"])
    tennis.append(im)
save_gif(tennis, "muzi-tennis.gif", 170)

# ---------- coffee: hold a mug, steam, little sip ----------
coffee = []
for k in range(4):
    lift = [0, 0, 1, 0][k]
    im, top = base(lift, arms=ARM_R if k < 2 else BODY, legs=LEGS_B)
    d = ImageDraw.Draw(im)
    mx, my = FX + 12 * S - 2, top + 11 * S
    d.rectangle([mx, my, mx + 16, my + 14], fill=PAL["W"], outline=PAL["k"])
    d.rectangle([mx + 2, my + 2, mx + 14, my + 5], fill=(90, 60, 45))   # coffee
    d.arc([mx + 14, my + 2, mx + 24, my + 12], -90, 90, fill=PAL["k"], width=2)  # handle
    for i in range(3):                                                   # steam
        sx = mx + 4 + i * 5
        sy = my - 6 - ((k + i) % 3) * 3
        px(im, sx, sy, 3, (220, 220, 230, 160))
    coffee.append(im)
save_gif(coffee, "muzi-coffee.gif", 230)

# ---------- sleep: sit with Captain, growing z z z ----------
CAT = ["............", "........O..O", "........OWWO", "........WKWK",
       "OO.....WWWNW", ".OWWWWWWWWW.", "..WOOWWWOWWW", "..WWWWWWWWWW"]
SLEEPHEAD = HEAD[:4] + [".HSEESSEESH."] + HEAD[5:]
SIT = SLEEPHEAD + BODY + [".PPPPPPPPPP.", ".FF......FF.", "............", "............"]
sleep = []
for k in range(4):
    im = canvas(CW, CH)
    top = CH - 16 * S
    blit(im, SIT, FX, top, S)
    blit(im, CAT, FX + 2, CH - 8 * (S - 1) - 10, S - 1)
    d = ImageDraw.Draw(im)
    for i in range(k % 4):                                              # z z z rising
        zx, zy, zs = FX + 12 * S - 2 + i * 7, top + 2 - i * 9, 2 + i
        d.line([zx, zy, zx + 4 + zs, zy], fill=PAL["r"], width=2)
        d.line([zx + 4 + zs, zy, zx, zy + 5 + zs], fill=PAL["r"], width=2)
        d.line([zx, zy + 5 + zs, zx + 4 + zs, zy + 5 + zs], fill=PAL["r"], width=2)
    sleep.append(im)
save_gif(sleep, "muzi-sleep.gif", 320)
print("done")
