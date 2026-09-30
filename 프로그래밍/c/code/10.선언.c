#include <stdio.h>

int main(void) {
    int n = 10;
    int *p = &n;                      // n의 주소를 저장한다

    printf("n  = %d\n", n);           // 10   n에 저장된 값
    printf("&n = %p\n", (void *) &n); // n의 주소
    printf("p  = %p\n", (void *) p);  // 같은 주소가 출력된다
    printf("*p = %d\n", *p);          // 10   p가 가리키는 곳의 값

    return 0;
}
