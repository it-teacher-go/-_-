// CSS를 옮기기 전후로 **계산된 스타일이 그대로인지** 본다. 인라인 <style>을 공용 CSS로 올리거나
// 겹친 규칙을 합칠 때 쓴다 — 고치기 전에 save, 고친 뒤에 diff.
//
//     npm run audit -- styles save                  저장소 전체를 떠 둔다(dist-styles/<테마>-<폭>/)
//     npm run audit -- styles diff                  떠 둔 것과 견준다. 다른 요소를 페이지마다 보인다
//     npm run audit -- styles save 프로그래밍        폴더(또는 파일)만
//     npm run audit -- styles diff --dark           다크 테마로(기본은 라이트)
//     npm run audit -- styles diff --all            페이지마다 차이를 다 보인다(기본은 열두 곳까지)
//     npm run audit -- styles save --width=375      폭을 정한다(기본 1366). 폭마다 따로 떠 두고 견준다
//
// 실제로 재는 것은 진짜 브라우저다 → tests/browser/style-snapshot.test.mjs(재는 속성 목록과 한계가 거기 있다).
// **ci 에 넣지 않는다** — 옮기기 전의 모습이라는 «기준»이 저장소에 없고, 다 재면 몇 분 걸린다.
//
// 시뮬레이터처럼 **무작위 값으로 그리는 페이지**는 고치지 않아도 달라진다. save 바로 뒤에 diff를 한 번
// 돌려 그런 곳을 먼저 알아 두고, 고친 뒤의 diff에서 그것을 빼고 읽는다.
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {ROOT} from '../lib/repo.mjs';

export function run(argv) {
    const [mode, ...rest] = argv;
    if (mode !== 'save' && mode !== 'diff') {
        console.error('쓰는 법 — audit -- styles save|diff [폴더 · 파일…] [--dark] [--all] [--width=375]');
        process.exitCode = 2;
        return;
    }
    const dark = rest.includes('--dark');
    const all = rest.includes('--all');
    const width = (rest.find((a) => a.startsWith('--width=')) || '').slice(8);
    const dirs = rest.filter((a) => !a.startsWith('--'));
    const proc = spawnSync(process.execPath, [
        path.join(ROOT, 'node_modules', 'vitest', 'vitest.mjs'), 'run', 'tests/browser/style-snapshot.test.mjs',
    ], {
        cwd: ROOT, stdio: 'inherit',
        env: {
            ...process.env,
            VITE_STYLE_MODE: mode,
            VITE_STYLE_THEME: dark ? 'dark' : 'light',
            VITE_STYLE_DIRS: JSON.stringify(dirs),
            VITE_STYLE_ALL: all ? '1' : '',
            VITE_STYLE_WIDTH: width,
        },
    });
    process.exitCode = proc.status ?? 1;
}
