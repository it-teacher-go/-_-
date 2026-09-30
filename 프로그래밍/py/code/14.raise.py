def check_age(age):
    if age < 0:
        raise ValueError("나이는 0 이상이어야 합니다")
    return age                  # raise가 실행되면 이 줄은 실행되지 않는다


for text in ["17", "-3", "스물"]:
    try:
        age = check_age(int(text))
    except ValueError as e:
        print(f"{text}: {e}")
    else:
        print(f"{text}: 나이 {age}")

# 17: 나이 17
# -3: 나이는 0 이상이어야 합니다
# 스물: invalid literal for int() with base 10: '스물'
