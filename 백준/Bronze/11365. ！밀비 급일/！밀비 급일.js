const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const str = [];
for (const v of input) {
  if (v !== "END") {
    str.push(v.split("").reverse().join(""));
  }
}
console.log(str.join("\n"));
