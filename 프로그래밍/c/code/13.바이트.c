#include <stdio.h>

int main(void) {
    int num = 0x12345678;           // 16진수로 쓴 4바이트 정수. 바이트마다 12, 34, 56, 78이 들어간다
    char *p = (char *) &num;        // 같은 주소를 1바이트씩 읽겠다고 정한다

    for (int i = 0; i < 4; i = i + 1) {
        printf("%02X ", (unsigned char) *(p + i));
    }
    printf("\n");

    return 0;
}
