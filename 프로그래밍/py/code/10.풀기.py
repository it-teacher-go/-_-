# ---
# check: none
# ---
scores = (90, 85, 72)

kor, eng, math = scores     # 묶음이 풀려 변수 셋에 차례로 대입된다
print(kor, eng, math)       # 90 85 72

# 입력을 나누어 받을 때 쓰는 이 줄도 언패킹이다
kor, eng = map(int, "80 91".split())
print(kor + eng)            # 171
