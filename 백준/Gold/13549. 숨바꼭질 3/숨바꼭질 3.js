const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, X] = input.shift().split(" ").map(Number);

const dir = [2, -1, 1];
const arr = Array.from({ length: 100001 }, () => []);
const visited = Array.from({ length: 100001 }, () => false);

let queue = [[N, 0]];
// 1 2 4 8 16 17 1초
while (queue.length) {
  const [x, cnt] = queue.shift();

  if (x === X) return console.log(cnt);

  for (let i = 0; i < 3; i++) {
    // 순간이동 할 경우
    if (i === 0) {
      const moveX = x * dir[i];
      if (moveX < 0 || moveX > 100000 || visited[moveX]) continue;
      queue.unshift([moveX, cnt]);
      visited[moveX] = true;
    } else {
      const moveX = x + dir[i];
      if (moveX < 0 || moveX > 100000 || visited[moveX]) continue;
      queue.push([moveX, cnt + 1]);
      visited[moveX] = true;
    }
  }
}

// 해설
// dfs를 이용해도 되고 bfs를 이용해도 될 것같다.
// 이동 할 수 있는 방법 3가지 [-1,1,2] 2번째 인덱스까지는 더하고 3번째 인덱스 일 경우 곱
// queue = [x,cnt]
// 인덱스 2번째까지는 cnt++ 큐에 넣는 작업때 cnt++
// 인덱스 3번째에서는 cnt = cnt

// 시간 초과가 날 거다 무조건 어떻게 해야결 해야할까
// 할 수 있는방법은 X에서 부터 뭔가를 해야할거같은데 모르겠다
// 아 우선순위 큐와 같은 건가
// 1. 순간이동은 0초이므로 순간이동으로 한 것을 unshift로 앞에다 둔다
// 홀리쉣

// 처음에 자꾸 답이 틀리게 나왔는데 dir에서 곱하는거를 마지막 인덱스로 넣어서 그랬따
// 마지막 인덱스여서 앞에 더하고 ㅃㅐ는게 방문 처리가 되어버려서 곱하지를 않네

// 수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다.
// 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다.
// 순간이동을 하는 경우에는 0초 후에 2*X의 위치로 이동하게 된다.
// 수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.
