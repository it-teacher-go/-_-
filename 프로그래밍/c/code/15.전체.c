#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int rows = 3;
    int cols = 4;

    int **grid = (int **) malloc(rows * sizeof(int *));   // 행을 가리킬 포인터 세 개

    if (grid == NULL) {
        return 1;
    }

    for (int r = 0; r < rows; r = r + 1) {
        grid[r] = (int *) malloc(cols * sizeof(int));     // 행마다 「따로」 할당한다

        if (grid[r] == NULL) {
            for (int k = 0; k < r; k = k + 1) {           // 앞서 할당한 행들을 해제한다
                free(grid[k]);
            }
            free(grid);
            return 1;
        }
    }

    for (int r = 0; r < rows; r = r + 1) {
        for (int c = 0; c < cols; c = c + 1) {
            grid[r][c] = (r + 1) * 10 + c;
        }
    }

    for (int r = 0; r < rows; r = r + 1) {
        for (int c = 0; c < cols; c = c + 1) {
            printf("%4d", grid[r][c]);
        }
        printf("\n");
    }

    printf("0번 행 %p\n", (void *) grid[0]);
    printf("1번 행 %p\n", (void *) grid[1]);   // 이어져 있지 않을 수 있다

    for (int r = 0; r < rows; r = r + 1) {     // 각 행을 「먼저」 해제한다
        free(grid[r]);
    }
    free(grid);                                // grid를 먼저 해제하면 각 행의 주소를 잃는다

    return 0;
}
