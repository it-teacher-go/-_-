#include <stdio.h>

int main(void) {
    // region: 두가지
    char a[6] = {'h', 'e', 'l', 'l', 'o', '\0'};   // 요소를 하나씩 초기화한다
    char b[6] = "hello";                            // 큰따옴표로 한 번에 초기화한다
    char c[] = "hello";                             // 크기를 쓰지 않으면 '\0'까지 들어가게 정해진다

    printf("%s\n", a);
    printf("%s\n", b);
    printf("%s\n", c);
    // endregion

    return 0;
}
