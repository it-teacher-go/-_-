// ---
// check: none
// ---
int menu = 1;

switch (menu) {
    case 1:
        printf("하나\n");     // 하나
    case 2:
        printf("둘\n");       // 둘    break가 없어 아래 case로 이어서 실행된다
    case 3:
        printf("셋\n");       // 셋
}
