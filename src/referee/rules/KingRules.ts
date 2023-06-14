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

export const getPossibleKingMoves = (king: Piece, boardState: Piece[]): Position[] => {
  const possibleMoves: Position[] = [];

  // right
  for (let i = 1; i < 2; i++) {
    const destination = new Position(king.position.x + i, king.position.y);
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