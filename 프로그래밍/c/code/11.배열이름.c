#include <stdio.h>

int main(void) {
    int score[5] = {88, 95, 74, 61, 90};
    int *p = score;                       // &를 붙이지 않고 그대로 대입한다

    printf("score     %p\n", (void *) score);
    printf("&score[0] %p\n", (void *) &score[0]);
    printf("p         %p\n", (void *) p);
    // 셋 다 같은 주소를 출력한다

    printf("*p = %d\n", *p);              // 88 — 첫 요소의 값

    return 0;
}
