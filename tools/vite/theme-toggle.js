// 라이트 · 다크 토글. **강의노트는 아무것도 적지 않는다** — 빌드가 두 가지를 넣는다.
//
//   <head> 앞머리  테마를 정하는 스크립트. CSS보다 먼저 돌아야 밝은 화면이 한 번 번쩍이지 않는다.
//   hero 머리     오른쪽 위의 토글 단추. **sticky로 두지 않는다** — 모양은 src/styles/_theme.css
//
// **테마가 정해지는 순서.** 이용자가 고른 것이 있으면 그것, 없으면 기기 설정(prefers-color-scheme).
// 고른 적이 없는 동안에는 기기 설정이 바뀌면 따라간다.
//
// **고른 것은 브라우저에 `theme` 하나로 남는다.** luminousky.com 아래 사이트가 함께 쓰는 이름과 값
// (`light` · `dark`)이라, 같은 도메인의 다른 사이트에서 고른 테마가 여기서도 이어진다.
// 개인정보 처리방침 제4조가 이것 하나만 남긴다고 적었고 `check -- privacy`가 그 말을 지킨다 —
// 저장소를 쓰는 곳은 이 파일 하나, 이름은 `theme` 하나뿐이어야 한다.
//
// **어느 페이지에 넣나** → ./theme-pages.js. 넣을 페이지에 hero가 없으면 빌드를 멈춘다 — 단추를 달 자리가 없다.
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

import {ROOT, relPath} from './units.js';
import {hasThemeToggle} from './theme-pages.js';

const cfg = JSON.parse(readFileSync(resolve(ROOT, 'subjects.json'), 'utf-8'));

const LABEL = {light: '어두운 화면으로 바꾸기', dark: '밝은 화면으로 바꾸기'};

// ES5로 쓴다 — 모듈 스크립트가 아니고, 오래된 학교 컴퓨터의 브라우저에서도 테마만은 서야 한다.
// 저장소 접근은 try로 감싼다. 저장소를 막아 둔 브라우저에서는 고른 것이 그 페이지에서만 산다.
export const SCRIPT = `(function () {
    var root = document.documentElement;
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    var chosen = saved === 'light' || saved === 'dark';
    var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    function label() {
        var btn = document.querySelector('[data-theme-toggle]');
        if (btn) btn.setAttribute('aria-label', root.dataset.theme === 'dark' ? '${LABEL.dark}' : '${LABEL.light}');
    }
    function apply(theme) {
        root.dataset.theme = theme;
        label();
    }
    apply(chosen ? saved : (media && media.matches ? 'dark' : 'light'));
    document.addEventListener('DOMContentLoaded', label);
    if (media && media.addEventListener) {
        media.addEventListener('change', function (e) {
            if (!chosen) apply(e.matches ? 'dark' : 'light');
        });
    }
    document.addEventListener('click', function (e) {
        if (!e.target.closest || !e.target.closest('[data-theme-toggle]')) return;
        var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
        chosen = true;
        apply(next);
        try { localStorage.setItem('theme', next); } catch (err) {}
    });
})();`;

export const BUTTON =
    `<button type="button" class="theme-toggle" data-theme-toggle aria-label="${LABEL.light}">`
    + '<i class="fa-solid fa-moon theme-icon-moon" aria-hidden="true"></i>'
    + '<i class="fa-solid fa-sun theme-icon-sun" aria-hidden="true"></i>'
    + '</button>';

// hero는 `<header … class="… hero-gradient …">` 하나다(`check -- html`의 hero 규칙).
const HERO_OPEN = /<header\b[^>]*\bclass="[^"]*\bhero-gradient\b[^"]*"[^>]*>/;
// 스크립트는 `<meta charset>` **바로 뒤**에 둔다. head 맨 앞(head-prepend)에 두면 charset 선언이
// 파일 첫 1024바이트 밖으로 밀려, 오프라인 묶음을 file://로 연 브라우저가 한글을 깨뜨릴 수 있다.
const CHARSET = /<meta\s+charset=[^>]*>/i;

export default function themeToggle() {
    return {
        name: 'theme-toggle',
        transformIndexHtml: {
            handler(html, ctx) {
                const rel = relPath(ctx);
                if (!hasThemeToggle(cfg, rel)) return html;
                if (!HERO_OPEN.test(html)) {
                    throw new Error(`theme-toggle: ${rel} 에 hero(<header class="hero-gradient">)가 없어 토글을 달 자리가 없다`);
                }
                if (!CHARSET.test(html)) {
                    throw new Error(`theme-toggle: ${rel} 에 <meta charset>이 없어 테마 스크립트를 둘 자리가 없다`);
                }
                return html
                    .replace(CHARSET, (meta) => `${meta}\n    <script>${SCRIPT}</script>`)
                    .replace(HERO_OPEN, (open) => open + BUTTON);
            },
        },
    };
}
