const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map(Number);
const [A, T, V] = input;

let n = 0;
let i = 0;
let cnt = 0;
while (true) {
  n += 1;
  const arr = [0, 1, 0, 1];
  for (let i = 1; i <= n + 1; i++) arr.push(0);
  for (let j = 1; j <= n + 1; j++) arr.push(1);

  for (const number of arr) {
    if (number === V) cnt++;
    if (cnt === T) {
      console.log(i);
      return;
    }
    i += 1;
    i %= A;
  }
}

// 뻔 데기 뻔 데기 <- 이거는 항상 중복되서 반복된다
// arr 빈 배열 선언
// n회차 arr.push(0,1,0,1) 먼저 하고
// while(true)만들 고 n회차 기준으로
// for(let i =1; i<=n+1; i++) arr.push(0)
// for(let j =1; j<=n+1; j++) arr.push(1)

// T번째 (뻔,데기)를 구해야한다
// 배열의 모든 원소를 구하고자하는 V와 비교하면서 같으면 카운터를 센다
// let i = 0
// for(const number of arr)
// if(number === V) cnt++
// i++ i로 인덱스위치를 알수있다 이건 현재 외치고 있는 사람을 알수있음
// i++ 후 i %= A
// 그리고 cnt가 T와 같으면 몇번째 사람인지 찾아야한다
// if(cnt===T) return i
//
