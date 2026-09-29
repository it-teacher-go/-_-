# ---
# check: none
# ---
fruits = {"사과", "포도", "바나나"}

# print(fruits[0])      # TypeError. 인덱스가 없다
fruits.add("귤")         # 추가하고
fruits.discard("포도")   # 삭제한다. 없는 값을 삭제해도 오류가 나지 않는다
print(len(fruits))      # 3

for f in sorted(fruits):    # 순서가 필요하면 정렬해서 순회한다
    print(f)                # 귤 / 바나나 / 사과
