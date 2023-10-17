const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arrM = input.map((v) => v.split(" ").map(Number));

// 아이스크림은 1부터 시작하니까 6x6 2차원배열을 만든다
let arr = Array.from({ length: N + 1 }, () => Array.from({ length: N + 1 }, () => false));

for (let i = 0; i < arrM.length; i++) {
  const [a, b] = arrM[i];
  arr[a][b] = true;
  arr[b][a] = true;
}

let cnt = 0;
for (let i = 1; i <= N; i++) {
  for (let j = i + 1; j <= N; j++) {
    for (let k = j + 1; k <= N; k++) {
      if (arr[i][j] || arr[i][k] || arr[j][k]) continue;

      cnt++;
    }
  }
}
console.log(cnt);
// 풀이

// arr를 2차원 배열로 만든다
// m개의 조합을 arr[a][b]=true , arr[b][a]=true  만들고
// 3중 for문을 만들어 arr[a][b]와 같을 경우 continue
// 조합에 해당되지 않으면 cnt++
