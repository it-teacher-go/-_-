// 페이지 HTML이 **스스로 CSS를 정하지 않았는가** — 모양은 클래스(Tailwind 유틸리티 · 공용 CSS의 뜻 이름)로만 준다.
//
// **왜.** 모양이 오는 곳을 둘로 묶는다 — Tailwind 유틸리티(색의 다크 짝은 src/tailwind/theme.js)와 공용 CSS
// (`src/styles/`, 다크 짝은 라이트 규칙 바로 곁). 페이지에 CSS를 박으면 다크의 짝을 줄 자리가 없고, 같은 틀이
// 수백 편에 복제되며, 인라인은 늘 이기므로 틀을 고쳐도 그 칸만 따로 논다.
//
// 막는 것 —
//   R1 `<style>` 블록. 내용과 상관없다.
//   R2 마크업의 `style=""` 속성. 값과 상관없다 — `<svg>` 안과 `data-keep-color` 안도 막는다. SVG 표현 속성
//      (`fill="#…"`)은 속성이라 걸리지 않는다. 자료인 크기 · 위치(막대 높이 · 점 좌표)는 임의값 클래스(`h-[13%]`)로 준다.
//   R3 클래스 속 임의 색 — `bg-[#…]` · `text-[rgb(…)]` · `bg-[red]` · `[color:…]` 따위. 팔레트를 거치지 않아 다크 짝이 없다.
//      **색이 곧 내용인 곳**(`data-keep-color` 안 · `<svg>` 안)만 허용한다 — 히트맵 칸 따위.
//   R4 시뮬레이터가 아닌 페이지(강의노트 · 루트 페이지)의 인라인 `<script>`가 스타일을 쓰는 것 —
//      `.style.<속성> =` · `.style['…'] =` · `Object.assign(….style` · `style.cssText` · `setAttribute('style'` ·
//      `createElement('style')` · `style="` 문자열. 상태는 클래스로 켜고 끈다.
//      잰 값을 CSS 변수로 넘기는 `style.setProperty('--…')`만 둔다(배치를 재서 맞추는 스크립트).
//      시뮬레이터와 `src/entries/`는 보지 않는다 — 실행 중에 계산한 값(좌표 · 세기 · 폭 %)은 인라인이 표준이다.
//
// **아직 옮기지 않은 파일**은 `LEGACY`에 이름으로 적는다. 다 옮겨 걸릴 것이 없어진 파일이 목록에 남아 있으면
// 빨간불이다(목록이 저절로 줄어들게). 새 파일을 목록에 더하지 않는다.
//
// 사용:
//     npm run check -- inline-css              저장소 전체
//     npm run check -- inline-css <파일>…      짚은 파일만(목록에 든 파일도 걸린 자리를 보인다)
import fs from 'node:fs';
import path from 'node:path';
import {ROOT, Report, lineOf, read, rel, walk} from '../lib/repo.mjs';
import {tokens} from '../lib/html-tokens.mjs';

const SKIP = (n) => ['node_modules', '.git', '.venv', '.idea', 'scratchpad', 'public', 'tests'].includes(n) ||
    n.startsWith('dist') || n.startsWith('.tmp');

