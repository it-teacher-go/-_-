# ---
# check: none
# ---
# 값이 있는지 「묻기만」 한다면 집합이 훨씬 빠르다
numbers = list(range(1000000))
checked = set(numbers)

print(999999 in numbers)    # True   리스트는 앞에서부터 하나씩 비교한다
print(999999 in checked)    # True   집합은 저장 위치를 계산해 곧바로 찾아간다
