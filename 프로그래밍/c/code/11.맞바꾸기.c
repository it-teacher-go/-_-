#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;                 // a가 가리키는 곳의 값을 temp에 저장해 둔다
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 1;
    int y = 2;

    swap(&x, &y);

    printf("x = %d, y = %d\n", x, y);   // 2 1 — 호출한 쪽의 변수까지 바뀌었다

    return 0;
}
