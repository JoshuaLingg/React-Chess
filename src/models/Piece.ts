import { Position } from "."
import { PieceType, TeamType } from "../Types"

export class Piece {
  image: string 
  position: Position
  type: PieceType
  team: TeamType
  possibleMoves?: Position[];
  hasMoved: boolean;
  constructor(
    position: Position, 
    type: PieceType, 
    team: TeamType, 
    hasMoved: boolean,
    possibleMoves: Position[] = [], //set default value as empty array
    ) {
    this.image = `assets/images/${type}_${team}.png`;
    this.position = position;
    this.type = type;
    this.team = team;
    this.possibleMoves = possibleMoves;
    this.hasMoved = hasMoved;
  }

  // get - getter
  get isPawn(): Boolean {
    return this.type === PieceType.PAWN;
  }

  get isRook(): Boolean {
    return this.type === PieceType.ROOK;
  }

  get isKnight(): Boolean {
    return this.type === PieceType.KNIGHT;
  }
  
  get isBishop(): Boolean {
    return this.type === PieceType.BISHOP;
  }

  get isKing(): Boolean {
    return this.type === PieceType.KING;
  }

  get isQueen(): Boolean {
    return this.type === PieceType.QUEEN;
  }

  samePiecePosition(otherPiece: Piece): boolean {
    return this.position.samePosition(otherPiece.position);
  }

  samePosition(otherPosition: Position): boolean {
    return this.position.samePosition(otherPosition);
  }

  //create a new object so react usestate understands a change of state
  clone(): Piece {
    return new Piece(
      this.position.clone(), 
      this.type, 
      this.team, 
      this.hasMoved,
      this.possibleMoves?.map(m => m.clone()));
  }

}