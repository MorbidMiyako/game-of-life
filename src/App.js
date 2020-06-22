import React, { useState } from 'react';
import './App.css';

// creates matrix of desired size
const CreateGameBoard = (height, width) => {
  let matrice = []
  for (let i = 0; i < height; i++) {
    let line = []
    for (let j = 0; j < width; j++) {
      line.push(false)
    }
    matrice.push(line)
  }
  return matrice
}

// calculates the new true tiles
// returns array with at position 0 the updated gameBoard and at position 1 the updated trueTiles
const RedrawGameBoard = (gameBoard, trueTiles) => {
  //console.log("______")
  //console.log("______")
  //console.log("______")

  // set with scope wide
  let gameBoardWidth = gameBoard[0].length
  let gameBoardHeight = gameBoard.length

  // create variables scope wide
  let leftEdge = false
  let rightEdge = false
  let topEdge = false
  let bottomEdge = false

  // optional to make tile choice more readable
  // let topLeftTile = []
  // let topMiddleTile = []
  // let topRightTile = []
  // let middleLeftTile = []
  // let middelMiddleTile = []
  // let middleRightTile = []
  // let bottomLeftTile = []
  // let bottomMiddleTile = []
  // let bottomRightTile = []

  // create an object to reduce search times
  // store which tiles have been checked as cache to prevent reruns
  let checkedTiles = {}


  // create a new object to return without messing up the old TrueTiles since they are used
  // object as global variable to reduce deletion time when changes are made to the grid
  let newTrueTiles = {}

  // create a new return matrix to store the updated tiles since original variable is still used
  let newGameBoard = CreateGameBoard(gameBoardHeight, gameBoardWidth)

  //for each trueTile, run the function for the tiles around it
  //look into storing which tiles have been checked to prevent checking tiles multiple times
  //after checking trueTile should be removed
  Object.values(trueTiles).forEach(array => {

    // set parameters to determine if tile should be checked
    leftEdge = (array[1] === 0) ? true : false
    rightEdge = (array[1] === gameBoardWidth - 1) ? true : false
    topEdge = (array[0] === 0) ? true : false
    bottomEdge = (array[0] === gameBoardHeight - 1) ? true : false

    // topLeftTile = [array[0] - 1, array[1] - 1]
    // topMiddleTile = []
    // topRightTile = []
    // middleLeftTile = []
    // middelMiddleTile = []
    // middleRightTile = []
    // bottomLeftTile = []
    // bottomMiddleTile = []
    // bottomRightTile = []

    if (!leftEdge && !topEdge) {
      //console.log("topleft")
      // check checkedTiles if tile has been done already
      if (checkedTiles[`${array[0] - 1}, ${array[1] - 1}`] === undefined) {
        // change gameBoard tiles
        if (CheckTilesAroundTile(gameBoard, array[0] - 1, array[1] - 1)) {
          //console.log("i get true!!!")
          // set tile to true and update the newTrueTiles
          newGameBoard[array[0] - 1][array[1] - 1] = true
          // change newTrueTiles !!! DONT CHANGE THE OLD ONE SINCE THIS ONE IS USED UNTIL THE FUNCTION IS FINISHED
          // ??? might be that due to the forEach loop the list is pre buffered
          newTrueTiles[`${array[0] - 1}, ${array[1] - 1}`] = [array[0] - 1, array[1] - 1]
        }
        else {
          //console.log("i get false!!!")
          newGameBoard[array[0] - 1][array[1] - 1] = false
        }
        // add checked tile to list which is checked
        checkedTiles[`${array[0] - 1}, ${array[1] - 1}`] = [array[0] - 1, array[1] - 1]
      }
    }

    if (!topEdge) {
      //console.log("topmiddle")
      if (checkedTiles[`${array[0] - 1}, ${array[1]}`] === undefined) {
        if (CheckTilesAroundTile(gameBoard, array[0] - 1, array[1])) {
          //console.log("i get true!!!")
          newGameBoard[array[0] - 1][array[1]] = true
          newTrueTiles[`${array[0] - 1}, ${array[1]}`] = [array[0] - 1, array[1]]
        }
        else {
          //console.log("i get false!!!")
          newGameBoard[array[0] - 1][array[1]] = false
        }
        checkedTiles[`${array[0] - 1}, ${array[1]}`] = [array[0] - 1, array[1]]
      }
    }

    if (!rightEdge && !topEdge) {
      //console.log("topright")
      if (checkedTiles[`${array[0] - 1}, ${array[1] + 1}`] === undefined) {
        if (CheckTilesAroundTile(gameBoard, array[0] - 1, array[1] + 1)) {
          //console.log("i get true!!!")
          newGameBoard[array[0] - 1][array[1] + 1] = true
          newTrueTiles[`${array[0] - 1}, ${array[1] + 1}`] = [array[0] - 1, array[1] + 1]
        }
        else {
          //console.log("i get false!!!")
          newGameBoard[array[0] - 1][array[1] + 1] = false
        }
        checkedTiles[`${array[0] - 1}, ${array[1] + 1}`] = [array[0] - 1, array[1] + 1]
      }
    }

    if (!leftEdge) {
      //console.log("middleleft")
      if (checkedTiles[`${array[0]}, ${array[1] - 1}`] === undefined) {
        if (CheckTilesAroundTile(gameBoard, array[0], array[1] - 1)) {
          //console.log("i get true!!!")
          newGameBoard[array[0]][array[1] - 1] = true
          newTrueTiles[`${array[0]}, ${array[1] - 1}`] = [array[0], array[1] - 1]
        }
        else {
          //console.log("i get false!!!")
          newGameBoard[array[0]][array[1] - 1] = false
        }
        checkedTiles[`${array[0]}, ${array[1] - 1}`] = [array[0], array[1] - 1]
      }
    }

    if (checkedTiles[`${array[0]}, ${array[1]}`] === undefined) {
      //console.log("middlemiddle")
      if (CheckTilesAroundTile(gameBoard, array[0], array[1])) {
        //console.log("i get true!!!")
        newGameBoard[array[0]][array[1]] = true
        newTrueTiles[`${array[0]}, ${array[1]}`] = [array[0], array[1]]
      }
      else {
        //console.log("i get false!!!")
        newGameBoard[array[0]][array[1]] = false
      }
      checkedTiles[`${array[0]}, ${array[1]}`] = [array[0], array[1]]
    }

    if (!rightEdge) {
      //console.log("middleright")
      if (checkedTiles[`${array[0]}, ${array[1] + 1}`] === undefined) {
        if (CheckTilesAroundTile(gameBoard, array[0], array[1] + 1)) {
          //console.log("i get true!!!")
          newGameBoard[array[0]][array[1] + 1] = true
          newTrueTiles[`${array[0]}, ${array[1] + 1}`] = [array[0], array[1] + 1]
        }
        else {
          //console.log("i get false!!!")
          newGameBoard[array[0]][array[1] + 1] = false
        }
        checkedTiles[`${array[0]}, ${array[1] + 1}`] = [array[0], array[1] + 1]
      }
    }

    if (!leftEdge && !bottomEdge) {
      //console.log("bottomleft")
      if (checkedTiles[`${array[0] + 1}, ${array[1] - 1}`] === undefined) {
        if (CheckTilesAroundTile(gameBoard, array[0] + 1, array[1] - 1)) {
          //console.log("i get true!!!")
          newGameBoard[array[0] + 1][array[1] - 1] = true
          newTrueTiles[`${array[0] + 1}, ${array[1] - 1}`] = [array[0] + 1, array[1] - 1]
        }
        else {
          //console.log("i get false!!!")
          newGameBoard[array[0] + 1][array[1] - 1] = false
        }
        checkedTiles[`${array[0] + 1}, ${array[1] - 1}`] = [array[0] + 1, array[1] - 1]
      }
    }

    if (!bottomEdge) {
      //console.log("bottommiddle")
      if (checkedTiles[`${array[0] + 1}, ${array[1]}`] === undefined) {
        if (CheckTilesAroundTile(gameBoard, array[0] + 1, array[1])) {
          //console.log("i get true!!!")
          newGameBoard[array[0] + 1][array[1]] = true
          newTrueTiles[`${array[0] + 1}, ${array[1]}`] = [array[0] + 1, array[1]]
        }
        else {
          //console.log("i get false!!!")
          newGameBoard[array[0] + 1][array[1]] = false
        }
        checkedTiles[`${array[0] + 1}, ${array[1]}`] = [array[0] + 1, array[1]]
      }
    }

    if (!rightEdge && !bottomEdge) {
      //console.log("bottomright")
      if (checkedTiles[`${array[0] + 1}, ${array[1] + 1}`] === undefined) {
        if (CheckTilesAroundTile(gameBoard, array[0] + 1, array[1] + 1)) {
          //console.log("i get true!!!")
          newGameBoard[array[0] + 1][array[1] + 1] = true
          newTrueTiles[`${array[0] + 1}, ${array[1] + 1}`] = [array[0] + 1, array[1] + 1]
        }
        else {
          //console.log("i get false!!!")
          newGameBoard[array[0] + 1][array[1] + 1] = false
        }
        checkedTiles[`${array[0] + 1}, ${array[1] + 1}`] = [array[0] + 1, array[1] + 1]
      }
    }
  })

  return [newGameBoard, newTrueTiles]
}

