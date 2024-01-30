const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();

let answer = 0;

let eggs = input.map((v) => v.split(" ").map(Number));

function dfs(now) {
  // base condition: 모든 계란에 대한 탐색이 완료되면
  if (now == N) {
    // 깨진 계란의 수를 세어 최댓값 갱신
    let broken = 0;
    for (let i = 0; i < N; i++) {
      // 0보다 작거나 같을 경우 깨진 계란
      if (eggs[i][0] <= 0) broken++;
    }
    answer = Math.max(broken, answer);
    return;
  }

  // 현재 계란을 치지 않는 경우를 확인하기 위한 플래그
  let flag = true;

  // 다음 계란과의 치기를 시도
  for (let next = 0; next < N; next++) {
    // 현재 계란과 동일한 계란일 경우 무시
    if (next == now) continue;

    // 현재 계란 또는 다음 계란이 깨진 경우 무시
    if (eggs[now][0] <= 0 || eggs[next][0] <= 0) continue;

    // 계란을 치고, 내구도 감소
    eggs[now][0] = eggs[now][0] - eggs[next][1];
    eggs[next][0] = eggs[next][0] - eggs[now][1];

    // 다음 계란에 대한 DFS 호출
    dfs(now + 1);

    // 계란을 치고 난 후 내구도를 복구
    eggs[now][0] = eggs[now][0] + eggs[next][1];
    eggs[next][0] = eggs[next][0] + eggs[now][1];

    // 플래그 갱신: 최소한 한 번은 계란을 쳤음을 표시
    flag = false;
  }

  // 해당 계란을 안 치는 경우도 확인
  if (flag) dfs(now + 1);
}

// DFS 함수 호출 (시작은 0번째 계란부터)
dfs(0);

// 최대 깨진 계란의 수 출력
console.log(answer);


// 계란을 깨는 순서에 따라 경우의 수가 다르다
// 그래서 현재 손에 든 계란을 치지 않고 다시 두는 경우도 있다는 것을 명심
// 모든 경우의 수에서 탐색을 하고 깨진 계란을 세어서 최댓값을 갱신