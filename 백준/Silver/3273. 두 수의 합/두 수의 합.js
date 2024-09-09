const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const n = Array.from({ length: 1000000 }, () => 0);
const seqArr = input[1].split(" ").map(Number);
const x = +input[2];
let cnt = 0;

for (let i = 0; i < seqArr.length; i++) {
  if (n[x - seqArr[i]] === 1) {
    cnt++;
  } else {
    n[seqArr[i]] = 1;
  }
}
console.log(cnt);
