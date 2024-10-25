function solution(a, b, n) {
    let answer = 0;
    while (n >= a) {
        let newCokes = Math.floor(n / a) * b;  // New bottles obtained
        answer += newCokes;                     // Add to total
        n = newCokes + (n % a);                 // Update n for next iteration
    }
    return answer;
}
