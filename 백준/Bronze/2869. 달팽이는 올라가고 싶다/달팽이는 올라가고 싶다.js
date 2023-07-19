const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

const up = Number(input.join("").split(" ")[0]);
const down = Number(input.join("").split(" ")[1]);
let height = Number(input.join("").split(" ")[2]);
let day = (height - down) / (up - down);

if ((height - down) % (up - down) != 0) {
  day++;
}
console.log(Math.floor(day));
