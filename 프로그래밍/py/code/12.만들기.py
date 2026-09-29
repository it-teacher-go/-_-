# ---
# check: none
# ---
votes = ["사과", "포도", "사과", "바나나", "사과", "포도"]

kinds = set(votes)      # 중복된 값은 자동으로 하나만 남는다
print(len(kinds))       # 3

fruits = {"사과", "포도", "바나나"}     # 중괄호로 직접 만들 수도 있다
print("사과" in fruits)                 # True

empty = set()           # 빈 「집합」은 set()이다
print(type(empty))      # <class 'set'>
print(type({}))         # <class 'dict'>   빈 중괄호는 「딕셔너리」다
