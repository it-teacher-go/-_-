# ---
# check: none
# ---
with open("점수.txt", "r", encoding="utf-8") as f:
    for line in f:              # 파일도 for로 「한 줄씩」 꺼낼 수 있다
        print(line.strip())     # 90 / 85 / 72
