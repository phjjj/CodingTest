const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
let arr = [];
for (let i = 0; i < N; i++) {
  arr.push(input[i].split(" ").map(Number));
}

const times = arr.sort((a, b) => {
  if (a[1] === b[1]) {
    return a[0] - b[0];
  } else {
    return a[1] - b[1];
  }
});

let end = 0;
let answer = 0;
times.forEach((time) => {
  if (time[0] >= end) {
    answer++;
    end = time[1];
  }
});
console.log(answer);
