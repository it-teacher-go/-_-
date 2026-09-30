#include <stdio.h>

int twice(int n) {
    return n * 2;
}

int main(void) {
    int (*fp)(int) = twice;      // 함수의 주소를 저장하는 포인터. &를 붙이지 않아도 된다

    printf("%d\n", twice(10));   // 20
    printf("%d\n", fp(10));      // 20 — 같은 함수가 호출된다

    if (fp == twice) {           // fp에 저장된 주소가 twice의 주소와 같은지 비교한다
        printf("같은 곳을 가리킵니다\n");
    }

    return 0;
}
