# ---
# check: none
# ---
fruits = ["사과", "바나나", "포도"]

print(", ".join(fruits))    # 사과, 바나나, 포도   사이에 넣을 문자열을 앞에 적는다
print("-".join(fruits))     # 사과-바나나-포도
print("".join(fruits))      # 사과바나나포도

scores = [90, 85, 72]
# print(", ".join(scores))          # 오류. 요소가 모두 문자열이어야 한다

texts = []
for s in scores:
    texts.append(str(s))            # 하나씩 문자열로 변환해 추가하고
print(", ".join(texts))             # 90, 85, 72
