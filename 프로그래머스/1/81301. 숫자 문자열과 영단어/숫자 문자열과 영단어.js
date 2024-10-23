function solution(s) {
    var answer = ""
    const num = ["zero","one","two","three","four","five","six","seven","eight","nine"]
    
    for(let i =0; i<10; i++){
        s = s.split(num[i]).join(i)
        
    }
    return +s;
}

// num=[one two..] 배열 선언
// s.split(num[i]) 글자 기준으로 split -> "", 4, seven,... 이런식
// join(i+1)로 