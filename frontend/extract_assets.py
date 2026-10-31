import re

with open("stitch_original.html") as f:
    html = f.read()

images = re.findall(r"<img[^>]+>", html)
for img in images:
    src_m = re.search(r"src=[\"']([^\"']+)[\"']", img)
    alt_m = re.search(r"alt=[\"']([^\"']*)[\"']", img)
    src = src_m.group(1) if src_m else "no-src"
    alt = alt_m.group(1) if alt_m else "no-alt"
    print(f"IMG [{alt}]: {src}")

bgs = re.findall(r"url\(['\"]?(https://[^'\")]+)", html)
for bg in bgs:
    print(f"BG: {bg}")

