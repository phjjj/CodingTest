const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M, brokenBtn] = input;
if (N == "100") return console.log(0);
if (M == 0) {
  brokenBtn = [];
}
function solution() {
  let answer = Math.abs(100 - Number(N));
  for (let i = 0; i < 1000000; i++) {
    const str = i.toString();
    let isValid = true;

    for (let j = 0; j < str.length; j++) {
      if (brokenBtn.includes(str[j])) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      answer = Math.min(answer, Math.abs(i - N) + str.length);
    }
  }
  console.log(answer);
}
solution();
