// ---
// check: none
// ---
int score = 85;
printf("%d\n", score >= 80 && score < 90);   // 1   둘 다 참이어야 참
printf("%d\n", score < 60 || score > 90);    // 0   하나라도 참이면 참인데, 둘 다 거짓이다
printf("%d\n", !(score >= 80));              // 0   참과 거짓을 뒤집는다
