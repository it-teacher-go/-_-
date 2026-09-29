// 라이트 · 다크 토글을 다는 페이지. 빌드(`theme-toggle.js`)와 검사(`tests/browser/dark.test.mjs`)가
// **같은 답을 쓰도록 여기 하나에만 적는다.** 브라우저에서 도는 검사도 읽으므로 node 모듈을 쓰지 않는다 —
// subjects.json 은 부르는 쪽이 읽어 넘긴다.
//
//   강의노트     subjects.json 의 과목 폴더 전부
//   시뮬레이터   subjects.json 의 standalone 폴더 전부(입구 simulator/index.html 포함)
//   첫 화면      루트 index.html
//
// 개인정보 처리방침만 뺀다 — 종이로 나가는 문서다.
export const THEME_FILES = ['index.html'];

/** 저장소 기준 상대 경로 `rel`에 토글을 다는가. `cfg`는 subjects.json. */
export function hasThemeToggle(cfg, rel) {
    return THEME_FILES.includes(rel)
        || [...cfg.subjects, ...cfg.standalone].some((s) => rel.startsWith(s.dir + '/'));
}
