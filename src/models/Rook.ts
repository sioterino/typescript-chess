import { Chesspiece } from "./Chesspiece";

/**
 * REPRESENTS A ROOK PIECE IN THE GAME OF CHESS.
 * 
 * The rook can move any number of squares along a row or column,
 * as long as no pieces block its path.
 */
class Rook extends Chesspiece {

  /**
   * CONSTRUCTS A NEW ROOK PIECE AND INITIALIZES ITS POSITION, COLOR, AND IMAGE.
   * 
   * @param {number} x - Initial X coordinate (column) on the chessboard.
   * @param {number} y - Initial Y coordinate (row) on the chessboard.
   * @param {boolean} [black=false] - Whether the Rook is black (default is false, which means white).
   */
  constructor(x: number, y: number, black: boolean = false) {
    super("rook", x, y, black);
  }

  /**
   * DETERMINES WHETHER THE ROOK CAN LEGALLY MOVE TO THE SPECIFIED (X, Y) LOCATION.
   * 
   * Rooks move in straight lines only, either horizontally or vertically.
   * 
   * They cannot jump over other pieces, and cannot capture pieces of the same color.
   * 
   * @param {number} x - Destination X coordinate (column).
   * @param {number} y - Destination Y coordinate (row).
   * @param {Chesspiece[]} pieces - List of all the pieces currently on the board.
   * @returns {boolean} Returns true if the Rook can legally move to (x, y).
   */
  canMoveTo(x: number, y: number, pieces: Chesspiece[]): boolean {
    // check if the destination is occupied by a piece of the same team
    if (this.isSameTeamOccupied(x, y, pieces)) return false;

    // calculate absolute differences in coordinates
    const dx = Math.abs(this.x - x);
    const dy = Math.abs(this.y - y);

    // rooks can only move if either dx or dy is zero (not both non-zero, i.e., not diagonal)
    if (dx !== 0 && dy !== 0) return false;

    // check if the path to the destination is clear (no pieces blocking the way)
    return this.isPathClear(x, y, pieces);
  }
}

export { Rook };
