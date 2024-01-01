const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const arr = [
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

const cntArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const S = input.join("").split("");

S.forEach((v) => {
  for (let i = 0; i < arr.length; i++) {
    if (v === arr[i]) {
      cntArr[i]++;
    }
  }
});

console.log(cntArr.join(" "));
// a-z 까지 배열 만들고 단어와 비교 후
// 해당 자리의 알파벳이 있을 경우
