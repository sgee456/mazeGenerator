import './App.css';

import Maze from './Maze.js';

function App() {
  // const mazeArray = [
  //   [0, 0, 0, 0, 0],
  //   [1, 0, 1, 0, 0],
  //   [0, 0, 0, 1, 0],
  //   [0, 0, 0, 0, 0],
  //   [0, 1, 0, 0, 1]
  // ];

  function createMazeArray(width, height) {
    let mazeArray = [];
    let rowArray = [];
    //generates our rowArray
    for (let i = 0; i < width; i++) {
      rowArray.push(1);
    }
    //pushes rowArray onto mazeArray
    for (let i = 0; i < height; i++) {
      mazeArray.push(rowArray);
    }

    return mazeArray;
  };
      
  const mazeArray = createMazeArray(20, 20);

  const createPath = function(mazeArray) {
    const pathStack = [];
    const startPosition = [0, 0];

    //checks if a square is beside a path
    function checkPathAround(position) {
      const x = position[0];
      const y = position[1];
      //check all eight blocks around possible path block for other path blocks/ outside of maze
      const onBottomRow = y === mazeArray.length - 1;
      const onTopRow =  y === 0;
      const onLeftColumn = x === 0;
      const onRightColumn = x === mazeArray[0].length - 1;

      //each of these values checks if a square around possible path block is a wall or outside of the maze

      const leftValue = onLeftColumn || mazeArray[y][x - 1] === 1;
      console.log("left is wall: ", leftValue);

      const rightValue = onRightColumn || mazeArray[y][x + 1] === 1;
      console.log("right is wall: ", rightValue);

      const bottomValue =  onBottomRow || mazeArray[y + 1][x] === 1;
      console.log("bottom is wall: ", bottomValue);

      const bottomLeftValue = 
        onBottomRow || 
        onLeftColumn || 
        mazeArray[y + 1][x - 1] === 1;
      console.log("bottom-left is wall: ", bottomLeftValue);
      
      const bottomRightValue = 
        onBottomRow || 
        onRightColumn || 
        mazeArray[y + 1][x + 1] === 1;
      console.log("bottom-right is wall: ", bottomRightValue);

              
      const topValue = onTopRow || mazeArray[y - 1][x] === 1;
      console.log("top is wall: ", topValue);

      const topLeftValue = 
        onTopRow || 
        onLeftColumn || 
        mazeArray[y - 1][x - 1] === 1;
      console.log("top-left is wall: ", topLeftValue);
      
      const topRightValue = 
        onTopRow || 
        onRightColumn || 
        mazeArray[y - 1][x + 1] === 1;
      console.log("top-right is wall: ", topRightValue);

      
    }
    
    //start at a wall block, and turn it to path block- push location onto stack
    mazeArray[0][0] = 1;

    while (pathStack.length !== 0) {

    }

    //look at all surrounding blocks for blocks that don't touch another path block
    //randomly choose one to turn into a path block- push location onto stack
    //repeat this until no surrounding blocks can be made into path
    //then pop a block off the stack and try this again
    //when the stack is gone, the path is complete
  }

  return (
    <div className="App">
      <h1>My Maze Generator</h1>
      <Maze 
        mazeArray={mazeArray}
      />
    </div>
  );
}

export default App;
