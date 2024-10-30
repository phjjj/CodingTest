const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [n, c] = input.shift().split(" ").map(Number);
const numberArr = input.shift().split(" ").map(Number);

const obj = new Map();

for (let i = 0; i < numberArr.length; i++) {
  const num = numberArr[i];
  if (obj.has(num)) {
    obj.set(num, obj.get(num) + 1);
  } else {
    obj.set(num, 1);
  }
}
const sortArr = [...obj].sort((a, b) => {
  if (a[1] === b[1]) {
    return numberArr.indexOf(a[0]) - numberArr.indexOf(b[0]); // 등장 순서 유지
  } else {
    return b[1] - a[1];
  }
});
let answer = [];

for (let i = 0; i < sortArr.length; i++) {
  const n = sortArr[i][0];
  const cnt = sortArr[i][1];
  for (let j = 0; j < cnt; j++) {
    answer.push(n);
  }
}

console.log(answer.join(" "));

// let sortArr = [];
// obj.forEach((v, i) => {
//   sortArr.push([v, i]);
// });
// console.log(sortArr);
// n개의 수열, 숫자는 c보다 작거나 같다.
// 자주 나오는 빈도순 정렬

// 객체를 쌍으로 만들어서 (숫자,빈도)로 만든다.
// sort를 이용해서 빈도순으로 정렬
