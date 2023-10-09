const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

const m = Number(input[0].split(" ")[1]);
const cards = input[1].split(" ").map(Number);

let jack = 0;
for (let i = 0; i < cards.length - 2; i++) {
  for (let j = i + 1; j < cards.length - 1; j++) {
    for (let k = j + 1; k < cards.length; k++) {
      let sum = cards[i] + cards[j] + cards[k];
      if (sum > jack && sum <= m) {
        jack = sum;
      }
    }
  }
}
console.log(jack);
