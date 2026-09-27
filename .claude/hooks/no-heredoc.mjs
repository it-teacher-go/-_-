/**
 * Bash · PowerShell 도구의 **셸 힙독을 막는다** (`CLAUDE.md` 「작업 방식」, 까닭은 `docs/개발-환경.md` 「셸」).
 *
 * **규칙으로는 안 고쳐졌다.** 힙독은 따옴표를 쳐도 백슬래시와 백틱을 먹어 — `\b`가 제어문자(0x08)가 되고
 * `\n`이 진짜 줄바꿈이 되어 — 정규식이 조용히 망가진 채 파일에 쓰인다. 그래서 사람이 지키는 것에서
 * 도구가 막는 것으로 옮긴다.
 *
 * **무엇을 막는가.** `<<EOF` · `<< EOF` · `<<'PY'` · `<<"X"` · `<<-EOF`, 그리고 PowerShell 여기-문자열
 * (`@'` · `@"`로 끝나는 줄). **히어스트링(`<<<`)은 통과시킨다** — 백슬래시를 안 먹는다. 커밋 메시지 속
 * `<<` 글자처럼 힙독이 아닌 것도 통과시킨다.
 *
 * **셸을 안 거친다.** `settings.json`이 `args` 꼴로 부르므로 이 파일의 따옴표와 백슬래시가
 * 셸 파서에 닿지 않는다 — 막으려는 병을 막는 도구가 같은 병에 걸리면 안 된다.
 */

let input = ''

process.stdin
  .on('data', (chunk) => {
    input += chunk
  })
  .on('end', () => {
    try {
      const command = (JSON.parse(input || '{}').tool_input || {}).command || ''
      // 따옴표로 묶인 글(커밋 메시지 등)은 셸이 힙독으로 읽지 않으므로 지우고 본다.
      // 단 `<<'PY'`처럼 `<<` 바로 뒤의 따옴표는 힙독의 끝 표지이므로 남기고, 명령 치환(`"$(cat <<EOF …)"`)이
      // 든 글도 남긴다 — 그 안의 힙독은 진짜로 돈다.
      const unquoted = command.replace(/(?<!<<-?[ \t]*)(["'])(?:\\.|(?!\1)[\s\S])*\1/g, (m) => (m.includes('$(') ? m : ''))
      const heredoc = /(?<!<)<<(?!<)-?[ \t]*['"]?[A-Za-z_]/.test(unquoted)
      const hereString = /@['"]\s*$/m.test(command)
      if (!heredoc && !hereString) return
      process.stdout.write(
        JSON.stringify({
          hookSpecificOutput: {
            hookEventName: 'PreToolUse',
            permissionDecision: 'deny',
            permissionDecisionReason:
              '힙독 금지 (CLAUDE.md 「작업 방식」). 셸 힙독은 백슬래시를 조용히 먹는다 — `\\b`가 제어문자가 되고 `\\n`이 줄바꿈이 되어, 문법 오류로 서면 다행이고 정규식은 안 서고 아무것도 안 잡는 채로 초록불이 된다. 파일은 Write/Edit 도구로 써라. 여러 줄을 꼭 셸로 넘겨야 하면 파일로 쓰고 그 경로를 넘겨라(`git commit -F <파일>`처럼).',
          },
        }),
      )
    } catch {
      // 입력이 JSON이 아니면 판정하지 않는다 — 막는 쪽으로 기울면 멀쩡한 명령이 선다.
    }
  })
