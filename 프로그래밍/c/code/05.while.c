#include <stdio.h>

int main(void) {
    // region: 본문
    int i = 1;                    // ① 시작할 값

    while (i <= 5) {              // ② 언제까지 반복할 것인가
        printf("%d번째 안녕하세요\n", i);
        i = i + 1;                // ③ 다음 반복으로 가기 전에 무엇이 달라지는가
    }
    // endregion

    return 0;
}
