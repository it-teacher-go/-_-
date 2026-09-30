#include <stdio.h>

int main(void) {
    double d = 3.5;
    void *p = &d;

    printf("제대로 읽기: %.1f\n", *(double *) p);
    printf("잘못 읽기  : %d\n", *(int *) p);   // 8바이트 가운데 앞의 4바이트만 읽었다

    return 0;
}
