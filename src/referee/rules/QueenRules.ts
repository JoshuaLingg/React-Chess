import { Position, Piece, TeamType } from "../../Constants";
import { tileIsOccupied, tileIsEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const queenMove = (
  initialPosition: Position,
  desiredPosition: Position, 
  team: TeamType,
  boardState: Piece[]
): boolean => {
  for (let i = 1; i < 8; i++) {
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
    let passedPosition: Position = {
      x: initialPosition.x + (i * multiplierX), 
      y: initialPosition.y + (i * multiplierY)
    };
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

export const getPossibleQueenMoves = (queen: Piece, boardState: Piece[]): Position[] => {
  const possibleMoves: Position[] = [];

  // right
  for (let i = 1; i < 8; i++) {
    const destination: Position = {x: queen.position.x + i, y: queen.position.y};
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }
  // left
  for (let i = 1; i < 8; i++) {
    const destination: Position = {x: queen.position.x - i, y: queen.position.y};
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }
  // up
  for (let i = 1; i < 8; i++) {
    const destination: Position = {x: queen.position.x, y: queen.position.y + i};
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }
  // down
  for (let i = 1; i < 8; i++) {
    const destination: Position = {x: queen.position.x, y: queen.position.y - i};
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }
    //upper right 
  for (let i = 1; i < 8; i++) {
    const destination: Position = {x: queen.position.x + i, y: queen.position.y + i};
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }
  //upper left
  for (let i = 1; i < 8; i++) {
    const destination: Position = {x: queen.position.x - i, y: queen.position.y + i};
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
    }
      //bottom left
  for (let i = 1; i < 8; i++) {
    const destination: Position = {x: queen.position.x - i, y: queen.position.y - i};
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }
  //bottom right 
  for (let i = 1; i < 8; i++) {
    const destination: Position = {x: queen.position.x + i, y: queen.position.y - i};
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }

  return possibleMoves;

}