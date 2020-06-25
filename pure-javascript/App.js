
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

const NextStep = () => {
  let returnedArray = RedrawGameBoard(gameBoard, trueTiles)
  Object.values(trueTiles).forEach(array => {
    document.getElementById(`T${array[0]},${array[1]}`).classList.toggle("hidden")
    document.getElementById(`F${array[0]},${array[1]}`).classList.toggle("hidden")
  })
  gameBoard = returnedArray[0]
  trueTiles = returnedArray[1]
  generationCount += 1
  document.getElementById("generationCount").textContent = `Current generation: ${generationCount}`

  Object.values(trueTiles).forEach(array => {
    document.getElementById(`T${array[0]},${array[1]}`).classList.toggle("hidden")
    document.getElementById(`F${array[0]},${array[1]}`).classList.toggle("hidden")
  })
}

const RandomiseGameBoard = (gameBoard) => {
  let newGameBoard = CreateGameBoard(gameBoard.length, gameBoard[0].length)
  let newTrueTiles = {}
  gameBoard.forEach((gameBoardRow, i) => {
    gameBoardRow.forEach((gameTile, j) => {
      if (Math.round(Math.random()) === 1) {
        newGameBoard[i][j] = true
        newTrueTiles[`${i}, ${j}`] = [i, j]
        document.getElementById(`T${i},${j}`).classList.toggle("hidden")
        document.getElementById(`F${i},${j}`).classList.toggle("hidden")
      }
    })
  })
  return [newGameBoard, newTrueTiles]
}

// creates object to store only the tiles which are true, this prevents looping over entire matrix
// an object has lower look up times, thus deletion is faster
let trueTiles = {

}

let gameBoard = CreateGameBoard(50, 50)

let generationCount = 0

let play = false
let isPlaying = false

let speed = 100

let bgcolour = undefined
let fgcolour = undefined
// creates gameBoard, this needs to be changed to allow user to input the gameBoard size

