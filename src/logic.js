function info() {
    console.log("INFO")
    const response = {
        apiversion: "1",
        author: "",
        color: "#A6C1D5",
        head: "bendr",
        tail: "round-bum"
    }
    return response
}

function start(gameState) {
    console.log(`${gameState.game.id} START`)
}

function end(gameState) {
    console.log(`${gameState.game.id} END\n`)
}

function move(gameState) {
    let possibleMoves = {
        up: true,
        down: true,
        left: true,
        right: true
    }

  // function
  function checkBody(self, other) {
  
}


    // Step 0: Don't let your Battlesnake move back on its own neck
    const myHead = gameState.you.head
    const myNeck = gameState.you.body[1]
    if (myNeck.x < myHead.x) {
        possibleMoves.left = false
    } else if (myNeck.x > myHead.x) {
        possibleMoves.right = false
    } else if (myNeck.y < myHead.y) {
        possibleMoves.down = false
    } else if (myNeck.y > myHead.y) {
        possibleMoves.up = false
    }

    // Step 1 - Don't hit walls.
    // Use information in gameState to prevent your Battlesnake from moving beyond the boundaries of the board.
    const boardWidth = gameState.board.width
    const boardHeight = gameState.board.height
    if (myHead.x === gameState.board.width - 1) {
      possibleMoves.right = false;
    } 
    if (myHead.x === 0) {
      possibleMoves.left = false;
    } 
    if (myHead.y === gameState.board.height - 1) {
      possibleMoves.up = false;
    } 
    if (myHead.y === 0) {
      possibleMoves.down = false;
    }

    // Step 2 - Don't hit yourself.
    // Use information in gameState to prevent your Battlesnake from colliding with itself.
    // Head = 0, Neck = 1, start at 2
    for (let i = 2; i < gameState.you.length; i++) {
      let checkBody = gameState.you.body[i];
      if (myHead.y === checkBody.y) {
        if (myHead.x === checkBody.x - 1) {
          possibleMoves.right = false;
        } else if (myHead.x === checkBody.x + 1) {
          possibleMoves.left = false;
        }
      }

      if (myHead.x === checkBody.x) {
        if (myHead.y === checkBody.y + 1) {
          possibleMoves.down = false;
        } else if (myHead.y === checkBody.y - 1) {
          possibleMoves.up = false;
        }
      }
    }


//avoid food

const food = gameState.board.food;

if (gameState.you.health < 25) {
  food.filter()
}


    // TODO: Step 3 - Don't collide with others.
    // Use information in gameState to prevent your Battlesnake from colliding with others.
    
    const otherSnakes = gameState.board.snakes;
    const myID = gameState.you.id;
    for (let i = 0; i < otherSnakes.length; i++) {
      if (otherSnakes[i].id != myID) {        
        for (let j = 0; j < otherSnakes[i].body.length; j++) {
            // Need to avoid other snake's heads in case of collision
          // if (j == 0) {
          //   [myHead.x, myHead.y]
          //   let gameState.you.head.x
          //   [x+1, y]
          //   x-1 y
          //   x y+1
          //   x y-1
          // }



          let otherBody = otherSnakes[i].body[j];
          if (myHead.y == otherBody.y) {
            if (myHead.x == otherBody.x - 1) {
              possibleMoves.right = false;
            } else if (myHead.x == otherBody.x + 1) {
              possibleMoves.left = false;
            }
          }

          if (myHead.x == otherBody.x) {
            if (myHead.y == otherBody.y - 1) {
              possibleMoves.up = false;
            } else if (myHead.y == otherBody.y + 1) {
              possibleMoves.down = false;
            }
          }



        }
      }
    }

    // TODO: Step 4 - Find food.
    // Use information in gameState to seek out and find food.

    // Finally, choose a move from the available safe moves.
    // TODO: Step 5 - Select a move to make based on strategy, rather than random.
    const safeMoves = Object.keys(possibleMoves).filter(key => possibleMoves[key])
    const response = {
        move: safeMoves[Math.floor(Math.random() * safeMoves.length)],
    }

    console.log(`${gameState.game.id} MOVE ${gameState.turn}: ${response.move}`)
    return response
}

module.exports = {
    info: info,
    start: start,
    move: move,
    end: end
}
