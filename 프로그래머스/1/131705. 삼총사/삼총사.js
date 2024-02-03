function solution(number) {
    
    const visited = Array.from({length:number.length}, ()=>false)
    let arr = []
    let answer = 0
    function dfs(dep,idx){
        // base condition
        if(dep===3){
            if(arr.reduce((a,b)=>a+b) === 0){
                answer++
            }
            
        }
        
        for(let i =idx; i<number.length; i++){
            if(!visited[i]){
                visited[i]=true
                arr.push(number[i])
                dfs(dep+1,i)
                arr.pop()
                visited[i]=false
            }
        }
    }
    
    dfs(0,0)
    return answer
}