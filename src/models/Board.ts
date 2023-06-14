import { Piece, Position } from ".";
import { PieceType, TeamType } from "../Types";
import { getPossiblePawnMoves, getPossibleKnightMoves, getPossibleBishopMoves, getPossibleRookMoves, getPossibleQueenMoves, getPossibleKingMoves } from "../referee/rules";
import { Pawn } from "./Pawn";

export class Board {
  pieces: Piece[];
  
  constructor(pieces: Piece[]) {
    this.pieces = pieces;
  }

  calculateAllMoves() {
    for(const piece of this.pieces) {
      piece.possibleMoves = this.getValidMoves(piece, this.pieces);
    }  
  }

  getValidMoves(piece: Piece, boardState: Piece[]) : Position[] {
    switch (piece.type) {
      case PieceType.PAWN:
        return getPossiblePawnMoves(piece, boardState);
      case PieceType.KNIGHT:
        return getPossibleKnightMoves(piece, boardState);
      case PieceType.BISHOP:
        return getPossibleBishopMoves(piece,boardState);
      case PieceType.ROOK:
        return getPossibleRookMoves(piece, boardState);
      case PieceType.QUEEN:
        return getPossibleQueenMoves(piece, boardState);
      case PieceType.KING:
        return getPossibleKingMoves(piece, boardState);
      default: 
        return []
    }
  }

  playMove(
    enPassantMove: boolean, 
    validMove: boolean,
    playedPiece: Piece,
    destination: Position, 
  ): boolean {

    const pawnDirection = (playedPiece.team === TeamType.OUR) ? 1 : -1;

    if (enPassantMove) {
      this.pieces = this.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          if (piece.isPawn) 
            (piece as Pawn).enPassant = false;
          piece.position.x = destination.x;
          piece.position.y = destination.y;

          results.push(piece);
        } else if (
          !(piece.samePosition(new Position(destination.x, destination.y - pawnDirection)))
        ) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant = false;
          }
          results.push(piece);
        }

        return results;
      }, [] as Piece[]);

      this.calculateAllMoves();
    } else if (validMove) {
      //updates and remove piece
      this.pieces = this.pieces.reduce((results, piece) => {
        //piece currently moving
        if (piece.samePiecePosition(playedPiece)) {
          //en passant
          if (piece.isPawn) {
            (piece as Pawn).enPassant = Math.abs(
              playedPiece.position.y - destination.y) === 2 
              && piece.type === PieceType.PAWN;
            piece.position.x = destination.x;
            piece.position.y = destination.y;
          }

          results.push(piece);
        } else if (!(piece.samePosition(destination))) { //pushes into array if piece is unaffected by moving piece
          if (piece.isPawn) {
            (piece as Pawn).enPassant = false;
          }
          results.push(piece);
        }
        return results;
      }, [] as Piece[]);

      this.calculateAllMoves();
    } else {
      return false;
    }
    return true;
  }

  //function to create a new board so react state understands a change in state
  clone(): Board {
    // can't use this as it saves a reference to original object

    return new Board(this.pieces.map(p => p.clone()));
  }
}