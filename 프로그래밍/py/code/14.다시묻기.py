# ---
# check: none
# ---
while True:
    try:
        age = int(input("나이: "))
        break               # 여기까지 실행됐다면 숫자가 제대로 입력된 것이다
    except ValueError:
        print("숫자로 적어 주세요")

print("나이는", age)
