# ---
# check: none
# ---
def min_max(scores):
    return min(scores), max(scores)     # 쉼표로 묶은 「튜플 하나」를 반환한다


result = min_max([90, 85, 72])
print(result)               # (72, 90)   튜플 그대로 받았다
print(type(result))         # <class 'tuple'>

low, high = min_max([90, 85, 72])   # 받으면서 바로 언패킹할 수도 있다
print(low, high)            # 72 90
