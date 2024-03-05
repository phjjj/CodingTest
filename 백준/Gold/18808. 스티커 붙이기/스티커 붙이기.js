const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M, K] = input.shift().split(" ");

const board = Array.from({ length: N }, () => Array.from({ length: M }, () => 0));

for (let i = 0; i < K; i++) {
  const [R, C] = input.shift().split(" ").map(Number);
  let sticker = [];
  for (let j = 0; j < R; j++) {
    sticker.push(input.shift().split(" ").map(Number));
  }

  for (let i = 0; i < 4; i++) {
    // 체크 후 true일 경우, 붙이는 게 성공했으니, break
    if (check(sticker)) break;
    // false 일 경우, 스티커 돌리기
    sticker = rotate(sticker);
  }
}

let count = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j]) count++;
  }
}
console.log(count);

function check(sticker) {
  const R = sticker.length;
  const C = sticker[0].length;
  // 모눈종이가 올릴 수 있는 모든 경우의수 찾기
  // 왼쪾 위 부터 되는 곳까지 찾아야 하기 때문에
  // n-r, m-c 해준다
  for (let i = 0; i <= N - R; i++) {
    for (let j = 0; j <= M - C; j++) {
      if (isFitted(i, j, sticker)) {
        cover(i, j, sticker);
        return true;
      }
    }
  }

  return false;
}

// 붙일수 있는지 체크
function isFitted(x, y, sticker) {
  const R = sticker.length;
  const C = sticker[0].length;

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      // 스티커가 있고, 붙일 수 있는 현재의 노트북[x][y]에서 +i ,+j 가 1일 경우 false 반환
      if (sticker[i][j] && board[x + i][y + j]) return false;
    }
  }
  //
  return true;
}

function cover(x, y, sticker) {
  const R = sticker.length;
  const C = sticker[0].length;

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      board[x + i][y + j] |= sticker[i][j];
    }
  }
}

function rotate(sticker) {
  const R = sticker.length;
  const C = sticker[0].length;
  const rotated = Array.from(Array(C), () => Array(R));

  for (let i = 0; i < C; i++) {
    for (let j = 0; j < R; j++) {
      // 90도 돌릴 시, 아래와 같은 식으로 배열 수정
      const ni = R - 1 - j;
      const nj = i;
      rotated[i][j] = sticker[ni][nj];
    }
  }

  return rotated;
}
