# ---
# check: none
# ---
import math
print(math.sqrt(16))            # 4.0   모듈 이름을 앞에 붙여 호출한다

import math as m
print(m.sqrt(16))               # 4.0   모듈 이름에 짧은 별명을 붙인다

from math import sqrt
print(sqrt(16))                 # 4.0   필요한 함수만 가져오면 모듈 이름 없이 호출한다
