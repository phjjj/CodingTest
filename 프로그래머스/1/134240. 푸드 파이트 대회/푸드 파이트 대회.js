function solution(food) {
    var answer = '';
    let arr = []
    for(let i =1; i<food.length; i++){
        const n = Math.floor(food[i] / 2)
        for(let j =0; j<n; j++){
            arr.push(i)
        }
    }

    console.log(arr)
    const reverseArr = [...arr].reverse()
    answer = arr.join("") + 0 + reverseArr.join("")
    return answer;
}


// 첫번째 index는 무조건 0, 그 다음 index는 food[n]=음식수
// food[i] / 2 = 한 사람이 먹을 음식 양
// 한 사람이 먹을 양만큼 i를 arr.push(i)
// arr가 만들어졌다면 reverse 값을 복사
// str+=한번 더하고 0 더하고 reverse 값 더하기