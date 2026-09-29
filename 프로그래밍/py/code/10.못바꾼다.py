# ---
# check: none
# ---
scores = [90, 85, 72]
scores[0] = 100         # 리스트는 요소를 바꿀 수 있다
print(scores)           # [100, 85, 72]

point = (3, 7)
# point[0] = 100        # TypeError. 튜플은 요소를 바꿀 수 없다
new_point = (100, 7)    # 다른 값이 필요하면 「새로 만든다」
print(new_point)        # (100, 7)
