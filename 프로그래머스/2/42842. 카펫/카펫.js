function solution(brown, yellow) {
    var answer = [];
    let allCount = brown + yellow
    for(let i =3; i<allCount; i++){
        if(allCount % i ===0){
           let width = allCount / i
           let height = i
           
           if((height -2)*(width-2) === yellow){
               answer.push(width,height)
               return answer
           }
        }
    }
    return answer;
}

//Leo가 본 카펫에서 갈색 격자의 수 brown, 노란색 격자의 수 yellow가 매개변수로 주어질 때
// 카펫의 가로, 세로 크기를 순서대로 배열에 담아 return 하도록 solution 함수를 작성해주세요.

// 테투리는 brown, 가운데는 yellow
// 카펫은 9개 이상, 최소 세로는 3이다

// brown + yellow / 가로(3..4..5..) = 나누어 떨어지면 세로값
// 가로-2 * 세로-2 == yellow 일 경우 반환
