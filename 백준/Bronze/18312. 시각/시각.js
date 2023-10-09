const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, K] = input.join(" ").split(" ").map(Number);
// const hours = 0;
// const minutes = 0;
// const seconds = 0;
let cnt = 0;

for (let i = 0; i <= N; i++) {
  for (let j = 0; j < 60; j++) {
    for (let k = 0; k < 60; k++) {
      const hours = i < 10 ? String("0" + i).split("") : String(i).split("");
      const minutes = j < 10 ? String("0" + j).split("") : String(j).split("");
      const seconds = k < 10 ? String("0" + k).split("") : String(k).split("");

      if (hours.includes(String(K)) || minutes.includes(String(K)) || seconds.includes(String(K))) {
        cnt++;
      }
    }
  }
}
console.log(cnt);
// 00시 ~ 5시까지 3 들어가는거
// 최대 N시(hours)까지 반복문을 만든다 01234
// 최대 59분(minutes)까지 반복문
// 최대 초 까지 반복문 여기서 마지막에 i,j,j 시 분 초에 문자열로 만들고 split 한 다음 3이 들어간다면 cnt++
// 추가로 0을 붙여야함
