#include <stdio.h>

int bigger(int a, int b) {           // 매개변수가 둘이면 쉼표로 구분한다
    if (a > b) {
        return a;                    // return을 만나면 「바로」 함수가 끝난다
    }
    return b;
}

int main(void) {
    printf("%d\n", bigger(7, 3));    // 7
    printf("%d\n", bigger(2, 9));    // 9

    return 0;
}
