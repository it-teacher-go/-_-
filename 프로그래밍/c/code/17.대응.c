#include <stdio.h>

int main(void) {
    int num = 2022;
    int *p = &num;

    printf("변수로 읽기   %d\n", num);   // 변수 이름으로 값이 있는 곳에 바로 접근한다
    printf("포인터로 읽기 %d\n", *p);    // p에 저장된 주소로 한 번 더 간다(역참조)

    return 0;
}
