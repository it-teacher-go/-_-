#include <stdio.h>

int main(void) {
    // region: 본문
    int i = 1;

    while (i <= 5) {
        printf("%d\n", i);
        // ③ 변화를 빠뜨렸다 → i가 계속 1이라 조건이 계속 참이다
    }
    // 이 코드는 멈추지 않는다(무한 루프). 실행하면 Ctrl+C를 눌러 강제로 종료해야 한다
    // endregion

    return 0;
}
