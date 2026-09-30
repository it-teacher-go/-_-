#include <stdio.h>

int main(void) {
    int n = 10;
    char c = 'A';
    double d = 3.5;

    printf("n의 값 %d, n의 주소 %p\n", n, (void *) &n);
    printf("c의 값 %c, c의 주소 %p\n", c, (void *) &c);
    printf("d의 값 %.1f, d의 주소 %p\n", d, (void *) &d);
    // 출력되는 주소는 실행할 때마다 달라질 수 있다

    return 0;
}
