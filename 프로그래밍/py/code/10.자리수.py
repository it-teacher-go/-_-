# ---
# check: none
# ---
scores = (90, 85, 72)

# a, b = scores       # ValueError: too many values to unpack
# a, b, c, d = scores # ValueError: not enough values to unpack

a, b, c = scores      # 변수 셋, 값 셋 — 개수가 맞는다
print(a, b, c)        # 90 85 72
