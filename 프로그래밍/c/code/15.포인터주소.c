#include <stdio.h>

int main(void) {
    int num = 60;
    int *p = &num;

    printf("num의 값       %d\n", num);
    printf("p에 저장된 값  %p\n", (void *) p);    // num의 주소
    printf("p 자신의 주소  %p\n", (void *) &p);   // 다른 주소다

    return 0;
}
