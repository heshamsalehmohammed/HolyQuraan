import os
import re
import subprocess
from lxml import etree
from copy import deepcopy
from svgpathtools import parse_path
from math import inf
from scour import scour
import time


input_dir = "output_svgs"
output_dir = "cleaned_svgs"
os.makedirs(output_dir, exist_ok=True)

SVG_NS = "http://www.w3.org/2000/svg"
XLINK_NS = "http://www.w3.org/1999/xlink"
NSMAP = {"svg": SVG_NS, "xlink": XLINK_NS}

def optimize_with_scour(input_path, output_path):
    start_time = time.time()
    print(f"⚙️ Optimizing {input_path}...")

    try:
        with open(input_path, "r", encoding="utf-8") as fin:
            svg_data = fin.read()

        options = scour.sanitizeOptions([
            "--enable-id-stripping",
            "--enable-comment-stripping",
            "--shorten-ids",
            "--remove-metadata",
            "--strip-xml-prolog",
            "--remove-descriptive-elements",
            "--remove-titles",
            "--remove-editor-data",
            "--create-groups",
            "--enable-viewboxing",
            "--indent=none"
        ])

        optimized_svg = scour.scourString(svg_data, options)

        with open(output_path, "w", encoding="utf-8") as fout:
            fout.write(optimized_svg)

        print(f"✅ Scour optimized: {os.path.basename(output_path)} in {time.time() - start_time:.2f}s")

    except Exception as e:
        print(f"❌ Failed to optimize {input_path}: {e}")



def offset_path_d(d_attr, dx, dy):
    result = []
    is_x = True
    for token in re.findall(r"[MmLlHhVvCcSsQqTtAaZz]|-?\d*\.?\d+(?:e[+-]?\d+)?", d_attr):
        if token.isalpha():
            result.append(token)
            is_x = token.lower() not in ['h', 'v', 'z']
        else:
            value = float(token)
            if is_x:
                result.append(str(value + dx))
            else:
                result.append(str(value + dy))
            is_x = not is_x
    return " ".join(result)

def replace_use_elements(root):
    uses = root.findall(".//svg:use", namespaces=NSMAP)
    for use in uses:
        href = use.get("{http://www.w3.org/1999/xlink}href")
        if not href or not href.startswith("#"):
            continue

        ref_id = href[1:]
        referenced = root.xpath(f".//*[@id='{ref_id}']", namespaces=NSMAP)
        if not referenced:
            continue

        x = float(use.get("x", "0"))
        y = float(use.get("y", "0"))
        clone = deepcopy(referenced[0])

        for path in clone.xpath(".//svg:path", namespaces=NSMAP):
            d = path.get("d")
            if d:
                path.set("d", offset_path_d(d, x, y))

        if "transform" in clone.attrib:
            del clone.attrib["transform"]

        parent = use.getparent()
        parent.replace(use, clone)

def apply_fill_to_internal_paths(g):
    inherited_fill = g.get("fill")
    if inherited_fill:
        for path in g.xpath(".//svg:path", namespaces=NSMAP):
            if "fill" not in path.attrib:
                path.set("fill", inherited_fill)

def ungroup_all(elem, times=10):
    for _ in range(times):
        groups = elem.findall(".//svg:g", namespaces=NSMAP)
        if not groups:
            break
        for g in groups:
            apply_fill_to_internal_paths(g)
            parent = g.getparent()
            index = parent.index(g)
            for child in reversed(g):
                parent.insert(index, child)
            parent.remove(g)

def remove_white_paths(elem):
    for path in elem.findall(".//svg:path", namespaces=NSMAP):
        fill = path.get("fill", "").lower().replace(" ", "")
        if (
            fill in [
                "#ffffff",
                "#ffffffff",
                "rgb(100%,100%,100%)",
                "rgb(95.753479%,43.000793%,74.291992%)"
            ]
            or fill.startswith("url(")
        ):
            path.getparent().remove(path)

def recolor_outer_path(elem):
    for path in elem.findall(".//svg:path", namespaces=NSMAP):
        fill = path.get("fill", "").lower().replace(" ", "")
        if fill in ["#c4006fff", "rgb(76.864624%,0.0869751%,43.592834%)","rgb(53.334045%, 0%, 27.449036%)","rgb(84.707642%, 0%, 49.409485%)","rgb(47.845459%, 0%, 23.606873%)","rgb(92.549133%, 0%, 54.899597%)","rgb(13.729858%, 12.159729%, 12.548828%)","rgb(92.549133%, 0%, 54.899597%)","rgb(53.334045%, 0%, 27.449036%)"]:
            path.set("fill", "#eb008a")

def remove_empty_elements(elem):
    removed = True
    while removed:
        removed = False
        for el in elem.xpath("//*[not(node()) and not(@*)]", namespaces=NSMAP):
            parent = el.getparent()
            if parent is not None:
                parent.remove(el)
                removed = True

def clean_svg(file_path, save_path):
    parser = etree.XMLParser(remove_blank_text=True)
    tree = etree.parse(file_path, parser)
    root = tree.getroot()

    replace_use_elements(root)
    ungroup_all(root)
    remove_white_paths(root)
    recolor_outer_path(root)
    remove_empty_elements(root)

    # Save cleaned file directly (no canvas resizing)
    tree.write(save_path, pretty_print=True, xml_declaration=True, encoding="UTF-8")

    # Final step: optimize using Scour
    optimize_with_scour(save_path, save_path)

for file_name in sorted(os.listdir(input_dir)):
    if file_name.endswith(".svg"):
        in_path = os.path.join(input_dir, file_name)
        out_path = os.path.join(output_dir, file_name)
        try:
            clean_svg(in_path, out_path)
            print(f"✔ Cleaned: {file_name}")
        except Exception as e:
            print(f"❌ Error in {file_name}: {e}")

print("✅ All files cleaned and saved to 'cleaned_svgs/'")
