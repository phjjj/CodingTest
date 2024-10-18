function solution(t, p) {
    var answer = 0;
    
    for (let i=0; i<= t.length - p.length ; i++) {
        let num = t.substr(i, p.length);
        
        if (Number(num) <= Number(p)) 
            answer ++
    }
    return answer;
}

// t.length - p.length = 4
// substr 메서드는 해당 문자열의 부분문자열을 반환해준다.
// substr(0,3) substr(1,3) ... 이런식으로