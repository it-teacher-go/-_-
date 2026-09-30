#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *a = (int *) malloc(5 * sizeof(int));
    int *b = (int *) calloc(5, sizeof(int));       // 개수와 요소 하나의 크기를 따로 전달한다

    if (a == NULL || b == NULL) {
        free(a);                    // 하나만 할당됐어도 해제한다. free(NULL)은 아무 일도 하지 않는다
        free(b);
        return 1;
    }

    printf("malloc: ");
    for (int i = 0; i < 5; i = i + 1) {
        printf("%d ", a[i]);        // 어떤 값이 들어 있을지 「정해져 있지 않다」
    }

    printf("\ncalloc: ");
    for (int i = 0; i < 5; i = i + 1) {
        printf("%d ", b[i]);        // 0 0 0 0 0
    }
    printf("\n");

    free(a);
    free(b);

    return 0;
}
