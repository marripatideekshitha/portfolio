import sys

file_path = r"c:\Users\hp\Downloads\portfolyo-main\portfolyo-main\src\components\ResumeSections.jsx"
with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if '<div className="scroll-section-wrapper">' in line:
        start_idx = i
        break

for i in range(len(lines)-1, -1, -1):
    if '</>' in lines[i]:
        end_idx = i - 1
        break

if start_idx != -1 and end_idx != -1:
    new_lines = lines[:start_idx] + [
        '        <div style={{ minHeight: "600px", padding: "1rem 0" }}>\n',
        '          <div className="elfsight-app-6fdb01e4-c474-4910-add6-d24bc9f01699" data-elfsight-app-lazy></div>\n',
        '        </div>\n'
    ] + lines[end_idx:]
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.writelines(new_lines)
    print("Successfully injected Elfsight widget!")
else:
    print(f"Failed to find boundaries. start={start_idx}, end={end_idx}")
