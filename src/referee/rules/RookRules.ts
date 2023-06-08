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