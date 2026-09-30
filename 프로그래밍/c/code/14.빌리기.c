#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 5;
    int *data = (int *) malloc(n * sizeof(int));   // 정수 다섯 개를 저장할 메모리를 할당한다

    if (data == NULL) {                            // 할당에 실패했을 수도 있다
        printf("자리를 빌리지 못했습니다.\n");
        return 1;
    }

    for (int i = 0; i < n; i = i + 1) {
        data[i] = (i + 1) * 10;                    // 배열과 똑같이 쓴다
    }

    for (int i = 0; i < n; i = i + 1) {
        printf("%d ", data[i]);                    // 10 20 30 40 50
    }
    printf("\n");

    free(data);                                    // 다 썼으면 해제한다

    return 0;
}
