class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(obj) {
    this.items.push(obj);
  }
  dequeue() {
    return this.items.shift();
  }
  isEmpty() {
    return this.items.length === 0;
  }
}

class Node {
  constructor(x, y, dist = 0, previous = null) {
    this.xPos = x;
    this.yPos = y;
    this.dist = dist;
    this.previous = previous;
  }
}

function buildBoard() {
  let gameBoard = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      gameBoard.push([i, j]);
    }
  }
  return gameBoard;
}
const gameBoard = buildBoard();
// console.log(gameBoard);

const possibleMoves = [
  [-1, -2],
  [-1, 2],
  [-2, -1],
  [-2, 1],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
];

function validMoves(cell) {
  let validMoves = [];
  possibleMoves.forEach((move) => {
    let currCell = new Node(cell.xPos + move[0], cell.yPos + move[1]);
    gameBoard.forEach((square) => {
      if (currCell.xPos === square[0] && currCell.yPos === square[1]) {
        validMoves.push(currCell);
      }
    });
  });
  return validMoves;
}

function printMoves(currentMove) {
  let moves = [];
  while (currentMove !== null) {
    moves.unshift(`
    [${currentMove.xPos},${currentMove.yPos}]`);
    currentMove = currentMove.previous;
  }
  return moves;
}

function knightMoves(start, end) {
  let q = new Queue();
  q.enqueue(new Node(start[0], start[1]));

  while (!q.isEmpty()) {
    let currentMove = q.dequeue();
    if (currentMove.xPos === end[0] && currentMove.yPos === end[1]) {
      return `=> You made it in ${currentMove.dist} moves! Here's your path:
       ${printMoves(currentMove)}`;
    }
    validMoves(currentMove).forEach((move) => {
      if (move.previous === null) {
        move.previous = currentMove;
        move.dist = currentMove.dist + 1;

        q.enqueue(move);
      }
    });
  }
}

/*console.log(knightMoves([3, 3], [3, 4]));
=> You made it in 3 moves! Here's your path:
    [3,3],
    [2,1],
    [1,3],
    [3,4]
*/

/* console.log(knightMoves([0, 0], [10, 10]));

  -base case has not been added for numbers out-of-range
  -Will cause an infinite loop searching for a number that does not exist
*/
