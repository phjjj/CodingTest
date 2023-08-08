const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

const map = new Map();
const alphabets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

let i = 0;
for (const alphabet of alphabets) {
  map.set(alphabet, i + 1);
  i++;
}
let arr = [];
for (let i = 0; i < input[1].length; i++) {
  arr.push(map.get(input[1][i]));
}

arr.map((v, i) => {
  arr[i] = v * Math.pow(31, i);
});
console.log(arr.reduce((a, b) => a + b));
