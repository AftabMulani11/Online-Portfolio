#!/usr/bin/env python3
"""
Stylize the profile portrait into a cinematic duotone that matches the
"Cinematic Cloud" design system. Keeps facial detail natural and flattering.

Input : assets/aftab-profile.jpg
Output: assets/aftab-portrait.png  (duotone, transparent-friendly framing)

Run:  python tools/stylize_portrait.py
"""
from PIL import Image, ImageOps, ImageEnhance, ImageFilter
import os

SRC = os.path.join("assets", "aftab-profile.jpg")
OUT = os.path.join("assets", "aftab-portrait.png")

# Duotone endpoints (shadow -> highlight), tuned to the site palette
SHADOW = (4, 8, 16)       # near-black ink
MID = (24, 88, 132)       # richer mid sky
HIGH = (142, 205, 248)    # sky-glow highlight (not blown out)


def duotone(gray, shadow, mid, high):
    """Map a grayscale image through a 3-stop gradient (shadow->mid->high)."""
    lut_r, lut_g, lut_b = [], [], []
    for i in range(256):
        t = i / 255.0
        if t < 0.5:
            k = t / 0.5
            r = shadow[0] + (mid[0] - shadow[0]) * k
            g = shadow[1] + (mid[1] - shadow[1]) * k
            b = shadow[2] + (mid[2] - shadow[2]) * k
        else:
            k = (t - 0.5) / 0.5
            r = mid[0] + (high[0] - mid[0]) * k
            g = mid[1] + (high[1] - mid[1]) * k
            b = mid[2] + (high[2] - mid[2]) * k
        lut_r.append(int(r)); lut_g.append(int(g)); lut_b.append(int(b))
    return Image.merge("RGB", (
        gray.point(lut_r), gray.point(lut_g), gray.point(lut_b)
    ))


def main():
    im = Image.open(SRC).convert("RGB")

    # --- contrast + tonal cleanup on the face (stronger definition) ---
    gray = ImageOps.grayscale(im)
    gray = ImageOps.autocontrast(gray, cutoff=2)
    gray = ImageEnhance.Contrast(gray).enhance(1.28)
    gray = ImageEnhance.Brightness(gray).enhance(0.94)

    # --- duotone map ---
    duo = duotone(gray, SHADOW, MID, HIGH)

    # --- subtle glow/soften for a cinematic sheen (keeps face crisp) ---
    glow = duo.filter(ImageFilter.GaussianBlur(6))
    duo = Image.blend(duo, glow, 0.18)
    duo = ImageEnhance.Sharpness(duo).enhance(1.15)

    # --- radial vignette so the portrait melts into the dark UI ---
    w, h = duo.size
    mask = Image.new("L", (w, h), 0)
    # build a soft elliptical falloff
    grad = Image.new("L", (w, h), 0)
    px = grad.load()
    cx, cy = w / 2, h / 2.35  # bias toward the face (upper-center)
    maxd = ((cx) ** 2 + (cy) ** 2) ** 0.5
    for y in range(h):
        for x in range(w):
            d = (((x - cx) ** 2 + (y - cy) ** 2) ** 0.5) / maxd
            v = max(0, 1 - d * 0.95)
            px[x, y] = int(255 * (v ** 1.15))
    grad = grad.filter(ImageFilter.GaussianBlur(16))

    # export with real alpha so it can float over the 3D bg
    out_rgba = duo.convert("RGBA")
    out_rgba.putalpha(grad)
    out_rgba.save(OUT)
    print("wrote", OUT, out_rgba.size)

    # also export a solid-ink composite (safe on any background)
    base = Image.new("RGB", (w, h), SHADOW)
    solid = Image.composite(duo, base, grad)
    solid_out = os.path.join("assets", "aftab-portrait-solid.png")
    solid.save(solid_out)
    print("wrote", solid_out, solid.size)


if __name__ == "__main__":
    main()
