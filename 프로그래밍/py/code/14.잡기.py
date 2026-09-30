# ---
# check: none
# ---
try:
    age = int(input("나이: "))
    print("입력받은 나이:", age)
except ValueError:
    print("숫자로 입력해 주세요")

print("끝")                 # 예외를 잡아 처리했으므로 이 줄도 실행된다

# 입력이 「스물」일 때
# 나이: 스물
# 숫자로 입력해 주세요
# 끝
