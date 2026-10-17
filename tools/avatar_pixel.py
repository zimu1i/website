# Detailed chibi pixel-art avatar of Mini Muzi hugging Captain, in the keithpluhm sprite style.
# Authored as a symmetric half-grid (RLE), mirrored to full width, then rendered big on the
# site's starry navy background. Output: profile-readme/avatar.png (+ circle preview).
import os, math, random
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HALF = 17                                   # left half; full sprite = 34 wide
PAL = {
    ".": None,
    "X": (21, 16, 31),      # dark outline
    "D": (43, 33, 66),      # hair darkest
    "d": (63, 48, 92),      # hair base
    "h": (123, 104, 150),   # hair highlight
    "S": (247, 216, 190),   # skin
    "s": (231, 184, 158),   # skin shadow
    "e": (58, 43, 71),      # eye
    "w": (255, 255, 255),   # white / shine
    "B": (244, 140, 160),   # blush
    "m": (201, 96, 120),    # mouth
    "T": (187, 154, 247),   # top (lavender)
    "t": (152, 117, 214),   # top shadow
    "u": (214, 198, 251),   # top highlight
    "W": (241, 234, 217),   # collar / white
    "P": (75, 67, 135),      # skirt
    "p": (55, 48, 107),      # skirt shadow
    "F": (255, 243, 163),   # shoes yellow
    "C": (243, 234, 216),   # cat cream
    "o": (214, 202, 180),   # cat shadow
    "O": (239, 178, 124),   # cat orange
    "N": (244, 136, 154),   # cat nose
    "K": (43, 33, 66),      # cat eyes
}

# Each row = left half (must expand to 17). Mirrored for the right half.
# Legend above. Captain is hugged at the chest (centered, so it stays symmetric).
LEFT = [
    "..............ddd",  # 0
    "...........dddddd",  # 1
    ".........hhdddddd",  # 2
    ".......hhdddddddd",  # 3
    "......hddddddddddd"[:HALF],  # 4
    ".....hdddddddddddd"[:HALF],  # 5
    "....hddddddddddddd"[:HALF],  # 6
    "....ddddddddddddddd"[:HALF], # 7  bangs
    "....dddddddddddddd"[:HALF],  # 8  bangs
    "....dSSSSSSSSSSSSd"[:HALF],  # 9
    "....dSSSSSSSSSSSSS"[:HALF],  # 10
    "....dSSeeeSSSSSSSS"[:HALF],  # 11 eye
    "....dSSewe SSSSSSS".replace(" ", "")[:HALF],  # 12 eye shine
    "....dSSeeeSSSSSSSS"[:HALF],  # 13
    "....dSSSSSSSSSSSSS"[:HALF],  # 14
    "....dSBBSSSSSSSmmS"[:HALF],  # 15 blush + mouth hint
    "....dSSSSSSSSSSmmS"[:HALF],  # 16 mouth
    "....dSSSSSSSSSSSSS"[:HALF],  # 17
    ".....dSSSSSSSSSSSs"[:HALF],  # 18 jaw
    ".....dd SSSS ddddd".replace(" ", "")[:HALF],  # 19 neck + hair to sides
    ".....ddd WWW ddddd".replace(" ", "")[:HALF],  # 20 collar
    ".....ddd TTTTTTTTT".replace(" ", "")[:HALF],  # 21 top
    ".....ddd TTTTuTTTT".replace(" ", "")[:HALF],  # 22 top hi
    ".....dSd TTCCCCCCC".replace(" ", "")[:HALF],  # 23 arm + cat
    ".....dSd TCoCCKCCC".replace(" ", "")[:HALF],  # 24 cat ears/eye
    ".....dSd TCCCCCNCC".replace(" ", "")[:HALF],  # 25 cat nose
    "......dSdTCCCCCCCC".replace(" ", "")[:HALF],  # 26 arm hugging
    "......ddd tTCCCCCo".replace(" ", "")[:HALF],  # 27
    ".......dd tttTTTTT".replace(" ", "")[:HALF],  # 28
    ".......dd PPPPPPPP".replace(" ", "")[:HALF],  # 29 skirt
    "........d PPPPPPPP".replace(" ", "")[:HALF],  # 30
    ".........pPPPPPPPP".replace(" ", "")[:HALF],  # 31
    ".........ppPPPPPPP"[:HALF],  # 32
    "..........SSSS SSS".replace(" ", "")[:HALF],  # 33 legs
    "..........SSSS SSS".replace(" ", "")[:HALF],  # 34 legs
    "..........FFFF FFF".replace(" ", "")[:HALF],  # 35 shoes
]

def expand(row):
    row = row.replace(" ", "")
    return (row + "." * HALF)[:HALF]

grid = []
for i, r in enumerate(LEFT):
    r = expand(r)
    grid.append(r + r[::-1])          # mirror to 34 wide

W = len(grid[0]); H = len(grid)
print("sprite", W, "x", H)

# ---------- render big on starry navy ----------
B = 640
scale = 15
sx = (B - W * scale) // 2
sy = (B - H * scale) // 2 + 10
img = Image.new("RGB", (B, B), (13, 18, 36))
d = ImageDraw.Draw(img, "RGBA")
glow = Image.new("RGBA", (B, B), (0, 0, 0, 0))
ImageDraw.Draw(glow).ellipse([120, -120, 520, 320], fill=(187, 154, 247, 60))
img.paste(glow.filter(ImageFilter.GaussianBlur(70)), (0, 0), glow.filter(ImageFilter.GaussianBlur(70)))
rng = random.Random(11)
for _ in range(55):
    x, y, r = rng.uniform(0, B), rng.uniform(0, B), rng.uniform(1, 2.6)
    c = rng.choice([(255, 255, 255), (255, 243, 163), (187, 154, 247)])
    d.ellipse([x - r, y - r, x + r, y + r], fill=c + (rng.randint(70, 170),))
for r, row in enumerate(grid):
    for c, ch in enumerate(row):
        col = PAL.get(ch)
        if col:
            x0, y0 = sx + c * scale, sy + r * scale
            d.rectangle([x0, y0, x0 + scale - 1, y0 + scale - 1], fill=col)

img.save(os.path.join(ROOT, "profile-readme", "avatar.png"))
mask = Image.new("L", (B, B), 0); ImageDraw.Draw(mask).ellipse([0, 0, B - 1, B - 1], fill=255)
circ = Image.new("RGBA", (B, B), (0, 0, 0, 0)); circ.paste(img, (0, 0), mask)
circ.save(os.path.join(ROOT, "profile-readme", "avatar-circle-preview.png"))
print("saved avatar.png + circle preview")
