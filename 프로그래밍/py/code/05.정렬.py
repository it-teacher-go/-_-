# ---
# check: none
# ---
scores = [90, 85, 72, 68]

print(sorted(scores))              # [68, 72, 85, 90]   「새 리스트」를 만들어 반환한다
print(scores)                      # [90, 85, 72, 68]   원래 리스트는 그대로다

scores.sort()                      # 원래 리스트를 「직접」 정렬한다
print(scores)                      # [68, 72, 85, 90]

scores.sort(reverse=True)
print(scores)                      # [90, 85, 72, 68]
