#include <stdio.h>

int main(void) {
    int score[5] = {88, 95, 74, 61, 90};

    printf("%d\n", score[4]);   // 마지막 요소. 배열은 여기까지다
    printf("%d\n", score[5]);   // 범위 밖이다. C는 막아 주지 않는다

    return 0;
}
