const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");


  const T = +input.shift()
  const dir = [[0,1],[0,-1],[1,0],[-1,0]]

  function bfs(x,y,visited,map){
    let queue =[[x,y]]

    while(queue.length){
      let [curX,curY]=queue.shift()

      for(let i=0; i<4; i++){
        const moveX = curX + dir[i][0]
        const moveY = curY + dir[i][1]
        
        if( moveX >=0 && moveY >=0 && moveX < map.length && moveY < map[0].length){
          if(!visited[moveX][moveY] && map[moveX][moveY]==1){
          queue.push([moveX,moveY])
          visited[moveX][moveY]=true
          }
        }
      }
    }
  }

  function  solution(map,visited){
    let cnt = 0
    for(let i =0; i<map.length; i++){
      for(let j =0; j<map[0].length; j++){
        
        if(!visited[i][j] && map[i][j]==1){
          bfs(i,j,visited,map)
          visited[i][j]=true
          cnt++
        }
      }
    }
    console.log(cnt);
  }
  
  for(let i =0; i<T; i++){
    const [M,N,K] = input.shift().split(" ").map(Number)
    const map = Array.from({length:N},()=>Array.from({length:M},()=>0))
    const visited = Array.from({length:map.length},()=>Array.from({length:map[0].length},()=>false))

    for(let j=0; j<K; j++){
      // 배추 위치 업데이트
      const [x,y]=input.shift().split(" ").map(Number)
      map[y][x]=1
    }
    
    
    solution(map,visited)
  }



// 모든 map을 검사하여 1이 나오면 bfs를 통해 상하좌우로 검사를 때린다. (2중 for문 및 방문한 곳 제외)
// 그럼, 1개의 지렁이로 어디까지 퍼지는지 알 수 있다. ()
// 그래서 bfs를 돌린 횟수 만큼 카운트를 센다

