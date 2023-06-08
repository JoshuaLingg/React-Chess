import { Position, Piece, TeamType } from "../../Constants";
import { tileIsOccupied, tileIsEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const bishopMove = (
  initialPosition: Position,
  desiredPosition: Position, 
  team: TeamType,
  boardState: Piece[]
): boolean => {
  //top Right Movement
  for (let i = 1; i < 8; i++) {
    //Diagonal movement
    let multiplierX = (desiredPosition.x < initialPosition.x) ? -1 : 1;
    let multiplierY = (desiredPosition.y < initialPosition.y) ? -1 : 1;
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