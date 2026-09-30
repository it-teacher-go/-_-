#include <stdio.h>

int main(void) {
    int score[5] = {88, 95, 74, 61, 90};   // 요소가 다섯 개인 배열을 선언하고 초기화한다

    printf("첫 번째 칸: %d\n", score[0]);
    printf("네 번째 칸: %d\n", score[3]);

    score[2] = 80;                          // 요소 하나만 골라 바꾼다
    printf("바꾼 뒤 세 번째 칸: %d\n", score[2]);

    return 0;
}
