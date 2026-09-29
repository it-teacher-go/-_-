# ---
# check: none
# ---
answer = "  Seoul  "

answer.strip()          # 반환값을 어디에도 저장하지 않았다
print(answer)           # 「  Seoul  」   원본은 그대로다

answer = answer.strip() # 다시 대입해야 정리된 값이 남는다
print(answer)           # Seoul
