# ---
# check: none
# ---
class Student:
    def __init__(self, name, kor, eng):     # 인스턴스를 만들 때마다 「한 번」 호출된다
        self.name = name                    # self는 「지금 만드는 그 인스턴스」다
        self.kor = kor
        self.eng = eng


a = Student("학생 A", 90, 65)       # 인스턴스를 하나 만든다
print(a.name)                       # 학생 A
print(a.kor + a.eng)                # 155

# b = Student("학생 B", 85)         # TypeError. 인자를 빠뜨리면 「만들 때」 오류가 난다
