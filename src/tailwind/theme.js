// 라이트 · 다크 테마의 색을 정하는 곳. 단위 설정이 `presets: [theme([폴더 · 파일])]`로 받는다.
//
// **강의노트는 한 글자도 고치지 않는다.** `bg-orange-50` 같은 색 유틸리티가 색을 바로 적는 대신
// CSS 변수를 읽게 바꾸고, `<html data-theme="dark">`일 때만 그 변수에 어두운 짝을 넣는다.
// 요소마다 `dark:` 클래스를 붙이는 방식은 쓰지 않는다 — 같은 틀이 수백 쪽에 복제되어 있다.
//
//     bg-orange-50  →  background-color: rgb(var(--bg-orange-50, 255 247 237) / 1)
//                      ↑ 변수가 없으면(라이트) 쉼표 뒤의 원래 색
//
// **속성마다 짝이 다르다.** 같은 `orange-600`이라도 바탕이면 흰 글자를 얹은 단추라 그대로 두고,
// 글자면 어두운 바탕에서 읽히도록 밝게 올린다. 그래서 바탕(bg) · 글자(tx) · 선(bd) 변수를 따로 둔다.
//
//   바탕  흰색 → 카드 색. 옅은 50~400은 그 색을 카드 색에 조금 섞은 짙은 물빛.
//         500~700은 흰 글자를 얹는 자리라 그대로. 무채색 800~950은 카드보다 한 단 짙게
//         (라이트에서 흰 카드 위 짙은 상자였으니 다크에서도 카드보다 짙어야 같은 뜻이다).
//   글자  400 이상을 밝은 쪽으로(900 → 50 · 400~600 → 300). 300 이하와 흰색은 그대로.
//   선    옅은 선을 카드 위에서 보이는 짙은 선으로. 400 이상(강조 선)은 그대로.
//
// **어두운 짝은 쓰인 색에만 만든다.** 과목 폴더의 HTML과 `src/styles/`의 `@apply`를 훑어
// 실제로 쓰인 (속성, 색) 쌍에만 변수를 넣는다. 22색 × 11단계 × 3속성을 다 넣으면 과목 CSS마다
// 수십 KB가 붙는다. 훑기에서 빠진 색은 변수가 없으니 **라이트 색으로 남는다** — 사라지지 않는다.
//
// **라이트로 남기는 섬.** hero(짙은 그러데이션 위 흰 글자) · `data-keep-color`(색이 내용인 것) ·
// `data-figure`(다크에서 필터로 통째로 뒤집는 그림 — 안의 색이 먼저 어두워지면 두 번 뒤집힌다)는
// 변수를 `initial`로 되돌려 원래 색을 쓴다. 모양은 `src/styles/_theme.css`가 준다.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import colors from 'tailwindcss/colors.js';
import plugin from 'tailwindcss/plugin.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const NEUTRAL = ['slate', 'gray', 'zinc', 'neutral', 'stone'];
const FAMILIES = [
    ...NEUTRAL,
    'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
    'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
];
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

/**
 * 다크 화면의 바탕과 글자. `--surface-*` · `--ink-*` 변수로 내려가고, 다크 CSS(`_theme.css` 따위)는
 * **무채색 hex를 적지 않고 이 이름만 쓴다** — 다크의 밝기를 바꿀 때 여기 한 곳만 고친다.
 */
export const SURFACE = {
    page: colors.slate[950],   // 페이지 바탕
    card: colors.slate[900],   // 카드 · 학습 목표 · nav
    raised: colors.slate[800], // 카드 안의 한 단 뜬 칸 · 선
    line: colors.slate[700],   // 표의 선 · 단추 테두리
    edge: colors.slate[500],   // 가리킨 단추의 테두리 · 스크롤 막대
};
export const INK = {
    strong: colors.slate[100], // 제목 · 입력한 글
    body: colors.slate[200],   // 본문 · 단추 글자
    soft: colors.slate[300],   // 보조 글 · 아이콘
    faint: colors.slate[400],  // 자리 글(placeholder)
};

const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const triple = (rgb) => rgb.map((v) => Math.round(v)).join(' ');
/** a를 t만큼, b를 1−t만큼 섞는다. */
const mix = (a, b, t) => hexToRgb(a).map((v, i) => v * t + hexToRgb(b)[i] * (1 - t));

// 400은 흰 글자를 얹은 배지로도 쓰인다 — 흰 글자가 AAA를 넘도록 300보다 조금만 밝게 둔다.
const TINT_BG = {50: 0.12, 100: 0.18, 200: 0.24, 300: 0.3, 400: 0.34};
const TINT_BD = {50: 0.2, 100: 0.28, 200: 0.38, 300: 0.5};
// 다크의 글자는 AAA(7:1)를 넘겨야 한다 → tests/browser/dark.test.mjs. 400(라이트의 흐린 보조 글자)도 올린다.
const TEXT_UP = {400: 300, 500: 300, 600: 300, 700: 200, 800: 100, 900: 50, 950: 50};
// 무채색 200은 700과 800 사이(아래 dark()) — 700이면 그 위의 300 글자가 AAA에 조금 못 미친다.
// 400은 흰 글자를 얹는 배지로 쓰여 600까지 내린다.
const NEUTRAL_BG = {100: 800, 300: 700, 400: 600, 800: 950, 900: 950};
const NEUTRAL_BD = {50: 800, 100: 800, 200: 700, 300: 600, 400: 500};

