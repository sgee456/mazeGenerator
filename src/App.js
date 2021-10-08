import { callExpression } from '@babel/types';
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

  function createMazeWallArray(width, height) {
    let mazeWallArray = [];
    //let rowArray =[]; and subsequent loop cannot be in here because then a reference to the same rowArray instance is created for each row in the mazeWallArray. This means that if any function changes an item in one row it will change them in all of them


    //pushes rowArray onto mazeArray
    for (let i = 0; i < height; i++) {
      //generates our rowArray, needs to be inside to ensure that all rowArrays are new instances 
      let rowArray = [];
      for (let i = 0; i < width; i++) {
        rowArray.push(1);
      }
      mazeWallArray.push(rowArray);
    }

    return mazeWallArray;
  };

  const createPath = function() {
    const pathStack = [];
    const startPosition = [0, 0];
    const newPathArray = createMazeWallArray(5 , 5);

    //checks if a square is beside a path
    function checkPathAround(position) {
      const x = position[0];
      const y = position[1];
      //check all eight blocks around possible path block for other path blocks/ outside of maze
      const onBottomRow = y === newPathArray.length - 1;
      const onTopRow =  y === 0;
      const onLeftColumn = x === 0;
      const onRightColumn = x === newPathArray[0].length - 1;

      //each of these values checks if a square around possible path block is a wall or outside of the maze and has a value of true if there's a wall

      const leftValue = onLeftColumn || newPathArray[y][x - 1] === 1;

      const rightValue = onRightColumn || newPathArray[y][x + 1] === 1;

      const bottomValue =  onBottomRow || newPathArray[y + 1][x] === 1;

      const bottomLeftValue = 
        onBottomRow || 
        onLeftColumn || 
        newPathArray[y + 1][x - 1] === 1;
      
      const bottomRightValue = 
        onBottomRow || 
        onRightColumn || 
        newPathArray[y + 1][x + 1] === 1;

              
      const topValue = onTopRow || newPathArray[y - 1][x] === 1;

      const topLeftValue = 
        onTopRow || 
        onLeftColumn || 
        newPathArray[y - 1][x - 1] === 1;
      
      const topRightValue = 
        onTopRow || 
        onRightColumn || 
        newPathArray[y - 1][x + 1] === 1;

      //if all surrounding squares are walls/out of the maze, return true
      //need to exclude certain squares on what is passed into the function eg. possibleTopPosition has to exclude the bottomValue b/ our last path square is guaranteed to be there

      return (leftValue && topValue && bottomValue && rightValue && topRightValue && bottomRightValue && topLeftValue && bottomLeftValue);
    }

    //checkPathAround seems to work
    console.log(
      checkPathAround([0,0]),
      checkPathAround([1,0]),
      "further up checking[0,1]", checkPathAround([0,1]),
      checkPathAround([1,1])

    );
    
    function changeWall(position) {
      const x = position[0];
      const y = position[1];
      //this breaks my checkPathAround but I don't know why- I think its how my checkPathAround function is acting
      newPathArray[y][x] = 0;
    }

    
    //start at a wall block, and turn it to path block- push location onto stack
    changeWall(startPosition);
    console.log('checking checkPathAround just after changeWall()', checkPathAround([0,1]));
    pathStack.push(startPosition);
    while (pathStack.length !== 0) {
      //look at all surrounding blocks for blocks that don't touch another path block
      const currentPosition = pathStack[pathStack.length -1];
      const x = currentPosition[0];
      const y = currentPosition[1];

      const possibleTopPosition = [x , y - 1];
      const possibleBottomPosition = [x , y + 1];
      const possibleLeftPosition = [x - 1, y];
      const possibleRightPosition = [x + 1, y];

      console.log("bottom", (possibleBottomPosition))
      console.log("bottom result", checkPathAround(possibleBottomPosition))

      console.log("manually entering array", checkPathAround([0, 1]))

      const possibleChoices = [];
      //prevent from pushing to possible answers if current position on top row
      if (y !== 0 && checkPathAround(possibleTopPosition)) {
        possibleChoices.push(possibleTopPosition);
      }
      if (y !== newPathArray.length - 1 && checkPathAround(possibleBottomPosition)) {
        possibleChoices.push(possibleBottomPosition);
      }
      if (x !== 0 && checkPathAround(possibleLeftPosition)) {
        possibleChoices.push(possibleLeftPosition);
      }
      if (x !== newPathArray[0].length - 1 && checkPathAround(possibleRightPosition)) {
        possibleChoices.push(possibleRightPosition);
      }

      //randomly choose one to turn into a path block- push location onto stack
      if (possibleChoices.length !== 0) {
        const randomIndex = Math.floor(Math.random() * possibleChoices.length);
        const newPathBlock = possibleChoices[randomIndex];
        console.log(newPathBlock);
        changeWall(newPathBlock);
        pathStack.push(newPathBlock);
      } else {
        pathStack.pop();
      }
      //repeat this until no surrounding blocks can be made into path
      //then pop a block off the stack and try this again
      //when the stack is gone, the path is complete

    }

    //when done return new array
    return newPathArray;
  }


  const mazeArray = createPath();


  //remove these after testing?
  //This doesn't work because arrays inside need to be destructured too
  // const mazeArray = createMazeWallArray(4,4);
  // const copy = [...mazeArray];
  // copy[0][0] = "hello";
  // console.log("mazeWallArray", mazeArray);
  // console.log("copy", copy)


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
