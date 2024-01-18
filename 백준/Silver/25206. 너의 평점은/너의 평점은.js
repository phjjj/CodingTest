const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const subjects = input.map((v) => v.split(" "));

let score = 0;
let sum = 0;

for (let i = 0; i < subjects.length; i++) {
  let [subject, credit, grade] = subjects[i];
  credit = Number(credit.slice(0, 1));

  if (grade === "A+") grade = 4.5;
  if (grade === "A0") grade = 4.0;
  if (grade === "B+") grade = 3.5;
  if (grade === "B0") grade = 3.0;
  if (grade === "C+") grade = 2.5;
  if (grade === "C0") grade = 2.0;
  if (grade === "D+") grade = 1.5;
  if (grade === "D0") grade = 1.0;
  if (grade === "F") grade = 0;
  if (grade === "P") continue;
  score += credit * grade;
  sum += credit;
}
console.log(score / sum);
// P는 continue
