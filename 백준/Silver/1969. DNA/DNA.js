const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const arrDna = input.map((v) => v.split(""));
const ACGT = ["A", "C", "G", "T"];
let str = "";
let min = 0;
for (let i = 0; i < M; i++) {
  let cnt = [0, 0, 0, 0];

  for (const dna of arrDna) {
    if (dna[i] === ACGT[0]) cnt[0]++;
    if (dna[i] === ACGT[1]) cnt[1]++;
    if (dna[i] === ACGT[2]) cnt[2]++;
    if (dna[i] === ACGT[3]) cnt[3]++;
  }
  str += ACGT[cnt.indexOf(Math.max(...cnt))];
  min += N - Math.max(...cnt);
}
console.log(str);
console.log(min);

// 해설
// str, min 출력 할 문자와, 최소합
// ACGT 배열은 각 스펠링과 비교하여 cnt를 세줘서 가장 큰 수 일 경우 Hamming Distance ... 의 합이 최소가 된다
// M(문자열 길이)만큼 for문을 돌린다

// arrDna의 안의 원소, dna[i]번째마다 어떤 알파벳인지 검사 후, 해당되는 알파벳에 ++
// 위 반복문이 끝나고 cnt배열에서 
// Math.max로 가장 큰값을 구하고 
// 그 구한값으로 indexOf로 해당위치를 구한다
// 그리고 ACGT[cnt.indexOf(Math.max(...cnt))]로 최적의 답 구할 수 있음.
// 그리고 최소합(Haming 어쩌구)를 구하려면, cnt가 가장 큰 값에서 (N)dna의 수를 빼면 된다

// 같은 DNA cnt가 있으면 사전순이기 때문에 배열을 선언할때 알파벳 순으로 했다