function pageCreate() {
  const generalDiv = document.createElement('div')

  generalDiv.setAttribute("id", "generalDiv")

  function gameBoardDivCreate() {
    const gameBoardDiv = document.createElement('div')

    gameBoardDiv.setAttribute("id", "gameBoardDiv")

    gameBoard.forEach((array, i) => {
      const gameRow = document.createElement('div')

      gameRow.classList.add("gameRow")

      array.forEach((tile, j) => {
        const gameTileDiv = document.createElement('div')
        const trueTile = document.createElement('div')
        const falseTile = document.createElement('div')

        trueTile.classList.add("hidden")
        trueTile.classList.add("trueTile")
        falseTile.classList.add("falseTile")

        gameTileDiv.appendChild(trueTile)
        gameTileDiv.appendChild(falseTile)

        trueTile.setAttribute("id", `T${i},${j}`)
        falseTile.setAttribute("id", `F${i},${j}`)

        trueTile.addEventListener('click', () => {
          generationCount = 0
          gameBoard[i][j] = false
          delete trueTiles[`${i}${j}`]
          trueTile.classList.toggle("hidden")
          falseTile.classList.toggle("hidden")
          document.getElementById("generationCount").textContent = `Current generation: ${generationCount}`
        })

        falseTile.addEventListener('click', () => {
          generationCount = 0
          gameBoard[i][j] = true
          trueTiles[`${i}${j}`] = [i, j]
          trueTile.classList.toggle("hidden")
          falseTile.classList.toggle("hidden")
          document.getElementById("generationCount").textContent = `Current generation: ${generationCount}`
        })

        gameRow.appendChild(gameTileDiv)
      })

      gameBoardDiv.appendChild(gameRow)

    })

    return gameBoardDiv
  }

  function generationDivCreate() {
    const generationText = document.createElement('p')

    generationText.setAttribute("id", "generationCount")

    generationText.textContent = `Current generation: ${generationCount}`

    return generationText
  }

  function buttonsDivCreate() {
    const buttonsDiv = document.createElement('div')

    buttonsDiv.setAttribute("id", "buttonsDiv")

    const nextStepButton = document.createElement('button')
    const startButton = document.createElement('button')
    const stopButton = document.createElement('button')
    const eraseButton = document.createElement('button')
    const randomButton = document.createElement('button')

    buttonsDiv.appendChild(nextStepButton)
    buttonsDiv.appendChild(startButton)
    buttonsDiv.appendChild(stopButton)
    buttonsDiv.appendChild(eraseButton)
    buttonsDiv.appendChild(randomButton)
    nextStepButton.textContent = "Next step"
    startButton.textContent = 'Start'
    stopButton.textContent = 'Stop'
    eraseButton.textContent = 'Erase'
    randomButton.textContent = 'Random Board'

    nextStepButton.addEventListener('click', () => {
      NextStep()
    })

    startButton.addEventListener('click', () => {
      if (!isPlaying) {
        play = setInterval(() => {
          console.log("hey")
          NextStep()
        }, speed)
      }
      isPlaying = true
    })

    stopButton.addEventListener('click', () => {
      clearInterval(play)
      isPlaying = false
    })

    eraseButton.addEventListener('click', () => {
      gameBoard = CreateGameBoard(gameBoard.length, gameBoard[0].length)
      // needs to be set to -1 since NextStep updates the textContent after generationCount +=1
      NextStep()

      generalDiv.removeChild(document.getElementById("gameBoardDiv"))

      generalDiv.insertBefore(gameBoardDivCreate(), document.getElementById("generalDiv").childNodes[0])
      generationCount = -1
      NextStep()

    })

    randomButton.addEventListener('click', () => {
      let returnArray = RandomiseGameBoard(gameBoard)
      gameBoard = returnArray[0]
      trueTiles = returnArray[1]
      generationCount = 0
      document.getElementById("generationCount").textContent = `Current generation: ${generationCount}`
    })

    return buttonsDiv
  }

  function settingsDivCreate() {
    const settingsDiv = document.createElement('form')
    const settingBackgroundColourLabel = document.createElement('label')
    const settingBackgroundColourSelect = document.createElement('input')
    const settingForegroundColourLabel = document.createElement('label')
    const settingForegroundColourSelect = document.createElement('input')
    const settingsBreak = document.createElement("br")
    const settingSpeedLabel = document.createElement('label')
    const settingSpeedInput = document.createElement('input')
    const settingDimensionsLabel = document.createElement('label')
    const settingDimensionsInput = document.createElement('input')
    const settingsSubmit = document.createElement('button')


    settingsDiv.setAttribute("name", "settingsForm")
    settingsDiv.setAttribute("id", "settingsDiv")


    settingsDiv.appendChild(settingBackgroundColourLabel)
    settingsDiv.appendChild(settingBackgroundColourSelect)

    settingBackgroundColourLabel.setAttribute("for", "bgcolour")

    settingBackgroundColourSelect.setAttribute("type", "text")
    settingBackgroundColourSelect.setAttribute("id", "bgcolour")
    settingBackgroundColourSelect.setAttribute("name", "bgcolour")
    settingBackgroundColourSelect.setAttribute("placeholder", "Off, #0f380f / green")


    settingsDiv.appendChild(settingForegroundColourLabel)
    settingsDiv.appendChild(settingForegroundColourSelect)

    settingForegroundColourLabel.setAttribute("for", "fgcolour")

    settingForegroundColourSelect.setAttribute("type", "text")
    settingForegroundColourSelect.setAttribute("id", "fgcolour")
    settingForegroundColourSelect.setAttribute("name", "fgcolour")
    settingForegroundColourSelect.setAttribute("placeholder", "On, #8bac0f / pink")


    settingsDiv.appendChild(settingsBreak)


    settingsDiv.appendChild(settingSpeedLabel)
    settingsDiv.appendChild(settingSpeedInput)

    settingSpeedInput.setAttribute("for", "speed")

    settingSpeedInput.setAttribute("type", "text")
    settingSpeedInput.setAttribute("id", "speed")
    settingSpeedInput.setAttribute("name", "speed")
    settingSpeedInput.setAttribute("placeholder", "Time in seconds")


    settingsDiv.appendChild(settingDimensionsLabel)
    settingsDiv.appendChild(settingDimensionsInput)

    settingDimensionsLabel.setAttribute("for", "dimensions")

    settingDimensionsInput.setAttribute("type", "text")
    settingDimensionsInput.setAttribute("id", "dimensions")
    settingDimensionsInput.setAttribute("name", "dimensions")
    settingDimensionsInput.setAttribute("placeholder", "50,50")


    settingsDiv.appendChild(settingsSubmit)

    settingsSubmit.textContent = "Apply settings"
    settingsSubmit.addEventListener('click', (e) => {
      e.preventDefault()
      let newbgcolour = document.forms["settingsForm"]["bgcolour"].value
      let newfgcolour = document.forms["settingsForm"]["fgcolour"].value
      let newSpeed = document.forms["settingsForm"]["speed"].value
      let dimensions = document.forms["settingsForm"]["dimensions"].value

      dimensions = dimensions.split(",")

      if (!isNaN(dimensions[0]) && !isNaN(dimensions[1])) {

        gameBoard = CreateGameBoard(dimensions[0], dimensions[1])

        generalDiv.removeChild(document.getElementById("gameBoardDiv"))

        generalDiv.insertBefore(gameBoardDivCreate(), document.getElementById("generalDiv").childNodes[0])

        console.log(gameBoard)
      }

      if (!isNaN(newSpeed) && newSpeed === 0) {
        speed = newSpeed * 1000

        generalDiv.removeChild(document.getElementById("buttonsDiv"))

        generalDiv.insertBefore(buttonsDivCreate(), document.getElementById("generalDiv").childNodes[2])
      }

      if (newbgcolour !== "") {

        bgcolour = newbgcolour

        let backgroundElements = document.querySelectorAll(".falseTile")

        backgroundElements.forEach(elementToChange => {
          console.log(elementToChange)
          elementToChange.style.backgroundColor = bgcolour
        })
      }

      else {

        let backgroundElements = document.querySelectorAll(".falseTile")

        backgroundElements.forEach(elementToChange => {
          elementToChange.style.backgroundColor = bgcolour
        })
      }

      if (newfgcolour !== "") {
        console.log("ran if statement")

        fgcolour = newfgcolour

        let foregroundElements = document.querySelectorAll(".trueTile")

        foregroundElements.forEach(elementToChange => {
          elementToChange.style.backgroundColor = fgcolour
        })

      }

      else {

        fgcolour = newfgcolour

        let foregroundElements = document.querySelectorAll(".trueTile")

        foregroundElements.forEach(elementToChange => {
          elementToChange.style.backgroundColor = fgcolour
        })

      }

      document.getElementById("settingsDiv").reset()

      console.log(newbgcolour, newfgcolour, speed, dimensions)
    })

    return settingsDiv
  }

  function templatesDivCreate() {
    const templatesDiv = document.createElement('form')
    const spaceShipTemplate = document.createElement('button')

    templatesDiv.appendChild(spaceShipTemplate)

    spaceShipTemplate.textContent = "Spaceship"

    return templatesDiv
  }

  generalDiv.appendChild(gameBoardDivCreate())

  generalDiv.appendChild(generationDivCreate())

  generalDiv.appendChild(buttonsDivCreate())

  generalDiv.appendChild(settingsDivCreate())

  generalDiv.appendChild(templatesDivCreate())


  return generalDiv
}

const upperGameBoardDiv = document.querySelector(".gameBoard")
upperGameBoardDiv.appendChild(pageCreate())
