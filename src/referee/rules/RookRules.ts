import { Position, Piece, TeamType } from "../../Constants";
import { tileIsOccupied, tileIsEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const rookMove = (
  initialPosition: Position,
  desiredPosition: Position, 
  team: TeamType,
  boardState: Piece[]
): boolean => {
  //Vertical Movement
  if (desiredPosition.x === initialPosition.x) {
    for (let i = 1; i < 8; i++) {
      let multiplier = (desiredPosition.y < initialPosition.y) ? -1 : 1;
      let passedPosition: Position = {
        x:initialPosition.x, 
        y: initialPosition.y + (i * multiplier)
      };
      if (passedPosition.x == desiredPosition.x && passedPosition.y == desiredPosition.y) {
        if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
          return true;
        }
      } else {
        if (tileIsOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }
  }   
  
  if (desiredPosition.y === initialPosition.y) {
    for (let i = 1; i < 8; i++) {
      let multiplier = (desiredPosition.x < initialPosition.x) ? -1 : 1;
      let passedPosition: Position = {
        x:initialPosition.x + (i * multiplier), 
        y: initialPosition.y
      };
      if (passedPosition.x == desiredPosition.x && passedPosition.y == desiredPosition.y) {
        if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
          return true;
        }
      } else {
        if (tileIsOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }
  }
  return false;
}

export const getPossibleRookMoves = (rook: Piece, boardState: Piece[]): Position[] => {
  const possibleMoves: Position[] = [];

  // right
  for (let i = 1; i < 8; i++) {
    const destination: Position = {x: rook.position.x + i, y: rook.position.y};
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }
  // left
  for (let i = 1; i < 8; i++) {
    const destination: Position = {x: rook.position.x - i, y: rook.position.y};
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }
  // up
  for (let i = 1; i < 8; i++) {
    const destination: Position = {x: rook.position.x, y: rook.position.y + i};
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }
  // down
  for (let i = 1; i < 8; i++) {
    const destination: Position = {x: rook.position.x, y: rook.position.y - i};
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break; // stop loop if encounter same team piece
    }
  }

  return possibleMoves;

}