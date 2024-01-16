const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();

const arr = input.map((v) => v.split(" ").map(Number));

let answer = [0, 0, 0];

function solution(x, y, n) {
  // 현재 크기에서 모든 배열의 원소를 검사
  let target = arr[x][y];
  let isSame = true;

  for (let i = x; i < x + n; i++) {
    for (let j = y; j < y + n; j++) {
      if (arr[i][j] !== target) {
        isSame = false;
        break;
      }
    }
    if (!isSame) break;
  }

  // 하나라도 다르면 9칸으로 쪼갠다
  if (!isSame) {
    solution(x, y, n / 3);
    solution(x, y + n / 3, n / 3);
    solution(x, y + (n / 3) * 2, n / 3);
    solution(x + n / 3, y, n / 3);
    solution(x + (n / 3) * 2, y, n / 3);
    solution(x + n / 3, y + n / 3, n / 3);
    solution(x + n / 3, y + (n / 3) * 2, n / 3);
    solution(x + (n / 3) * 2, y + n / 3, n / 3);
    solution(x + (n / 3) * 2, y + (n / 3) * 2, n / 3);
  } else {
    // 하나라도 다르지 않다면 해당 숫자의 개수 증가
    answer[target + 1]++;
  }
}

// 전체 종이 크기인 n을 사용하여 시작

solution(0, 0, N);

// 결과 출력
console.log(answer.join("\n"));

// 결과를 어떻게 처리할 것인지에 대한 로직이 더 필요함
// 0, 1, -1에 대한 결과를 출력하거나 처리하는 부분을 추가해야 함

// 만약 종이가 모두 같은 수로 되어 있다면 이 종이를 그대로 사용한다.
// (1)이 아닌 경우에는 종이를 같은 크기의 종이 9개로 자르고, 각각의 잘린 종이에 대해서 (1)의 과정을 반복한다

// 이와 같이 종이를 잘랐을 때, -1로만 채워진 종이의 개수, 0으로만 채워진 종이의 개수, 1로만 채워진 종이의 개수를 구해내는 프로그램을 작성하시오.

// 현재 크기에서 모든 배열의 원소를 검사 후 하나라도 다르면 9칸으로 쪼갠다'
// 9칸으로 쪼갠 후 (n/3) * (n/3) 으로 배열ㅇ르 검사
