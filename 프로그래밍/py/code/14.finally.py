def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("0으로 나눌 수 없습니다")
        return None
    else:
        return result
    finally:
        print("나누기를 마칩니다")    # return보다 먼저, 어느 경우에나 실행된다


print(divide(10, 4))
print(divide(10, 0))

# 나누기를 마칩니다
# 2.5
# 0으로 나눌 수 없습니다
# 나누기를 마칩니다
# None
