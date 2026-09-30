#include <stdio.h>

int main(void) {
    int n = 10;
    double d = 3.5;

    void *p;                        // 가리킬 대상의 자료형을 정하지 않는다

    p = &n;                         // int 변수의 주소를 저장해도 되고
    printf("정수: %d\n", *(int *) p);

    p = &d;                         // double 변수의 주소를 저장해도 된다
    printf("실수: %.1f\n", *(double *) p);

    return 0;
}
