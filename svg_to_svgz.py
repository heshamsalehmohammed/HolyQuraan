#!/usr/bin/env python3
# svg_to_svgz.py
import os, gzip, shutil, time

SRC_DIR  = "cleaned_svgs"
DST_DIR  = "compressed_svgz"
os.makedirs(DST_DIR, exist_ok=True)

def svg_to_svgz(src_path: str, dst_path: str, level: int = 9) -> None:
    """Read an .svg file and write a .svgz (gz-compressed) twin."""
    with open(src_path, "rb") as fin, gzip.open(dst_path, "wb", compresslevel=level) as fout:
        shutil.copyfileobj(fin, fout)

def main() -> None:
    t0 = time.time()
    for name in sorted(os.listdir(SRC_DIR)):
        if not name.lower().endswith(".svg"):
            continue
        src = os.path.join(SRC_DIR, name)
        dst = os.path.join(DST_DIR, name + "z")          # page-001.svg  → page-001.svgz
        try:
            svg_to_svgz(src, dst)
            size_svg  = os.path.getsize(src)
            size_svgz = os.path.getsize(dst)
            ratio     = 100 * size_svgz / size_svg
            print(f"✔ {name:25}  →  {os.path.basename(dst):25} "
                  f"{size_svg/1024:7.1f} kB → {size_svgz/1024:7.1f} kB  "
                  f"({ratio:5.1f} %)")
        except Exception as exc:
            print(f"✘ {name}: {exc}")
    print(f"Done in {time.time() - t0:.1f}s  ➜  {DST_DIR}/")

if __name__ == "__main__":
    main()
