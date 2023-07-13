function solution(n, m) {
    var answer = [];
    // 최대공약수
    const greatest = (a, b) => {  
        if (b === 0) return a   
        return greatest(b, a % b)  
    }
    //최소공배수
    const least = (a,b) => (a*b) / greatest(a,b)
    return [greatest(n,m), least(n,m)]
}