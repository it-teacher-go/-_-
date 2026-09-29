# ---
# check: none
# ---
for dan in range(2, 5):
    print("---", dan, "단 ---")
    for i in range(1, 4):        # 바깥 반복 한 번마다 안쪽 반복이 처음부터 끝까지 실행된다
        print(dan, "x", i, "=", dan * i)
