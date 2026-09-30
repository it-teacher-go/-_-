#include <stdio.h>
#include <string.h>

int main(void) {
    // region: 칸보기
    char word[10] = "hello";

    for (int i = 0; i < 10; i = i + 1) {
        printf("%d번 칸에 담긴 수: %d\n", i, word[i]);   // 문자는 사실 「정수」로 저장되어 있다
    }
    // endregion

    // region: 크기와길이
    printf("칸은 모두 %d개\n", (int) (sizeof(word) / sizeof(word[0])));   // 10 (배열의 크기)
    printf("글자는 %d개\n", (int) strlen(word));                           // 5 (문자열의 길이)
    // endregion

    return 0;
}
