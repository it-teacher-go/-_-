#include <stdio.h>

void star(int n) {                   // 매개변수는 있지만 반환값은 없다
    for (int i = 0; i < n; i = i + 1) {
        printf("*");
    }
    printf("\n");
}

void line(void) {                    // 매개변수도 반환값도 없다
    printf("--------\n");
}

int main(void) {
    line();
    star(3);
    star(5);
    line();

    return 0;
}
