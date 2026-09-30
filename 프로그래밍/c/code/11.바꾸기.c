#include <stdio.h>

void change(int *p) {              // 값이 아니라 주소를 전달받는다
    *p = 100;                      // 전달받은 주소를 역참조해 값을 저장한다
}

int main(void) {
    int n = 7;

    change(&n);                    // n의 주소를 전달한다

    printf("n = %d\n", n);         // 100 — 이번에는 바뀌었다

    return 0;
}
