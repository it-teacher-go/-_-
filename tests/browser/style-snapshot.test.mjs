// 페이지마다 **모든 요소의 계산된 스타일**을 떠서 저장하거나, 저장해 둔 것과 견준다.
// CSS를 옮기거나 합칠 때(인라인 <style>을 공용 CSS로 올리기 따위) **화면이 한 픽셀도 바뀌지 않았다**는
// 증거를 내는 도구다. 부르는 법은 tools/audits/styles.mjs 머리 주석에 있다 — 이 파일을 직접 돌리지 않는다.
//
// 요소는 `태그:몇째` 사슬로 부른다(id · 클래스를 쓰지 않는다 — 옮기는 동안 클래스가 바뀌어도 같은 요소다).
// 재는 것은 아래 PROPS와 상자의 크기 · 위치(반올림)다. hover · focus처럼 사람이 건드려야 드러나는 모양과
// 스크롤 막대 · placeholder 같은 가상 요소는 재지 못한다 — 그런 규칙을 옮겼다면 따로 눈으로 본다.
//
// 같은 스타일 문자열은 페이지 안에서 한 번만 적는다(대부분 요소가 몇 가지 모양을 나눠 쓴다).
import {expect, test} from 'vitest';
import {commands} from 'vitest/browser';
import {openFrame} from './_frame.mjs';

// 폭 — 기본은 교실 화면(1366). `sm:` · `md:` 처럼 폭에 따라 갈리는 승부는 좁은 폭(375)에서 따로 떠서 견준다.
const W = Number(import.meta.env.VITE_STYLE_WIDTH) || 1366, H = 900;
const PARALLEL = 4;
const MODE = import.meta.env.VITE_STYLE_MODE || 'diff';
const THEME = import.meta.env.VITE_STYLE_THEME || 'light';
const SHOW = import.meta.env.VITE_STYLE_ALL === '1' ? Infinity : 12;   // 페이지마다 보일 차이 수
const DIRS = JSON.parse(import.meta.env.VITE_STYLE_DIRS || '[]')
    .map((d) => '/' + d.replace(/\\/g, '/').replace(/^\/+|\/+$/g, ''));
// 저장소 루트에서 본 저장 자리(`commands.writeFile`은 루트 기준이다). `dist-*/`라 저장소에 담기지 않는다.
const OUT = `dist-styles/${THEME}-${W}`;

const PROPS = [
    'display', 'position', 'visibility', 'opacity', 'zIndex', 'overflowX', 'overflowY',
    'color', 'backgroundColor', 'backgroundImage', 'boxShadow', 'filter', 'fill', 'stroke',
    'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
    'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
    'borderTopStyle', 'borderTopLeftRadius', 'borderBottomRightRadius', 'outlineStyle',
    'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight', 'letterSpacing',
    'textAlign', 'textDecorationLine', 'textTransform', 'whiteSpace', 'wordBreak', 'overflowWrap',
    'minWidth', 'maxWidth', 'minHeight', 'maxHeight', 'gap', 'flexDirection', 'alignItems', 'justifyContent',
    'gridTemplateColumns', 'transform', 'cursor', 'listStyleType', 'content',
];

const PAGES = Object.keys(import.meta.glob(['/*.html', '/*/**/*.html', '!**/node_modules/**', '!/dist*/**', '!/tests/**']))
    .filter((p) => !DIRS.length || DIRS.some((d) => p === d || p.startsWith(d + '/')))
    .sort();

/** 페이지 하나 → {styles: [고유 문자열], els: [[경로, 문자열 번호]]} */
function snapshot(doc, win) {
    const styles = [], index = new Map(), els = [];
    const walk = (el, path) => {
        const cs = win.getComputedStyle(el);
        const r = el.getBoundingClientRect();
        const before = win.getComputedStyle(el, '::before').content;
        const after = win.getComputedStyle(el, '::after').content;
        const s = PROPS.map((p) => cs[p]).join('|')
            + `|${Math.round(r.left)},${Math.round(r.top + win.scrollY)},${Math.round(r.width)},${Math.round(r.height)}`
            + `|${before}|${after}`;
        if (!index.has(s)) { index.set(s, styles.length); styles.push(s); }
        els.push([path, index.get(s)]);
        let n = 0;
        // 테마 토글은 빌드가 hero에 끼우는 단추다 — 토글이 없던 때와 견줄 수 있게 건너뛰고 차례도 세지 않는다.
        for (const c of el.children) if (!c.hasAttribute('data-theme-toggle')) walk(c, `${path}>${c.tagName.toLowerCase()}:${n++}`);
    };
    walk(doc.body, 'body');
    return {styles, els};
}

const file = (p) => `${OUT}/${p.slice(1).replace(/[\\/]/g, '__')}.json`;

test(`계산된 스타일 ${MODE === 'save' ? '저장' : '비교'} (${THEME})`, async () => {
    expect(PAGES.length, '잴 페이지가 없다 — 폴더 이름을 확인한다').toBeGreaterThan(0);
    const report = [];
    const queue = [...PAGES];
    const worker = async () => {
        while (queue.length) {
            const p = queue.shift();
            const {frame, win, doc} = await openFrame(encodeURI(p), W, H);
            doc.documentElement.dataset.theme = THEME;
            await new Promise((r) => setTimeout(r, 700));   // `transition: all` 이 끝나기를 기다린다
            const now = snapshot(doc, win);
            frame.remove();
            if (MODE === 'save') {
                await commands.writeFile(file(p), JSON.stringify(now));
                continue;
            }
            let old;
            try { old = JSON.parse(await commands.readFile(file(p))); } catch {
                report.push(`${p.slice(1)} — 저장해 둔 것이 없다(save를 먼저)`);
                continue;
            }
            const was = new Map(old.els.map(([path, i]) => [path, old.styles[i]]));
            const diffs = [];
            for (const [path, i] of now.els) {
                const a = was.get(path), b = now.styles[i];
                if (a === undefined) { diffs.push(`  + ${path}`); continue; }
                was.delete(path);
                if (a === b) continue;
                const [av, bv] = [a.split('|'), b.split('|')];
                const names = [...PROPS, 'box', '::before', '::after'];
                const what = names.map((n, k) => (av[k] !== bv[k] ? `${n}: ${av[k]} → ${bv[k]}` : null)).filter(Boolean);
                diffs.push(`  ~ ${path}  ${what.join(' · ')}`);
            }
            for (const path of was.keys()) diffs.push(`  - ${path}`);
            if (diffs.length) report.push(`${p.slice(1)} — ${diffs.length}곳\n${diffs.slice(0, SHOW).join('\n')}${diffs.length > SHOW ? `\n  … 외 ${diffs.length - SHOW}곳` : ''}`);
        }
    };
    await Promise.all(Array.from({length: PARALLEL}, worker));
    if (MODE === 'save') console.log(`style-snapshot: ${PAGES.length}쪽 저장 → dist-styles/${THEME}/`);
    else console.log(report.length ? report.join('\n') : `style-snapshot: ${PAGES.length}쪽 모두 같다`);
    expect(report.length, '저장해 둔 스타일과 다른 페이지가 있다 — 위 목록').toBe(0);
}, 1_800_000);
