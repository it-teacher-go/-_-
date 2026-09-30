// ---
// check: none
// ---
int a = 3;
double b = a;                // 정수 3이 실수 3.0으로 자동 형 변환된다
printf("%f\n", b);           // 3.000000

double x = 3.7;
int n = (int) x;             // 실수를 정수로 바꿀 때는 강제 형 변환을 직접 적는다
printf("%d\n", n);           // 3    소수점 아래는 잘린다
