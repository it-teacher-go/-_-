#include <stdio.h>

int main(void) {
    // region: 본문
    int sum = 0;                       // 합을 누적할 변수를 「반복 밖」에서 초기화한다

    for (int i = 1; i <= 100; i = i + 1) {
        sum = sum + i;                 // 앞 반복까지의 합에 i를 더한다
    }

    printf("1부터 100까지의 합은 %d입니다.\n", sum);   // 5050
    // endregion

    return 0;
}
