import { PieceType, TeamType, Piece } from "../components/Chessboard/Chessboard";

export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
    
    const piece = boardState.find(p => p.x === x && p.y === y);
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  TileIsOccupiedByOpponent(x: number, y: number, boardState: Piece[], team: TeamType): boolean {

    const piece = boardState.find(p => p.x === x && p.y === y && p.team !== team);
    if (piece) {
      return true
    } else {
      return false;
    }
  }

  isEnPassantMove(    
    px:number, 
    py:number, 
    x:number, 
    y:number, 
    type:PieceType, 
    team: TeamType,
    boardState: Piece[]
    ) {
    const pawnDirection = (team === TeamType.OUR) ? 1 : -1;

    if (type === PieceType.PAWN) {
      if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
        const piece = boardState.find(
          p => p.x === x && p.y === y - pawnDirection && p.enPassant
        );
        
        if (piece) {
          return true;
        }
      }
    }

    return false;

  }

  //p = previous
  isValidMove(
    px:number, 
    py:number, 
    x:number, 
    y:number, 
    type:PieceType, 
    team: TeamType,
    boardState: Piece[]
    ) {
    // console.log("ref is checking");
    // console.log(x,y);
    // console.log(px,py);
    // console.log(type);
    // console.log(team);

    if (type === PieceType.PAWN) {
      const specialRow = (team === TeamType.OUR) ? 1 : 6;
      const pawnDirection = (team === TeamType.OUR) ? 1 : -1;

      //Movement
      if (py === specialRow && y - py === 2 * pawnDirection) {
        if (!this.tileIsOccupied(x, y, boardState) 
            && !this.tileIsOccupied(x, y - pawnDirection, boardState)) {
            return true;    
        }
      } else if (px === x && y - py === pawnDirection) {
        if (!this.tileIsOccupied(x, y, boardState)) {
          return true;
        }         
      }

      //Attacking
      else if (x - px === -1 && y - py === pawnDirection) {
        if (this.TileIsOccupiedByOpponent(x, y, boardState, team)) {
          return true;
        }
      } else if (x - px === 1 && y - py === pawnDirection) {
        if (this.TileIsOccupiedByOpponent(x, y, boardState, team)) {
          return true;
        }
      }
    }  

    return false;
  }
}