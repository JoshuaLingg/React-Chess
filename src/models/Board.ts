import { Piece, Position } from ".";
import { PieceType, TeamType } from "../Types";
import { getPossiblePawnMoves, getPossibleKnightMoves, getPossibleBishopMoves, getPossibleRookMoves, getPossibleQueenMoves, getPossibleKingMoves, getCastlingMoves } from "../referee/rules";
import { Pawn } from "./Pawn";

export class Board {
  pieces: Piece[];
  totalTurns: number;
  winningTeam?: TeamType;
  
  constructor(pieces: Piece[], totalTurns: number) {
    this.pieces = pieces;
    this.totalTurns = totalTurns;
  }

  get currentTeam(): TeamType {
    return this.totalTurns % 2 === 0 
    ? TeamType.OPPONENT 
    : TeamType.OUR;
  }

  calculateAllMoves() {
    for(const piece of this.pieces) {
      piece.possibleMoves = this.getValidMoves(piece, this.pieces);
    }  

    //calculate castling moves
    for(const king of this.pieces.filter(p => p.isKing)) {
      if (king.possibleMoves === undefined) continue;
      king.possibleMoves = [...king.possibleMoves, ...getCastlingMoves(king, this.pieces)];
    }

    //check if current team moves are valid
    this.checkCurrentTeamMoves();

    //remove possible moves for team not playing
    for(const piece of this.pieces.filter(p => p.team !== this.currentTeam)) {
      piece.possibleMoves = [];
    }

    if (this.pieces.filter(p => p.team === this.currentTeam)
      .some(p => p.possibleMoves !== undefined && p.possibleMoves.length > 0)) return;

    this.winningTeam = this.currentTeam === TeamType.OUR ? TeamType.OPPONENT : TeamType.OUR;
  }

  checkCurrentTeamMoves() {
    for(const piece of this.pieces.filter(p => p.team === this.currentTeam)) {
      if (piece.possibleMoves === undefined) continue;
      
      for(const move of piece.possibleMoves) {
        const simulatedBoard = this.clone();

        const pieceAtDestination = simulatedBoard.pieces.find(p => p.samePosition(move));
        if (pieceAtDestination !== undefined) {
          simulatedBoard.pieces = simulatedBoard.pieces.filter(p => !p.samePosition(move));
        }

        const clonedPiece = simulatedBoard.pieces.find(p => p.samePiecePosition(piece))!; // ! tells typescript piece will exist
        clonedPiece.position = move.clone(); 

        const clonedKing = simulatedBoard.pieces.find(p => p.isKing && p.team === simulatedBoard.currentTeam)!;

        //loop through all enemy moves and see if current team's king is in danger
        for(const enemy of simulatedBoard.pieces.filter(p => p.team !== simulatedBoard.currentTeam)) {
          enemy.possibleMoves = simulatedBoard.getValidMoves(enemy, simulatedBoard.pieces);

          if (enemy.isPawn) {
            if (enemy.possibleMoves.some(m => m.x !== enemy.position.x 
              && m.samePosition(clonedKing.position))) {
              piece.possibleMoves = piece.possibleMoves?.filter(m => !m.samePosition(move));

            }
          } else {
            if (enemy.possibleMoves.some(m => m.samePosition(clonedKing.position))) {
              piece.possibleMoves = piece.possibleMoves?.filter(m => !m.samePosition(move));

            }
          }

        }


      }
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
    const destinationPiece = this.pieces.find(p => p.samePosition(destination));

    if (playedPiece.isKing && destinationPiece?.isRook 
      && playedPiece.team === playedPiece.team) {
        const direction = (destinationPiece.position.x - playedPiece.position.x > 0) ? 1 : -1;
        const newKingXPosition = playedPiece.position.x + direction * 2;

        this.pieces = this.pieces.map(p => {
          if (p.samePiecePosition(playedPiece)) {
            p.position.x = newKingXPosition;
          } else if (p.samePiecePosition(destinationPiece)) {
            p.position.x = newKingXPosition - direction;
          }

          return p;
        });
        this.calculateAllMoves();
        return true;
    }

    if (enPassantMove) {
      this.pieces = this.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant = false;
          }
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          piece.hasMoved = true;

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
          }
          
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          piece.hasMoved = true;
        
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
    return new Board(this.pieces.map(p => p.clone()), 
    this.totalTurns);
  }
}