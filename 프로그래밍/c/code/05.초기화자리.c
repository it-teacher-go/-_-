#include <stdio.h>

int main(void) {
    // region: 본문
    for (int i = 1; i <= 3; i = i + 1) {
        int sum = 0;                   // 반복 「안」에서 선언하면 반복할 때마다 0으로 초기화된다
        sum = sum + i;
        printf("%d ", sum);            // 1 2 3   합이 누적되지 않는다
    }
    printf("\n");
    // endregion

    return 0;
}
