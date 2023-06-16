import { TeamType } from "../../Types";
import { Position, Piece } from "../../models";
import { tileIsOccupied, tileIsEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const kingMove = (
  initialPosition: Position,
  desiredPosition: Position, 
  team: TeamType,
  boardState: Piece[]
): boolean => { 
  for (let i = 1; i < 2; i++) {
    let multiplierX; // distance to move right left
    let multiplierY;  //distance to move up down
    if (desiredPosition.x < initialPosition.x) {
      multiplierX = -1;
    } else if (desiredPosition.x > initialPosition.x) {
      multiplierX = 1;
    } else {
      multiplierX = 0;
    }
    if (desiredPosition.y < initialPosition.y) {
      multiplierY = -1;
    } else if (desiredPosition.y > initialPosition.y) {
      multiplierY = 1;
    } else {
      multiplierY = 0;
    }
    let passedPosition = new Position(
      initialPosition.x + (i * multiplierX), 
      initialPosition.y + (i * multiplierY)
    );
    if (passedPosition.x === desiredPosition.x 
      && passedPosition.y === desiredPosition.y
    ) {
      if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
        return true;
      }
    } else {
      if (tileIsOccupied(passedPosition, boardState)) {
        break;
      }
    }
  }
  return false;
}

const outOfGrid = (destination: Position) => {
  if (destination.x < 0 || destination.x > 7 || destination.y < 0 || destination.y > 7) {
    return true;
  }
  return false;
}

export const getPossibleKingMoves = (king: Piece, boardState: Piece[]): Position[] => {
  const possibleMoves: Position[] = [];

  // right
  for (let i = 1; i < 2; i++) {
    const destination = new Position(king.position.x + i, king.position.y);
    if (outOfGrid(destination)) break;
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }
  // left
  for (let i = 1; i < 2; i++) {
    const destination = new Position(king.position.x - i, king.position.y);
    if (outOfGrid(destination)) break;
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }
  // up
  for (let i = 1; i < 2; i++) {
    const destination = new Position(king.position.x, king.position.y + i);
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }
  // down
  for (let i = 1; i < 2; i++) {
    const destination = new Position(king.position.x, king.position.y - i);
    if (outOfGrid(destination)) break;
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }
    //upper right 
  for (let i = 1; i < 2; i++) {
    const destination = new Position(king.position.x + i, king.position.y + i);
    if (outOfGrid(destination)) break;
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }
  //upper left
  for (let i = 1; i < 2; i++) {
    const destination = new Position(king.position.x - i, king.position.y + i);
    if (outOfGrid(destination)) break;
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
    }
      //bottom left
  for (let i = 1; i < 2; i++) {
    const destination = new Position(king.position.x - i, king.position.y - i);
    if (outOfGrid(destination)) break;
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }
  //bottom right 
  for (let i = 1; i < 2; i++) {
    const destination = new Position(king.position.x + i, king.position.y - i);
    if (outOfGrid(destination)) break;
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }

  return possibleMoves;

}

export const getCastlingMoves = (king: Piece, boardState: Piece[]): Position[] => {
  const possibleMoves: Position[] = [];

  if(king.hasMoved) return possibleMoves;

  const rooks = boardState.filter(p => p.isRook 
    && p.team === king.team 
    && !p.hasMoved);

  for(const rook of rooks) {
    const direction = (rook.position.x - king.position.x > 0) ? 1 : -1;

    const adjacentPosition = king.position.clone();
    adjacentPosition.x += direction;

    //check if rook can move to square adjacent of king
    if (!rook.possibleMoves?.some(m => m.samePosition(adjacentPosition))) continue;

    const concerningTiles = rook.possibleMoves.filter(m => m.y === king.position.y);

    const enemyPieces = boardState.filter(p => p.team !== king.team);

    // check if any enemy can attack the spaces between rook and king
    let valid = true;
    for(const enemy of enemyPieces) {
      if (enemy.possibleMoves === undefined) continue;
      for(const move of enemy.possibleMoves) {
        if (concerningTiles.some(t => t.samePosition(move))) {
          valid = false;
        }

        if (!valid) break;
      }
      if (!valid) break;
    }

    if (!valid) continue;

    possibleMoves.push(rook.position.clone());
  }

  return possibleMoves;
}