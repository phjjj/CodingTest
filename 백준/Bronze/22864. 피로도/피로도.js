const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [A, B, C, M] = input.join().split(" ").map(Number);

let piro = 0;
let work = 0;

for (let i = 0; i < 24; i++) {
  if (piro + A <= M) {
    piro += A;
    work += B;
  } else {
    piro -= C;
  }
  if (piro < 0) {
    piro = 0;
  }
}

console.log(work);
