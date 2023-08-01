const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

input.shift();

const arr = input.map((v) => v.split(" "));

let deq = [];
let answer = [];
for (let i = 0; i < arr.length; i++) {
  if (arr[i][0] === "push_front") {
    deq.unshift(arr[i][1]);
  } else if (arr[i][0] === "push_back") {
    deq.push(arr[i][1]);
  } else if (arr[i][0] === "pop_front") {
    if (deq.length === 0) {
      answer.push(-1);
    } else answer.push(deq.shift());
  } else if (arr[i][0] === "pop_back") {
    if (deq.length === 0) {
      answer.push(-1);
    } else answer.push(deq.pop());
  } else if (arr[i][0] === "size") {
    answer.push(deq.length);
  } else if (arr[i][0] === "empty") {
    if (deq.length === 0) {
      answer.push(1);
    } else answer.push(0);
  } else if (arr[i][0] === "front") {
    if (deq.length === 0) {
      answer.push(-1);
    } else answer.push(deq[0]);
  } else if (arr[i][0] === "back") {
    if (deq.length === 0) {
      answer.push(-1);
    } else answer.push(deq[deq.length - 1]);
  }
}
console.log(answer.join("\n"));
