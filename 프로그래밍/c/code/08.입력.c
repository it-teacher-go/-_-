#include <stdio.h>

int main(void) {
    char name[20];

    printf("이름을 입력하세요: ");
    scanf("%19s", name);          // 배열 이름에는 &를 붙이지 않는다

    printf("%s님, 안녕하세요.\n", name);

    return 0;
}
