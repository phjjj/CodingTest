function solution(s) {
    var answer = [];
    let queue = []
    
    for(let i =0; i<s.length; i++){
        // 큐에 있다면
        if(queue.includes(s[i])){
            answer.push(i-queue.lastIndexOf(s[i]))
            queue.push(s[i])
        } else{
            queue.push(s[i])
            answer.push(-1)
        }
    }
    return answer;
}


// s문자열을 큐랑 검사
// 큐에 같은 문자가 없으면 삽입
// 있다면 삽입 후, 배열의 크기와 가장 최근에 들어간 같은 문자의 인덱스 크기 빼기