# ---
# check: none
# ---
scores = [90, 85, 72, 68]

for score in scores:
    total = 0                 # 반복 「안」에서 초기화하면 반복할 때마다 0으로 되돌아간다
    total = total + score
    print(total, end=" ")     # 90 85 72 68   합이 누적되지 않는다
print()
