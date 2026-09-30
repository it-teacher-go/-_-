# ---
# check: none
# ---
kor = [90, 85, 72]
eng = [65, 80, 95]
math_ = [88, 91, 70]      # math는 파이썬 모듈 이름이라 끝에 밑줄을 붙여 피한다

print(round(sum(kor) / len(kor), 1))        # 82.3
print(round(sum(eng) / len(eng), 1))        # 80.0
print(round(sum(math_) / len(math_), 1))    # 83.0
