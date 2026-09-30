#include <stdio.h>

int main(void) {
    char line[50];

    printf("좋아하는 문장을 입력하세요: ");
    fgets(line, 50, stdin);       // 공백이 있어도 한 줄을 입력받는다(배열에 들어가는 만큼)

    printf("입력한 문장: %s", line);   // 줄바꿈 문자까지 저장되어 있어 \n을 더 출력하지 않는다

    return 0;
}
