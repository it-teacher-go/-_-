// 「정보(고등학교)」 전용 Tailwind 설정.
// 과목마다 설정을 따로 두는 이유 — 과목이 갈라지면 CSS가 달라져도 되고,
// content를 그 과목으로 좁혀야 다른 과목의 클래스가 섞여 들어오지 않는다.
// (content가 같으면 산출물이 똑같아져 Rollup이 하나로 합쳐 버린다.)
import theme from './theme.js';

export default {
    // 라이트 · 다크 색의 짝 — 색 유틸리티가 CSS 변수를 읽는다. → ./theme.js
    presets: [theme(['정보(고등학교)'])],
    // hover: 는 마우스처럼 호버가 되는 기기에서만 켠다 — 터치 기기에서는 누른 뒤 호버 색이 붙어 남는다.
    future: { hoverOnlyWhenSupported: true },
    content: ['./정보(고등학교)/**/*.html'],
};
