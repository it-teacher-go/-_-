#include <stdio.h>

int main(void) {
    // region: 본문
    for (int i = 1; i <= 10; i = i + 1) {
        if (i % 3 != 0) {
            continue;                  // 이번 반복의 남은 문장을 건너뛰고 「다음 반복으로」 간다
        }
        printf("%d ", i);              // 3 6 9
    }
    printf("\n");
    // endregion

    return 0;
}
