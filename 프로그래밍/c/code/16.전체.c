#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int sub(int a, int b) {
    return a - b;
}

int mul(int a, int b) {
    return a * b;
}

int main(void) {
    int (*op[3])(int, int) = {add, sub, mul};   // 함수의 주소를 저장하는 「배열」
    char name[3] = {'+', '-', '*'};

    int a = 12;
    int b = 5;

    for (int i = 0; i < 3; i = i + 1) {
        printf("%d %c %d = %d\n", a, name[i], b, op[i](a, b));
    }

    return 0;
}
