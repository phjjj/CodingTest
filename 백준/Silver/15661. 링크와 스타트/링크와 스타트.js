const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const n = Number(input.shift()); // 전체 팀원 수
const check = Array.from({ length: n }, () => false); // 팀원이 속한 팀 여부 체크 배열
const stats = input.map((v) => v.split(" ").map(Number)); // 팀원들의 능력치 배열
let min = 987654321; // 초기 최소값 설정

for (let i = 1; i <= n / 2; i++) {
  // console.log("for문");
  // console.log(0, 0, n, i);
  dfs(0, 0, n, i); // 가능한 팀 조합을 찾기 위해 DFS 호출
}

console.log(min); // 최소 능력치 차이 출력

function dfs(cnt, start, n, m) {
  // 탈출문
  if (cnt === m) {
    let a_sum = 0;
    let b_sum = 0;
    // 가능한 팀 조합에 대한 능력치 계산
    for (let i = 0; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        if (i !== j) {
          // check가 false 일 경우 === A팀
          // check가 true 일 경우 === B팀
          // console.log(check[i], check[j]);
          if (check[i] && check[j]) a_sum += stats[i][j] + stats[j][i];
          if (!check[i] && !check[j]) b_sum += stats[i][j] + stats[j][i];
        }
      }
    }
    min = Math.min(min, Math.abs(a_sum - b_sum)); // 최소 능력치 차이 갱신
    return;
  }

  for (let i = start; i < n; i++) {
    if (!check[i]) {
      check[i] = true; // 팀에 포함시킴
      // console.log(cnt + 1, start + 1, n, m);
      dfs(cnt + 1, i + 1, n, m); // 다음 팀원으로 이동
      check[i] = false; // 팀에서 제외시킴
    }
  }
  return;
}

// 풀이
// 팀은 두팀 밖에 없다. 그래서 만약

// A, B, C, D, E의 인원이 있을 경우
// {A, {B, C, D, E}}, {B, {A, C, D, E}}.... {E, {A, B, C, D}}의 경우처럼 하나를 고르고 나머지를 전부 같은 팀으로 판정하면 경우의 수가 만들어집니다.
// {{A, B}, {C, D, E}}, {{A, C}, {B, D, E}}, {{A, D, {B, C, E}}... 와 같이 두 개를 고르고 나머지를 전부 같은 팀으로 판정하면 경우의 수가 만들어집니다.
// {{A, B, C}, {D, E}}... 같이 세 개를 고르는 경우 바로 위에서 두개를 고른 경우와 경우의 수가 같기 때문에 굳이 중복해서 판별하지 않아도 됩니다.

// 그래서 n/2 만큼만 탐색한다. 그러면 중복해서 판별하지 않고 한번만 탐색 하면 된다 (능력치는 항상 같기에)

// check = 체크 배열을 선언해서 팀을 구분할 수 있다 check true일 경우 팀에 속한거다. 쉽게 말해서 A팀이 true b팀이 false
// n/2 만큼, 한 팀에 선수가 들어갔을 때, dfs() 실행

// cnt = 현재까지 뽑은 팀원의 수
// start = 다음 팀원 추적 인덱스
// n = 사람 수
// m = 포함시킬 팀원 수

// 현재까지 뽑은 팀원 수와 포함시킬 팀원 수가 같아지면 탈출문 실행한다
// 이중 for문 (0,1),(0,2),(0,3)... 이런식으로
// 선수들의 능력치인 2차원배열을 더 해준다
// 선수가 포함 되어 있을 경우 a팀
// 그 외 선수들은 b팀
