const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map(Number);
const sum = input.reduce((a, b) => a + b);
const num = sum - 100;

let liarA = 0;
let liarB = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < input.length; j++) {
    if (input[i] + input[j] === num) {
      (liarA = input[i]), (liarB = input[j]);
    }
  }
}

for (v of input) {
  if (!(v == liarA || v == liarB)) {
    console.log(v);
  }
}
