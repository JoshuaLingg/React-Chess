import { Position, Piece, TeamType } from "../../Constants";
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