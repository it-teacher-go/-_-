#include <stdio.h>

int main(void) {
    int num = 60;
    int *p = &num;
    int **q = &p;                  // p의 주소를 저장한다

    printf("num = %d\n", num);     // 60
    printf("*p  = %d\n", *p);      // 60   한 번 역참조한다
    printf("**q = %d\n", **q);     // 60   두 번 역참조한다

    printf("p  = %p\n", (void *) p);
    printf("*q = %p\n", (void *) *q);   // p에 저장된 것과 같은 주소

    **q = 99;                      // 두 번 역참조해 num을 바꾼다
    printf("num = %d\n", num);     // 99

    return 0;
}
