const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const str = input[0];
let cnt = str.length;

for (let i = 0; i < str.length; i++) {
  if (str[i] === "c" && str[i + 1] === "=") {
    cnt--;
  }
  if (str[i] === "c" && str[i + 1] === "-") {
    cnt--;
  }
  if (str[i] === "d" && str[i + 1] === "z" && str[i + 2] === "=") {
    cnt--;
  }
  if (str[i] === "d" && str[i + 1] === "-") {
    cnt--;
  }
  if (str[i] === "l" && str[i + 1] === "j") {
    cnt--;
  }
  if (str[i] === "n" && str[i + 1] === "j") {
    cnt--;
  }
  if (str[i] === "s" && str[i + 1] === "=") {
    cnt--;
  }
  if (str[i] === "z" && str[i + 1] === "=") {
    cnt--;
  }
}

console.log(cnt);

