const input = require("fs").readFileSync("dev/stdin").toString();

const result = [];

// 97~122 아스키 코드의 a-z이다
for (let i = 97; i <= 122; i++) {
  result.push(input.indexOf(String.fromCharCode(i)));
  // input.indexOF 를 통해 해당하는 배열의 인덱스를 반환하고 없으면 -1
  // String.fromCharCode(i) 아스키코드의 97~122까지의 indexof 메소드 실행
}

console.log(result.join(" "));
