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

const RedrawGameBoard = ()

function App() {
  const [, setState] = useState()
  const [gameBoard, setGameBoard] = useState(CreateGameBoard(10, 10))

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
                      gameBoard[i][j] = !gameBoard[i][j]
                      setState({})
                    }} />
                  ) : (
                      <div key={j} style={inlineStyles.falseTile} onClick={e => {
                        gameBoard[i][j] = !gameBoard[i][j]
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

export default App;
