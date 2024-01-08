const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const sequenceArr = input.map(Number);

let stackArr = [];
let stackNum = 1;
let answer = [];

for (let i = 0; i < N; i++) {
  while (stackNum <= sequenceArr[i]) {
    stackArr.push(stackNum);
    answer.push("+");
    stackNum++;
  }

  let num = stackArr.pop();

  if (num !== sequenceArr[i]) {
    return console.log("NO");
  }
  answer.push("-");
}
console.log(answer.join("\n"));

// 가장 처음 주어진 숫자, 8은 수열의 길이이다.(iter)
// 4부터 1까지는 input 배열이 될 것이다. 이는 문제에서 말하는 수열을 의미한다.

// 빈 stack을 만들어주고, stack에는 1부터 8까지 차례대로 들어갈 수 있다.

// 여기서, 문제를 이해하고 넘어가야한다.
// input은 [4,3,6,8,7,5,2,1] 이다. 이는 우리가 만들어내야할 수열이기도 하다.
// 그리고 우리는 stack에 1,2,3,...,8까지 순서대로 넣어줄 수 있고,
// LIFO(Last In First Out) 구조인 스택에서는 나중에 들어간 것부터 꺼낼 수 있다.

// 수열을 만들기 위해서는 stack에 들어갔다가 나오는 숫자만 사용할 수 있다는 점을 잊지말자.

// 즉, input의 순서대로 수열을 만들어내기 위해서 stack을 조작해야한다는 뜻이다.

// for문으로 들어가보자.
// 처음으로 해야할 것은 꺼내야할 숫자를 정하는 것이다.
// 꺼내줘야할 숫자는 input[i]이다.
// 여기서는 4를 가장 먼저 꺼내줘야하므로, num을 4로 설정한다.

// stackNum를 1부터 시작해서 num까지 증가시키며 stack에 넣어준다.
// 이 때 ans 배열에는 "+" 문자를 넣어줘야한다.

// 현재 stack은 [1,2,3,4] 이다.

// num까지 넣어줬으니, stack에서 pop을 하면 그 값은 num가 일치한다.
// 따라서, pop을 실행하고 ans에 "-" 문자를 넣어준다.

// 이제 for문 i가 증가한다.
// 이번에는 num이 3이다.

// 여기서 주의해야할 점은, stackNum은 for문 밖에 선언했기 때문에 다시 1로 돌아가지 않는다는 것이다.
// 따라서, while문의 조건을 불만족. 실행되지 않고 pop으로 넘어간다.

// 이렇게 반복하면서 수열을 만들어간다.
