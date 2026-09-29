# ---
# check: none
# ---
count = 0

def visit(count):       # 인자로 받아서
    return count + 1    # 1을 더한 값을 반환한다

count = visit(count)
count = visit(count)
print(count)            # 2   global 없이도 된다
