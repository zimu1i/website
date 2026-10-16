# Renders mascot-banner.gif: a looping terminal-strip banner with Mini Muzi walking
# (and Captain the cat trotting behind), using the same pixel art as mascot.js.
# Usage: python3 tools/mascot_gif.py        (needs Pillow; font in tools/fonts)
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = ImageFont.truetype(os.path.join(ROOT, "tools", "fonts", "FiraCode.ttf"), 15)

PAL = {"H": (58, 45, 79), "h": (91, 72, 120), "S": (246, 211, 189), "E": (27, 20, 38), "B": (247, 118, 142),
       "T": (187, 154, 247), "t": (157, 124, 216), "P": (75, 67, 135), "F": (255, 243, 163),
       "W": (243, 234, 216), "O": (239, 178, 124), "K": (27, 20, 38), "N": (247, 161, 176)}
BG, BAR, BORDER, MUTED, YELLOW, PURPLE = (13, 18, 36), (13, 18, 36), (42, 40, 119), (107, 114, 153), (255, 243, 163), (187, 154, 247)

HEAD = ["...HHHHHH...", "..HHhhHHHH..", ".HHHHHHHHHH.", ".HSSSSSSSSH.",
        ".HSESSSSESH.", ".HSBSSSSBSH.", ".HHSSSSSSHH.", ".HH..SS..HH."]
BODY = [".HTTTTTTTTH.", ".HTtTTTTtTH.", "..STTTTTTS..", "...TTTTTT..."]
LEGS_A = ["...PP..PP...", "..PP....PP..", ".FFF....FFF.", "............"]
LEGS_B = ["....PPPP....", "....PPPP....", "...FFFFFF...", "............"]
ARM = [".HTTTTTTTTHS", ".HTtTTTTtTH.", "..STTTTTT...", "...TTTTTT..."]
WAVEHEAD = HEAD[:6] + [".HHSSSSSSHHS", ".HH..SS..HHS"]
MUZI = {"a": HEAD + BODY + LEGS_A, "b": HEAD + BODY + LEGS_B,
        "wave": WAVEHEAD + ARM + LEGS_B}
CAT = {"a": ["........O..O", "........OWWO", "O.......WKWK", "OO.....WWWNW",
             ".OWWWWWWWWW.", "..WOOWWWOWW.", "..WWWWWWWWW.", "..W.W..W.W.."],
       "b": ["........O..O", "........OWWO", ".O......WKWK", ".O.....WWWNW",
             ".OWWWWWWWWW.", "..WOOWWWOWW.", "..WWWWWWWWW.", "...W.W.W.W.."]}

def blit(d, rows, x0, y0, scale, flip):
    w = len(rows[0])
    for y, row in enumerate(rows):
        for x, ch in enumerate(row):
            if ch in PAL:
                xx = (w - 1 - x) if flip else x
                d.rectangle([x0 + xx * scale, y0 + y * scale,
                             x0 + (xx + 1) * scale - 1, y0 + (y + 1) * scale - 1], fill=PAL[ch])

W, H, BARH = 820, 180, 40
MS, CS = 5, 4                         # muzi / cat pixel scale
GROUND = 164          # the feet line
STARS = [(60, 70, PURPLE), (140, 58, (255, 255, 255)), (260, 80, YELLOW), (360, 62, (255, 255, 255)),
         (470, 74, PURPLE), (560, 60, YELLOW), (660, 78, (255, 255, 255)), (740, 66, PURPLE), (780, 92, (255, 255, 255))]

# Muzi bounces left<->right; frames list of (x, facing, moving)
path = []
L, R = 70, 600
for x in range(L, R, 7): path.append((x, 1))
for _ in range(6): path.append((R, 1))          # pause + wave at the right
for x in range(R, L, -7): path.append((x, -1))
for _ in range(6): path.append((L, -1))         # pause at the left

frames = []
for i, (mx, face) in enumerate(path):
    im = Image.new("RGB", (W, H), BG)
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
    cat_frame = "a" if (i // 2) % 2 else "b"
    cx = mx - face * 54
    blit(d, CAT[cat_frame], int(cx), GROUND - CS * 8, CS, face < 0)
    # muzi
    if paused and face == 1:
        pose = MUZI["wave"] if (i // 2) % 2 else MUZI["b"]
    else:
        pose = MUZI["a"] if (i // 2) % 2 else MUZI["b"]
    blit(d, pose, mx, GROUND - MS * 16, MS, face < 0)
    frames.append(im)

out = os.path.join(ROOT, "mascot-banner.gif")
frames[0].save(out, save_all=True, append_images=frames[1:], duration=110, loop=0, optimize=True, disposal=2)
print("saved", out, len(frames), "frames")
