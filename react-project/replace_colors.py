import os
import re

dir_path = 'e:/v2 inner/react-project/src'

replacements = {
    r'#D4AF37': '#00F0FF',
    r'#B8860B': '#B026FF',
    r'#FF9933': '#FF00A0',
    r'#050604': '#0B0515',
    r'rgba\(\s*212\s*,\s*175\s*,\s*55': 'rgba(0, 240, 255',
    r'rgba\(\s*255\s*,\s*153\s*,\s*51': 'rgba(255, 0, 160'
}

updated_files = 0
for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith(('.jsx', '.js', '.css')):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            orig_content = content
            for pat, repl in replacements.items():
                content = re.sub(pat, repl, content, flags=re.IGNORECASE)
                
            if content != orig_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated {file_path}")
                updated_files += 1

index_path = 'e:/v2 inner/react-project/index.html'
if os.path.exists(index_path):
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()
    orig = content
    for pat, repl in replacements.items():
        content = re.sub(pat, repl, content, flags=re.IGNORECASE)
    if content != orig:
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated index.html")
        updated_files += 1

print(f"Total files updated: {updated_files}")
