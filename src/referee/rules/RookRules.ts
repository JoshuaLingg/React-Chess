import { TeamType } from "../../Types";
import { Position, Piece } from "../../models";
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
      let passedPosition = new Position(
        initialPosition.x, 
        initialPosition.y + (i * multiplier)
      );
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
      let passedPosition = new Position(
        initialPosition.x + (i * multiplier), 
        initialPosition.y
      );
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
    const destination = new Position(rook.position.x + i, rook.position.y);
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
    const destination = new Position(rook.position.x - i, rook.position.y);
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
    const destination = new Position(rook.position.x, rook.position.y + i);
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
    const destination = new Position(rook.position.x, rook.position.y - i);
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