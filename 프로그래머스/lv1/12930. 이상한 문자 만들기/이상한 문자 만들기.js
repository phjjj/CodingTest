function solution(s) {
    var answer = [];
    
    const word = s.split(" ")
    for(let i = 0; i<word.length; i++){
        let arr = []
        for(let j = 0; j<word[i].length; j++){
            if(j%2 === 0 ){
                arr.push(word[i][j].toUpperCase())
            } else {
                arr.push(word[i][j].toLowerCase())
            }
        }
        answer.push(arr.join(""))

    }
    

    return answer.join(" ");
}