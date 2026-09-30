#include <stdio.h>

int square(int n);                   // 함수 원형: 「이런 함수가 있다」고 미리 알려 둔다

int main(void) {
    printf("%d\n", square(6));       // 36

    return 0;
}

int square(int n) {                  // 함수 정의는 아래에 쓴다
    return n * n;
}
