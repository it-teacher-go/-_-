#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *data = (int *) malloc(3 * sizeof(int));

    if (data == NULL) {
        return 1;
    }

    for (int i = 0; i < 3; i = i + 1) {
        data[i] = i + 1;
    }

    int *bigger = (int *) realloc(data, 6 * sizeof(int));   // 저장된 값까지 옮겨 준다

    if (bigger == NULL) {
        free(data);                 // 늘리지 못했어도 「원래 메모리는 그대로」 남아 있다
        return 1;
    }
    data = bigger;                  // 성공했을 때만 새 주소를 대입한다

    for (int i = 3; i < 6; i = i + 1) {
        data[i] = i + 1;
    }

    for (int i = 0; i < 6; i = i + 1) {
        printf("%d ", data[i]);     // 1 2 3 4 5 6 — 앞의 세 값이 그대로 있다
    }
    printf("\n");

    free(data);

    return 0;
}
