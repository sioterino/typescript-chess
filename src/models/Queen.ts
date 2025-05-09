import { Chesspiece } from "./Chesspiece";

/**
 * REPRESENTS A QUEEN PIECE IN THE GAME OF CHESS.
 * 
 * The queen can move any number of squares vertically, horizontally, or diagonally,
 * as long as no pieces block her path.
 */
class Queen extends Chesspiece {

  /**
   * CONSTRUCTS A NEW QUEEN PIECE AND INITIALIZES ITS POSITION, COLOR, AND IMAGE.
   * 
   * @param {number} x - Initial X coordinate (column) on the chessboard.
   * @param {number} y - Initial Y coordinate (row) on the chessboard.
   * @param {boolean} [black=false] - Whether the Queen is black (default is false, which means white).
   */
  constructor(x: number, y: number, black: boolean = false) {
    super("queen", x, y, black);
  }

  /**
   * DETERMINES WHETHER THE QUEEN CAN MOVE TO THE SPECIFIED (X, Y) LOCATION.
   * 
   * The Queen combines the movement of both the Rook and Bishop:
   * - Straight lines (horizontal or vertical)
   * - Diagonals
   * 
   * Path must be clear, and destination cannot be occupied by a friendly piece.
   * 
   * @param {number} x - Destination X coordinate (column).
   * @param {number} y - Destination Y coordinate (row).
   * @param {Chesspiece[]} pieces - List of all the pieces currently on the board.
   * @returns {boolean} Returns true if the Queen can legally move to (x, y).
   */
  canMoveTo(x: number, y: number, pieces: Chesspiece[]): boolean {
    // check if the destination is occupied by a piece of the same team
    if (this.isSameTeamOccupied(x, y, pieces)) return false;

    // calculate absolute differences in coordinates
    const dx = Math.abs(this.x - x);
    const dy = Math.abs(this.y - y);

    // check if the move is in a straight line or diagonal
    const straight = dx === 0 || dy === 0;
    const diagonal = dx === dy;

    // invalid move if not straight or diagonal
    if (!straight && !diagonal) return false;

    // check if the path to the destination is clear (no pieces blocking the way)
    return this.isPathClear(x, y, pieces);
  }
}

export { Queen };