// checks tiles around tile and returns true or false, indicating if tile should be alive or death next frame
const CheckTilesAroundTile = (gameBoard, i, j) => {
  // make checking if the edge is reached easier
  let gameBoardWidth = gameBoard[0].length
  let gameBoardHeight = gameBoard.length

  // count how many tiles around current tiles are turned on
  let trueTileCount = 0

  // checks if we are at the edge or not
  let leftEdge = (j === 0) ? true : false
  let rightEdge = (j === gameBoardWidth - 1) ? true : false
  let topEdge = (i === 0) ? true : false
  let bottomEdge = (i === gameBoardHeight - 1) ? true : false

  // depending on if the surrounding field is on the edge or not increment the count
  if (!leftEdge && !topEdge) {
    if (gameBoard[i - 1][j - 1]) {
      trueTileCount += 1
    }
  }

  if (!topEdge) {
    if (gameBoard[i - 1][j]) {
      trueTileCount += 1
    }
  }

  if (!rightEdge && !topEdge) {
    if (gameBoard[i - 1][j + 1]) {
      trueTileCount += 1
    }
  }

  if (!leftEdge) {
    if (gameBoard[i][j - 1]) {
      trueTileCount += 1
    }
  }

  let currentTile = gameBoard[i][j]

  if (!rightEdge) {
    if (gameBoard[i][j + 1]) {
      trueTileCount += 1
    }
  }

  if (!leftEdge && !bottomEdge) {
    if (gameBoard[i + 1][j - 1]) {
      trueTileCount += 1
    }
  }

  if (!bottomEdge) {
    if (gameBoard[i + 1][j]) {
      trueTileCount += 1
    }
  }

  if (!rightEdge && !bottomEdge) {
    if (gameBoard[i + 1][j + 1]) {
      trueTileCount += 1
    }
  }

  //console.log("I RAN")
  //console.log("________")
  // after taking count of tiles around that are turned on determine if tile should be true or false
  if (currentTile) {
    if (2 === trueTileCount || trueTileCount === 3) {
      //console.log("ran line 216")
      //console.log(trueTileCount, "trueTileCount")
      //console.log(2 === trueTileCount || trueTileCount === 3)
      return true
    }

    else {
      //console.log("ran line 222")
      //console.log(trueTileCount, "trueTileCount")
      return false
    }
  }

  if (!currentTile) {
    if (trueTileCount === 3) {
      //console.log("ran line 231")
      //console.log(trueTileCount, "trueTileCount")
      //console.log(trueTileCount === 3)
      return true
    }

    else {
      //console.log("ran line 237")
      //console.log(trueTileCount, "trueTileCount")
      return false
    }
  }


}

