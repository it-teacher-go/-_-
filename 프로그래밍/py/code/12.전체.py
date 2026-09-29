# ---
# check: none
# ---
# 두 줄을 입력받아 각각 집합으로 저장한다
a = set(map(int, input().split()))
b = set(map(int, input().split()))

print(*sorted(a & b))       # 교집합
print(*sorted(a | b))       # 합집합

# 입력
# 1 2 3 4 3
# 3 4 5
# 출력
# 3 4
# 1 2 3 4 5