/** (속성, 색 이름) → 다크일 때의 "r g b". 그대로 두면 null. */
function dark(kind, name) {
    if (name === 'white') return {bg: triple(hexToRgb(SURFACE.card)), tx: null, bd: triple(hexToRgb(SURFACE.raised))}[kind];
    if (name === 'black') return kind === 'tx' ? triple(hexToRgb(colors.slate[50])) : null;
    const [fam, s] = name.split('-');
    const shade = Number(s);
    const c = colors[fam];
    const neutral = NEUTRAL.includes(fam);
    if (kind === 'bg') {
        if (neutral && shade === 50) return triple(mix(SURFACE.raised, SURFACE.card, 0.5));
        if (neutral && shade === 200) return triple(mix(c[700], c[800], 0.5));
        if (neutral && NEUTRAL_BG[shade]) return triple(hexToRgb(c[NEUTRAL_BG[shade]]));
        if (!neutral && TINT_BG[shade]) return triple(mix(c[500], SURFACE.card, TINT_BG[shade]));
        return null;
    }
    if (kind === 'tx') return TEXT_UP[shade] ? triple(hexToRgb(c[TEXT_UP[shade]])) : null;
    if (neutral && NEUTRAL_BD[shade]) return triple(hexToRgb(c[NEUTRAL_BD[shade]]));
    if (!neutral && TINT_BD[shade]) return triple(mix(c[500], SURFACE.card, TINT_BD[shade]));
    return null;
}

const KIND_OF = {
    bg: 'bg', from: 'bg', via: 'bg', to: 'bg',
    text: 'tx', placeholder: 'tx', decoration: 'tx',
    border: 'bd', divide: 'bd', ring: 'bd', outline: 'bd',
};
const COLOR = `white|black|(?:${FAMILIES.join('|')})-(?:${SHADES.join('|')})`;
const USE_RE = new RegExp(`(?<![\\w-])(bg|from|via|to|text|placeholder|decoration|border(?:-[xytrbl])?|divide|ring|outline)-(${COLOR})(?![\\w-])`, 'g');

function htmlUnder(dir) {
    const out = [];
    const go = (d) => {
        for (const e of fs.readdirSync(d, {withFileTypes: true})) {
            const p = path.join(d, e.name);
            if (e.isDirectory()) go(p);
            else if (e.name.endsWith('.html')) out.push(p);
        }
    };
    if (fs.existsSync(dir)) go(dir);
    return out;
}

/** 폴더 · 파일들의 HTML과 `src/styles/` 아래 모든 CSS(하위 폴더 포함)에서 쓰인 (속성, 색) 쌍. */
function usedPairs(paths) {
    const files = [
        ...paths.flatMap((d) => (d.endsWith('.html') ? [path.join(ROOT, d)] : htmlUnder(path.join(ROOT, d)))),
        ...fs.readdirSync(path.join(ROOT, 'src/styles'), {recursive: true}).filter((f) => f.endsWith('.css'))
            .map((f) => path.join(ROOT, 'src/styles', f)),
    ];
    // 색 없이 `border`만 쓴 선은 기본 선 색(gray-200)을 읽는다. 클래스에 이름이 안 나오므로 늘 넣는다.
    const pairs = new Set(['bd:gray-200']);
    for (const f of files) {
        for (const m of fs.readFileSync(f, 'utf8').matchAll(USE_RE)) {
            pairs.add(`${KIND_OF[m[1].split('-')[0]]}:${m[2]}`);
        }
    }
    return pairs;
}

/** 한 속성의 팔레트 — 모든 색이 「변수, 없으면 원래 색」을 읽는다. */
function palette(kind) {
    const p = {inherit: 'inherit', current: 'currentColor', transparent: 'transparent'};
    p.white = `rgb(var(--${kind}-white, 255 255 255) / <alpha-value>)`;
    p.black = `rgb(var(--${kind}-black, 0 0 0) / <alpha-value>)`;
    for (const fam of FAMILIES) {
        p[fam] = {};
        for (const s of SHADES) {
            p[fam][s] = `rgb(var(--${kind}-${fam}-${s}, ${triple(hexToRgb(colors[fam][s]))}) / <alpha-value>)`;
        }
    }
    return p;
}

/**
 * 단위 설정이 받는 프리셋. `paths`는 그 단위의 폴더 또는 HTML 파일 — 어두운 짝을 만들 색을 여기서 훑는다.
 */
export default function theme(paths) {
    const darkVars = {};
    const resetVars = {};
    for (const pair of [...usedPairs(paths)].sort()) {
        const [kind, name] = pair.split(':');
        const v = dark(kind, name);
        if (v === null) continue;
        darkVars[`--${kind}-${name}`] = v;
        resetVars[`--${kind}-${name}`] = 'initial';
    }
    const surface = {
        ...Object.fromEntries(Object.entries(SURFACE).map(([k, hex]) => [`--surface-${k}`, hex])),
        ...Object.fromEntries(Object.entries(INK).map(([k, hex]) => [`--ink-${k}`, hex])),
    };

    const bd = palette('bd');
    return {
        theme: {
            backgroundColor: palette('bg'),
            gradientColorStops: palette('bg'),
            textColor: palette('tx'),
            placeholderColor: palette('tx'),
            textDecorationColor: palette('tx'),
            borderColor: {...bd, DEFAULT: bd.gray[200]},
            ringColor: {...bd, DEFAULT: bd.blue[500]},
            outlineColor: bd,
        },
        plugins: [
            plugin(({addBase}) => {
                addBase({
                    ':root[data-theme="dark"]': {...surface, ...darkVars},
                    ':root[data-theme="dark"] :is(.hero-gradient, [data-keep-color], [data-figure])': resetVars,
                });
            }),
        ],
    };
}
