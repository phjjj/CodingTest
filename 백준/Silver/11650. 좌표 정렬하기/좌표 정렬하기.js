const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().split("\n");

let n = Number(input[0]);
let data = []
for(let i = 1; i<=n; i++) {
    let [x, y] = input[i].split(" ").map(Number);
    data.push([x,y])
}

data.sort((a,b)=>{
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
})

let answer = "";
data.forEach(data=>{answer += data[0]+ " " +data[1]+"\n";})


console.log(answer)