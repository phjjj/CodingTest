const fs = require("fs");
const input = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((v) => v.split(" ").map(Number));

const n = input.shift()[0];

solution(input);

function solution(arr) {
    let white = 0;
    let blue = 0;

    recursive(0, 0, n);

    function recursive(x, y, size) {
        let cnt = 0;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                cnt += arr[x + i][y + j];
            }
        }

        if (cnt === 0) white++;
        else if (cnt === size * size) blue++;
        else {
            size /= 2;
            recursive(x, y, size);
            recursive(x + size, y, size);
            recursive(x, y + size, size);
            recursive(x + size, y + size, size);
        }
    }

    console.log(white);
    console.log(blue);
}