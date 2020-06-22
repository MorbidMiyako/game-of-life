import React, { useState } from 'react';
import './App.css';

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

const RedrawGameBoard = (gameBoard, trueTiles) => {

  let gameBoardWidth = gameBoard[0].length
  let gameBoardHeight = gameBoard.length

  let leftEdge = false
  let rightEdge = false
  let topEdge = false
  let bottomEdge = false

  let checkedTiles = {}

  //for each trueTile, run the function for the tiles around it
  //look into storing which tiles have been checked to prevent checking tiles multiple times
  //after checking trueTile should be removed
  Object.values(trueTiles).forEach(array => {

    if (!leftEdge && !topEdge) {
      // check checkedTiles if tile has been done already

      // change gameBoard tiles
      gameBoard[array[0] - 1][array[1] - 1] = CheckTilesAroundTile(gameBoard, array[0] - 1, array[1] - 1)
      // add checked tile to list which is checked
      checkedTiles[`${array[0] - 1}, ${array[1] - 1}`] = [array[0] - 1, array[1] - 1]
    }

    if (!topEdge) {
      gameBoard[array[0] - 1][array[1]] = CheckTilesAroundTile(gameBoard, array[0] - 1, array[1])
    }

    if (!rightEdge && !topEdge) {
      gameBoard[array[0] - 1][array[1] + 1] = CheckTilesAroundTile(gameBoard, array[0] - 1, array[1] + 1)
    }

    if (!leftEdge) {
      gameBoard[array[0]][array[1] - 1] = CheckTilesAroundTile(gameBoard, array[0], array[1] - 1)
    }

    gameBoard[array[0]][array[1]] = CheckTilesAroundTile(gameBoard, array[0], array[1])

    if (!rightEdge) {
      gameBoard[array[0]][array[1] + 1] = CheckTilesAroundTile(gameBoard, array[0], array[1] + 1)
    }

    if (!leftEdge && !bottomEdge) {
      gameBoard[array[0] - 1][array[1] - 1] = CheckTilesAroundTile(gameBoard, array[0] + 1, array[1] + 1)
    }

    if (!bottomEdge) {
      gameBoard[array[0] + 1][array[1]] = CheckTilesAroundTile(gameBoard, array[0] + 1, array[1] - 1)
    }

    if (!rightEdge && !bottomEdge) {
      gameBoard[array[0] + 1][array[1] + 1] = CheckTilesAroundTile(gameBoard, array[0] + 1, array[1])
    }
    console.log(array)
    console.log("yush")
    console.log(leftEdge, rightEdge, topEdge, bottomEdge)
  })

  return gameBoard
}

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

  // after taking count of tiles around that are turned on determine if tile should be true or false
  if (currentTile) {
    if (2 <= trueTileCount <= 3) {
      return true
    }

    else {
      return false
    }
  }

  if (!currentTile) {
    if (trueTileCount === 2) {
      return true
    }

    else {
      return false
    }
  }


}

const trueTiles = {

}

function App() {
  const [, setState] = useState()
  const [gameBoard, setGameBoard] = useState(CreateGameBoard(10, 10))

  RedrawGameBoard(gameBoard, trueTiles)
  console.log(trueTiles)

  return (
    <div className="App">
      <p>GameBoard</p>
      <div style={inlineStyles.gameBoard}>
        {gameBoard.map((row, i) => {
          return (
            <div key={i} style={inlineStyles.gameRow}>
              {row.map((tile, j) => {
                return (
                  tile ? (
                    <div key={j} style={inlineStyles.trueTile} onClick={e => {
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
