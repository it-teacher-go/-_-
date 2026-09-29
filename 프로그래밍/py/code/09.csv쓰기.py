# ---
# check: none
# ---
rows = [["학생 A", 90, 65],
        ["학생 B", 85, 80]]

with open("성적출력.csv", "w", encoding="utf-8") as f:
    for row in rows:
        texts = []
        for v in row:
            texts.append(str(v))            # 숫자가 섞여 있으므로 문자열로 변환해 추가하고
        f.write(",".join(texts) + "\n")     # 쉼표로 이어 한 줄씩
