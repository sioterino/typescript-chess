import { Chesspiece } from "./Chesspiece";

/**
 * REPRESENTS A BISHOP PIECE IN THE GAME OF CHESS.
 * 
 * The Bishop can move diagonally any number of squares, but only within its  tile color.
 */
class Bishop extends Chesspiece {

  /**
   * CONSTRUCTS A NEW BISHOP PIECE AND INITIALIZES ITS POSITION, COLOR, AND IMAGE.
   * 
   * @param {number} x - Initial X coordinate (column) on the chessboard.
   * @param {number} y - Initial Y coordinate (row) on the chessboard.
   * @param {boolean} [black=false] - Whether the Bishop is black (default is false, which means white).
   */
  constructor(x: number, y: number, black: boolean = false) {
    super("bishop", x, y, black);
  }

  /**
   * DETERMINES WHETHER THE BISHOP CAN MOVE TO A SPECIFIED DESTINATION (X, Y) ON THE CHESSBOARD.
   * 
   * A Bishop can move diagonally, so it checks:
   * 1. Whether the destination is not occupied by a piece of the same team.
   * 2. Whether the move is along a diagonal (i.e., the absolute difference in x and y must be equal).
   * 3. Whether the path to the destination is clear (no pieces in between).
   * 
   * @param {number} x - Destination X coordinate (column).
   * @param {number} y - Destination Y coordinate (row).
   * @param {Chesspiece[]} pieces - List of all the pieces currently on the board.
   * @returns {boolean} Returns true if the Bishop can legally move to (x, y).
   */
  canMoveTo(x: number, y: number, pieces: Chesspiece[]): boolean {
    // check if the destination is occupied by a piece of the same team
    if (this.isSameTeamOccupied(x, y, pieces)) return false;
    // a bishop must move diagonally, so the absolute differences in x and y must be the same
    if (Math.abs(this.x - x) !== Math.abs(this.y - y)) return false;
    // check if the path to the destination is clear (no pieces blocking the way)
    return this.isPathClear(x, y, pieces);
  }
}

export { Bishop };