// creates object to store only the tiles which are true, this prevents looping over entire matrix
// an object has lower look up times, thus deletion is faster
let trueTiles = {

}

// creates gameBoard, this needs to be changed to allow user to input the gameBoard size
let gameBoard = CreateGameBoard(30, 70)

function App() {

  // allows the page to refresh
  // optimally this would be changed to a useState or custom hook
  const [, setState] = useState()

  return (
    <div className="App">
      <p>GameBoard</p>
      <div style={inlineStyles.gameBoard}>
        {/* goes trough gameboard and renders the tiles needed, presumably the slowest part of the app */}
        {gameBoard.map((row, i) => {
          return (
            <div key={i} style={inlineStyles.gameRow}>
              {row.map((tile, j) => {
                return (
                  // determine if tile should be gray or white
                  tile ? (
                    <div key={j} style={inlineStyles.trueTile} onClick={e => {
                      // update both the array of the gameboard and the tiles that are true
                      gameBoard[i][j] = false
                      delete trueTiles[`${i}${j}`]
                      setState({})
                    }} />
                  ) : (
                      <div key={j} style={inlineStyles.falseTile} onClick={e => {
                        gameBoard[i][j] = true
                        trueTiles[`${i}${j}`] = [i, j]
                        setState({})
                      }} />
                    )
                )
              })}
            </div>
          )
        })}
      </div>
      <button onClick={e => {
        let returnedArray = RedrawGameBoard(gameBoard, trueTiles)
        //console.log(trueTiles, gameBoard)
        gameBoard = returnedArray[0]
        trueTiles = returnedArray[1]
        //console.log(trueTiles, gameBoard)
        setState({})
        //console.log("i ran")
      }}>Reload Gameboard</button>
    </div>
  );
}

const inlineStyles = {
  gameBoard: {
    align: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "auto",
  },
  gameRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  trueTile: {
    padding: 10,
    border: "1px black solid",
    backgroundColor: "white"
  },
  falseTile: {
    padding: 10,
    border: "1px black solid",
    backgroundColor: "gray"
  }
}

export default App;
