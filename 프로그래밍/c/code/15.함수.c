#include <stdio.h>
#include <stdlib.h>

void make(int **out, int n) {          // 결과를 저장할 포인터의 주소를 전달받는다
    *out = (int *) malloc(n * sizeof(int));

    if (*out == NULL) {
        return;
    }

    for (int i = 0; i < n; i = i + 1) {
        (*out)[i] = (i + 1) * 10;      // 괄호를 빼면 뜻이 달라진다
    }
}

int main(void) {
    int *data = NULL;

    make(&data, 5);                    // data의 주소를 전달한다

    if (data == NULL) {
        printf("메모리를 할당하지 못했습니다.\n");
        return 1;
    }

    for (int i = 0; i < 5; i = i + 1) {
        printf("%d ", data[i]);        // 10 20 30 40 50
    }
    printf("\n");

    free(data);

    return 0;
}
