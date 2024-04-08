const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const gearsArr = input.slice(0, 4).map((v) => v.split("").map(Number));
const K = Number(input.slice(4, 5));
const rotaionArr = input.slice(5).map((v) => v.split(" ").map(Number));

function rotate(gear, dir, n) {
  if (dir === 1) {
    gear.unshift(gear.pop());
  } else {
    gear.push(gear.shift());
  }
  gearsArr[n] = gear;
}

// 선택된 톱니바퀴n, 방향 dir
function left(n, dir) {
  if (n === 0) return;
  if (gearsArr[n][6] !== gearsArr[n - 1][2]) {
    left(n - 1, -dir);
    // 돌리기
    rotate(gearsArr[n - 1], dir, n - 1);
  }
}

function right(n, dir) {
  // 마지막 톱니바퀴일 경우 함수 종료
  if (n === 3) return;

  // 인접한 톱니바퀴 극이 다를 때만 회전시킨다
  if (gearsArr[n][2] !== gearsArr[n + 1][6]) {
    right(n + 1, -dir);
    // 돌리기

    rotate(gearsArr[n + 1], dir, n + 1);
  }
}

for (let i = 0; i < K; i++) {
  const [n, dir] = rotaionArr[i];

  left(n - 1, -dir);
  right(n - 1, -dir);
  rotate(gearsArr[n - 1], dir);
}

function getScore(gearsArr) {
  let answer = 0;
  for (let i = 0; i < gearsArr.length; i++) {
    if (i === 0 && gearsArr[i][0] === 1) {
      answer += 1;
    }
    if (i === 1 && gearsArr[i][0] === 1) {
      answer += 2;
    }
    if (i === 2 && gearsArr[i][0] === 1) {
      answer += 4;
    }
    if (i === 3 && gearsArr[i][0] === 1) {
      answer += 8;
    }
  }
  return answer;
}

console.log(getScore(gearsArr));

// 톱니바퀴 고정 4개 N or S
// 시계방향 or 반시계방향 한칸
// A바퀴를 돌릴 경우 양 끝이 같은 극이면 회전하지않고, 다른극 일 경우 반대방향으로 회전

// N = 0, S = 1
// 1 = 시계방향, -1 = 반시계방향

// 1. 톱니바퀴A를 회전하기전 맞닿은 톱니바퀴의 극 비교
// 2. 같은 극일 경우, A의 회전의 반대방향으로 회전

// 각 톱니바퀴의 극을 비교하는 함수
// 톱니바퀴를 이동하는 함수
