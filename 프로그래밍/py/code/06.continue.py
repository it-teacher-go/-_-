# ---
# check: none
# ---
scores = [90, 55, 72, 48, 85]

for score in scores:
    if score < 60:
        continue                 # 이번 반복만 건너뛰고 「다음 반복으로」 넘어간다
    print("합격:", score)        # 90 / 72 / 85