/** 클래스 낱말 하나가 임의 색인가 — `bg-[#123]` · `hover:text-[rgb(1_2_3)]` · `[color:red]` */
const ARBITRARY_COLOR = /(?:^|:)(?:[a-z-]+-\[(?:#|rgba?\(|hsla?\()|(?:bg|text|border(?:-[a-z]+)?|from|via|to|fill|stroke|ring|outline|decoration|accent|caret|divide|shadow)-\[(?!(?:none|inherit|initial|unset|auto|current|transparent|solid|dashed|dotted|double|wavy)\])[a-z]+\]|\[(?:color|background(?:-color)?|border(?:-[a-z]+)?-color|fill|stroke):)/;

/** 인라인 스크립트가 스타일을 쓰는 꼴 */
const SCRIPT_STYLE = /\.style\.[a-zA-Z]+\s*=(?!=)|\.style\[[^\]]+\]\s*=(?!=)|Object\.assign\(\s*[\w$.]+\.style\b|\.style\.setProperty\(\s*['"](?!--)|setAttribute\(\s*['"]style['"]|createElement\(\s*['"]style['"]|\bstyle=\\?["']/g;

/**
 * 아직 옮기지 않은 파일. 옮기면 뺀다.
 * **비어 있는 것이 정상이다.** 여기에 파일을 적는 것은 옮기기를 미루겠다는 뜻이므로, 적을 때는 언제 뺄지도 함께 적는다.
 */
const LEGACY = new Set([]);

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

/** 파일 하나 → [[줄, 무엇, 찾은 것]]. `script`가 참이면 R4까지 본다. */
export function findInlineCss(src, {script = true} = {}) {
    const out = [];
    const stack = [];
    for (const t of tokens(src)) {
        if (t.type === 'end') {
            const i = stack.findLastIndex((s) => s.tag === t.tag);
            if (i >= 0) stack.length = i;
            continue;
        }
        const keep = 'data-keep-color' in t.attrs;
        const colorOk = keep || t.tag === 'svg' || stack.some((s) => s.tag === 'svg' || s.keep);
        if (t.tag === 'style') out.push([t.line, 'R1 <style>', '<style>']);
        if (t.attrs.style !== undefined) out.push([t.line, `R2 <${t.tag} style>`, t.attrs.style.trim().slice(0, 40)]);
        if (!colorOk && t.attrs.class) {
            for (const c of t.attrs.class.split(/\s+/)) if (ARBITRARY_COLOR.test(c)) out.push([t.line, `R3 <${t.tag} class>`, c]);
        }
        if (script && t.tag === 'script' && !('src' in t.attrs)) {
            const close = src.indexOf('</script', t.end);
            const body = src.slice(t.end, close === -1 ? src.length : close);
            for (const m of body.matchAll(SCRIPT_STYLE)) out.push([lineOf(src, t.end + m.index), 'R4 <script>', m[0].trim()]);
        }
        if (!t.selfClosing && !VOID.has(t.tag)) stack.push({tag: t.tag, keep});
    }
    return out;
}

export async function check(args = []) {
    const r = new Report('check_inline_css');
    const picked = args.filter((a) => !a.startsWith('-')).map((a) => path.resolve(ROOT, a)).filter((p) => fs.existsSync(p));
    const files = picked.length ? picked : walk(ROOT, {ext: ['.html'], skip: SKIP});
    let hit = 0;
    for (const p of files) {
        const f = rel(p);
        const found = findInlineCss(read(p), {script: !f.startsWith('simulator/')});
        if (LEGACY.has(f) && !picked.length) {
            if (!found.length) r.error(`  ✗ ${f}: 걸릴 것이 없어졌다 — tools/checks/inline-css.mjs 의 LEGACY 에서 뺀다`);
            continue;
        }
        if (!found.length) continue;
        hit++;
        const where = found.slice(0, 5).map(([line, what, c]) => `${line}행 ${what} ${c}`).join(' · ');
        r.error(`  ✗ ${f}: ${found.length}곳 — ${where}${found.length > 5 ? ' …' : ''}`);
    }
    if (hit) {
        r.error('모양은 클래스로 준다 — Tailwind 유틸리티(자료인 크기 · 위치는 임의값 `h-[13%]`)나 공용 CSS(src/styles/)의 뜻 이름. ' +
            '색이 곧 내용이면 data-keep-color 안에서만 임의 색 클래스 (까닭은 tools/checks/inline-css.mjs 머리 주석)');
    }
    return r.done(`완료 — 파일 ${files.length}, 걸린 파일 ${hit}, 아직 옮기지 않은 파일(LEGACY) ${LEGACY.size}`);
}
