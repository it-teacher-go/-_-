#include <stdio.h>

double area(double r) {              // 반환형 / 함수 이름 / 매개변수
    return 3.14159 * r * r;          // 값을 계산해 호출한 곳으로 반환한다
}

int main(void) {
    printf("넓이: %.2f\n", area(2.0));
    printf("넓이: %.2f\n", area(3.5));
    printf("넓이: %.2f\n", area(5.0));

    return 0;
}
