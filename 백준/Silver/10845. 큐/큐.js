const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

let arr = [];

for (let i = 1; i <= Number(input[0]); i++) {
  arr.push(input[i].split(" "));
}

let queue = [];
let answer = [];

for (let i = 0; i < arr.length; i++) {
  if (arr[i][0] === "push") {
    queue.push(Number(arr[i][1]));
  } else if (arr[i][0] === "pop") {
    queue.length === 0 ? answer.push(-1) : answer.push(queue.shift());
  } else if (arr[i][0] === "size") {
    answer.push(queue.length);
  } else if (arr[i][0] === "empty") {
    queue.length === 0 ? answer.push(1) : answer.push(0);
  } else if (arr[i][0] === "front") {
    queue.length === 0 ? answer.push(-1) : answer.push(queue[0]);
  } else if (arr[i][0] === "back") {
    queue.length === 0 ? answer.push(-1) : answer.push(queue[queue.length - 1]);
  }
}
console.log(answer.join("\n"));
