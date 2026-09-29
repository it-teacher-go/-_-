# ---
# check: none
# ---
def add_print(a, b):
    print(a + b)            # 출력만 한다. return이 없다

def add_return(a, b):
    return a + b            # 반환한다

x = add_print(3, 5)         # 8    출력은 된다
print(x)                    # None   return이 없으면 None이 반환된다

y = add_return(3, 5)        # 아무것도 출력되지 않는다
print(y)                    # 8      반환값을 받았다
