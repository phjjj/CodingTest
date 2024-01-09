const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    // 초기 큐
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // 푸쉬할 경우
  push(item) {
    // 노드 생성
    const node = new Node(item);
    // 헤드가 null, 큐에 아무것도 없을 경우
    if (!this.head) {
      this.head = node;
      this.head.next = this.tail;
      // 생성한 노드를 next
    } else {
      this.tail.next = node;
    }
    // 마지막을 가리키는 tail은 방금 들어온 node
    this.tail = node;
    // 길이 +1
    this.size += 1;
  }
  // 현재 길이
  getSize() {
    return this.size;
  }
  // 원소 빼기 (앞 원소)
  pop() {
    // 현재길이가 3이상이면
    if (this.size > 2) {
      // 맨 앞 노드
      const item = this.head.item;
      const newHead = this.head.next;
      // 맨 앞 노드를 2번째 노드로 설정
      this.head = newHead;
      this.size -= 1;
      return item;
      // 2개일 경우에는 마지막 노드, 즉 2번째 노드가 첫번째로 설정하면 된다.
    } else if (this.size === 2) {
      const item = this.head.item;
      const newHead = this.head.next;
      this.head = newHead;
      this.tail = newHead;
      this.size -= 1;
      return item;
      // 한개면 null 설정
    } else if (this.size === 1) {
      const item = this.head.item;
      this.head = null;
      this.tail = null;
      this.size -= 1;
      return item;
      // 비었을 경우 -1
    } else {
      return -1;
    }
  }

  empty() {
    return this.size ? 0 : 1;
  }

  front() {
    return this.head ? this.head.item : -1;
  }

  back() {
    return this.tail ? this.tail.item : -1;
  }
}

const N = +input.shift();
let answer = "";
const queue = new Queue();

for (let i = 0; i < N; i++) {
  const [value, num] = input[i].split(" ");

  if (value === "push") {
    queue.push(num) + "\n";
  }
  if (value === "pop") {
    answer += queue.pop() + "\n";
  }
  if (value === "size") {
    answer += queue.getSize() + "\n";
  }
  if (value === "empty") {
    answer += queue.empty() + "\n";
  }
  if (value === "front") {
    answer += queue.front() + "\n";
  }
  if (value === "back") {
    answer += queue.back() + "\n";
  }
}
console.log(answer);
