#include <stdio.h>
#include <string.h>

int main(void) {
    // region: 칸보기
    char word[10] = "hello";

    for (int i = 0; i < 10; i = i + 1) {
        printf("%d번 요소에 저장된 수: %d\n", i, word[i]);   // 문자는 사실 「정수」로 저장되어 있다
    }
    // endregion

    // region: 크기와길이
    printf("배열의 크기: %d\n", (int) (sizeof(word) / sizeof(word[0])));   // 10 (배열의 크기)
    printf("문자열의 길이: %d\n", (int) strlen(word));                     // 5 (문자열의 길이)
    // endregion

    return 0;
}
