#include <stdio.h>

int main(void) {
    int few[5] = {7, 8};        // 앞의 두 값만 썼다
    int zero[5] = {0};          // 모든 요소를 0으로 초기화하는 흔한 방법

    for (int i = 0; i < 5; i = i + 1) {
        printf("%d ", few[i]);  // 7 8 0 0 0
    }
    printf("\n");

    for (int i = 0; i < 5; i = i + 1) {
        printf("%d ", zero[i]); // 0 0 0 0 0
    }
    printf("\n");

    return 0;
}
