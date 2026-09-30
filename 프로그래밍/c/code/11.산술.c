#include <stdio.h>

int main(void) {
    int score[5] = {88, 95, 74, 61, 90};
    char word[5] = "abcd";

    int *pi = score;
    char *pc = word;

    printf("int  : %p %p %p\n", (void *) pi, (void *) (pi + 1), (void *) (pi + 2));
    printf("char : %p %p %p\n", (void *) pc, (void *) (pc + 1), (void *) (pc + 2));
    // 1을 더할 때마다 int *는 4, char *는 1씩 주소가 커진다

    return 0;
}
