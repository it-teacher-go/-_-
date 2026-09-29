# ---
# check: none
# ---
def greet(name, greeting="안녕하세요"):    # 기본값은 뒤쪽 매개변수에만 둘 수 있다
    print(name + "님, " + greeting)

greet("학생 A")                 # 학생 A님, 안녕하세요       인자를 생략하면 기본값을 쓴다
greet("학생 A", "반갑습니다")     # 학생 A님, 반갑습니다      인자를 넣으면 그 값을 쓴다
