#include <stdio.h>
#include <string.h>

int main(void) {
    char eng[] = "hi";
    char kor[] = "안녕";

    printf("hi의 길이: %d\n", (int) strlen(eng));     // 2
    printf("안녕의 길이: %d\n", (int) strlen(kor));   // 6

    return 0;
}
