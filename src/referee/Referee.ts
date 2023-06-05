import { PieceType, TeamType } from "../components/Chessboard/Chessboard";

export default class Referee {
  //p = previous
  isValidMove(px:number, py:number, x:number, y:number, type:PieceType, team: TeamType) {
    console.log("ref is checking");
    console.log(x,y);
    console.log(px,py);
    console.log(type);
    console.log(team);

    if (type === PieceType.PAWN) {
      if (team === TeamType.OUR) {
        if (py === 1) {
          if (px === x && (y - py === 1 || y - py === 2)) {
            return true;
          }
        } else {
          if (px === x && y - py === 1) {
            return true;
          }
        }
      }
    }

    return false;
  }
}