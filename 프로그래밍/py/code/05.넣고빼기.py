# ---
# check: none
# ---
scores = [90, 85]

scores.append(72)          # 맨 뒤에 추가한다
print(scores)              # [90, 85, 72]

scores.insert(1, 100)      # 인덱스 1에 삽입한다
print(scores)              # [90, 100, 85, 72]

scores.remove(85)          # 「값」 85를 찾아 삭제한다
print(scores)              # [90, 100, 72]

last = scores.pop()        # 맨 뒤 요소를 꺼내면서 그 값을 「반환한다」
print(last, scores)        # 72 [90, 100]
