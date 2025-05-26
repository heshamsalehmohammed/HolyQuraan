#!/bin/bash

# Set variables
PDF_FILE="hafs_shuba.pdf"
OUTPUT_DIR="$(dirname "$PDF_FILE")/hafs_shuba_svgs"
TOTAL_PAGES=20

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Loop over all pages
for i in $(seq 1 $TOTAL_PAGES); do
  PAGE_NUM=$(printf "%03d" $i)
  inkscape --pdf-page=$i "$PDF_FILE" \
    --export-type=svg \
    --export-filename="$OUTPUT_DIR/page-$PAGE_NUM.svg"
  echo "Exported page $i to $OUTPUT_DIR/page-$PAGE_NUM.svg"
done
