const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
let X = +input.shift();
let line = 0;
let a = 0;
let b = 0;
while (X > line) {
  X -= line;
  line += 1;

  if (line % 2 == 0) {
    a = X;
    b = line - X + 1;
  } else {
    a = line - X + 1;
    b = X;
  }
}

console.log(a + "/" + b);
// x가 몇번재 배열에 있는지 찾아야한다.
// 3번째라 치면 0,1 이다
