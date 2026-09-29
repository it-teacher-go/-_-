# ---
# check: none
# ---
scores = [90, 85, 72, 68]
total = 0                     # 누적할 변수를 「반복 밖」에서 초기화한다

for score in scores:
    total = total + score     # 앞선 반복의 결과를 이어받는다

print(total)                  # 315
