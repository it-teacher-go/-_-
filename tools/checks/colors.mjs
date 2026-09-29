// 페이지 HTML에 **색을 박지 않았는가** — `<style>` 블록과 `style=""` 속성에 적힌 색(`#hex` · `rgb()` ·
// `hsl()` · `white` · `black`)을 찾는다.
//
// **왜.** 색은 두 곳에서만 온다 — Tailwind 색 클래스(다크의 짝은 src/tailwind/theme.js)와 공용 CSS
// (`src/styles/`, 다크의 짝은 라이트 규칙 바로 곁). 페이지에 색을 박으면 다크의 짝을 줄 자리가 없어,
// 다크 화면에 밝은 칸 · 안 보이는 글자로 남는다. 같은 틀이 수백 편에 복제되는 것도 여기서 시작한다.
//
// **허용하는 곳** — 색이 곧 그림 · 내용인 자리.
//   - `<svg>` 안: 그림은 다크에서 필터로 통째로 뒤집힌다(`src/styles/_theme.css` 4절).
//   - `data-keep-color` 안: 색이 내용이라 다크에서도 그대로 둔다(히트맵 · 픽셀 · 화면 목업 따위).
// `<script>` 속은 보지 않는다(스크립트가 칠하는 그림은 `data-figure` 칸 안에 그린다).
//
// **아직 틀을 페이지에 둔 파일**은 `LEGACY`에 이름으로 적는다(지금은 비어 있다). 틀을 공용 CSS로
// 옮겨 색이 0이 된 파일이 목록에 남아 있으면 빨간불이다(목록이 저절로 줄어들게). 새 파일을 목록에 더하지 않는다.
//
// 사용:
//     npm run check -- colors              저장소 전체
//     npm run check -- colors <파일>…      짚은 파일만(목록에 든 파일도 걸린 자리를 보인다)
import fs from 'node:fs';
import path from 'node:path';
import {ROOT, Report, lineOf, read, rel, walk} from '../lib/repo.mjs';
import {tokens} from '../lib/html-tokens.mjs';

const SKIP = (n) => ['node_modules', '.git', '.venv', '.idea', 'scratchpad', 'public', 'tests'].includes(n) ||
    n.startsWith('dist') || n.startsWith('.tmp');

const COLOR = /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(|\b(?:white|black)\b/g;

/**
 * 아직 틀(카드 · 표 · 단추의 색)을 페이지 <style>에 둔 파일. 그 단위를 공용 틀로 옮기면 여기서 뺀다.
 * **비어 있는 것이 정상이다.** 여기에 파일을 적는 것은 옮기기를 미루겠다는 뜻이므로, 적을 때는 언제 뺄지도 함께 적는다.
 */
const LEGACY = new Set([]);

/** 파일 하나 → [[줄, 어디서, 찾은 색]] */
export function findColors(src) {
    const out = [];
    for (const m of src.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)) {
        const css = m[1].replace(/\/\*[\s\S]*?\*\//g, (c) => ' '.repeat(c.length));
        const base = m.index + m[0].indexOf('>') + 1;
        for (const c of css.matchAll(COLOR)) out.push([lineOf(src, base + c.index), '<style>', c[0]]);
    }
    // style="" — svg · data-keep-color 안은 뺀다. 여는 태그를 차례로 보며 그 둘의 깊이를 센다.
    const stack = [];
    for (const t of tokens(src)) {
        if (t.type === 'end') {
            const i = stack.lastIndexOf(t.tag);
            if (i >= 0) stack.length = i;
            continue;
        }
        const inside = stack.some((s) => s === 'svg' || s.startsWith('keep:'));
        const keep = 'data-keep-color' in t.attrs;
        if (!inside && !keep && t.tag !== 'svg' && t.attrs.style) {
            for (const c of t.attrs.style.matchAll(COLOR)) out.push([t.line, `<${t.tag} style>`, c[0]]);
        }
        if (!t.selfClosing && !VOID.has(t.tag)) stack.push(keep ? `keep:${t.tag}` : t.tag);
    }
    return out;
}

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

export async function check(args = []) {
    const r = new Report('check_colors');
    const picked = args.filter((a) => !a.startsWith('-')).map((a) => path.resolve(ROOT, a)).filter((p) => fs.existsSync(p));
    const files = picked.length ? picked : walk(ROOT, {ext: ['.html'], skip: SKIP});
    let hit = 0;
    for (const p of files) {
        const f = rel(p);
        const found = findColors(read(p));
        if (LEGACY.has(f) && !picked.length) {
            if (!found.length) r.error(`  ✗ ${f}: 박힌 색이 없어졌다 — tools/checks/colors.mjs 의 LEGACY 에서 뺀다`);
            continue;
        }
        if (!found.length) continue;
        hit++;
        const where = found.slice(0, 5).map(([line, what, c]) => `${line}행 ${what} ${c}`).join(' · ');
        r.error(`  ✗ ${f}: 색 ${found.length}곳 — ${where}${found.length > 5 ? ' …' : ''}`);
    }
    if (hit) r.error('색은 Tailwind 색 클래스나 공용 CSS(src/styles/)로 준다. 색이 곧 내용이면 data-keep-color 안에 둔다 (까닭은 tools/checks/colors.mjs 머리 주석)');
    return r.done(`완료 — 파일 ${files.length}, 색을 박은 파일 ${hit}, 아직 옮기지 않은 파일(LEGACY) ${LEGACY.size}`);
}
