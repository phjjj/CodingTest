const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");
const n = +input[0];
const arr = input[1].split(" ").map(Number);

// 주어진 수열의 길이가 2 이하인 경우, 항상 삼각 수열이라고 가정하고 최솟값을 2로 설정
let answer = Math.min(n, 2);

// 오름차순 정렬
arr.sort((a, b) => a - b);
// console.log(arr);
// 외부 for문은 첫 번째 숫자부터 끝에서 두 번째 숫자까지를 기준으로 잡음
for (let i = 0; i < n - 2; i++) {
  // 내부 for문은 끝에서부터 두 번째 숫자까지
  for (let k = n - 1; k > i + 1; k--) {
    let [x, y, z] = [arr[i], arr[i + 1], arr[k]];
    // console.log(i, i + 1, k);
    // console.log("x:", x, "y:", y, "z:", z);
    if (x + y > z) {
      // 현재의 삼각 수열의 길이를 계산
      answer = Math.max(answer, k - i + 1);
      // console.log("Current answer:", answer);
      // 이미 삼각 수열이면 뒤에는 더이상 확인할 필요가 없으므로 반복 중단 ..
      break;
    }
  }
}

// 최대 길이 출력
console.log(answer);

// 풀이
// 가장작은수 + 가장작은수보다 큰 작은수 > 큰수
// 삼각관계에서 x+y>z 하나만 만족하면 그 뒤에도 다 만족하여 삼각수열이 된다.

// 오름차순으로 정렬 후, x,y,z로 3개의 요소를 반복해서 구한 후 삼각관계일 경우 삼각수열이라 보고 최대 길이를 업데이트해준다

// n-2 만큼 요소를 검사한다.

// 첫 for문은 n-2만큼 반복한다 왜? 맨 끝 요소 제외 하고 작은 수 x,y만 변화시킬거임
// 두번째 for문은 오름차순으로 되어있는 arr의 끝인 최댓값부터 비교 할 z를 구할거
// x+y>z 일 경우, 삼각관계가 형성이 되는데 z가 가장 큰 값이니까 두번째 for문은 더 작은 요소를 가르키기때문에 break 실행
// 수열의 길이는 수열의 시작길이인 i, 수열의 끝 길이인 k 이므로 k-i+1을 하면 답이나옴 ex)
