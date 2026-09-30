#include <stdio.h>
#include <string.h>

int main(void) {
    char a[20] = "banana";
    char b[20] = "apple";
    char copy[20];

    printf("문자열의 길이: %d\n", (int) strlen(a));   // 6

    strcpy(copy, a);                                  // a에 저장된 문자열을 copy에 복사한다
    printf("복사한 문자열: %s\n", copy);              // banana

    if (strcmp(a, b) == 0) {                          // 두 문자열이 같으면 결과가 0이다
        printf("같습니다\n");
    } else {
        printf("다릅니다\n");                         // 다릅니다
    }

    return 0;
}
