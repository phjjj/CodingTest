const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("");

let cnt = 0;
let numSet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const numberArr = input.map(Number);

function buy() {
  for (let i = 0; i < 10; i++) {
    numSet[i]++;
  }
  cnt++;
}

for (let i = 0; i < numberArr.length; i++) {
  if (numSet[numberArr[i]] >= 1) {
    numSet[numberArr[i]]--;
    continue;
  } else {
    if (numberArr[i] === 6 && numSet[9] >= 1) {
      numSet[9]--;
      continue;
    }
    if (numberArr[i] === 9 && numSet[6] >= 1) {
      numSet[6]--;
      continue;
    }
  }
  buy();
  numSet[numberArr[i]]--;
}

console.log(cnt);
