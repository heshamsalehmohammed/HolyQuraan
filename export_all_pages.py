import subprocess
import os

os.makedirs("output_svgs", exist_ok=True)

for i in range(1, 614):  # Pages 1 to 613
    output_file = f"output_svgs/page-{i:03}.svg"
    print(f"Exporting page {i:03} → {output_file}")
    subprocess.run([
        "pdftocairo",
        "-svg",
        "-f", str(i),
        "-l", str(i),
        "input.pdf",
        output_file
    ])
