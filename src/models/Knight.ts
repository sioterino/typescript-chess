import { Chesspiece } from "./Chesspiece";

/**
 * REPRESENTS A KNIGHT PIECE IN THE GAME OF CHESS.
 * 
 * Knights move in an "L" shape: two squares in one direction, then one square perpendicular.
 * 
 * Knights are the only pieces that can jump over other pieces.
 */
class Knight extends Chesspiece {

  /**
   * CONSTRUCTS A NEW KNIGHT PIECE AND INITIALIZES ITS POSITION, COLOR, AND IMAGE.
   * 
   * @param {number} x - Initial X coordinate (column) on the chessboard.
   * @param {number} y - Initial Y coordinate (row) on the chessboard.
   * @param {boolean} [black=false] - Whether the Knight is black (default is false, which means white).
   */
  constructor(x: number, y: number, black: boolean = false) {
    super("knight", x, y, black);
  }

  /**
   * DETERMINES WHETHER THE KNIGHT CAN MOVE TO THE SPECIFIED (X, Y) TILE.
   * 
   * A Knight can move in an "L" shape: two tiles in one axis, and one tile in the perpendicular axis.
   * 
   * Unlike other pieces, the Knight can jump over other pieces.
   * 
   * @param {number} x - Destination X coordinate (column).
   * @param {number} y - Destination Y coordinate (row).
   * @param {Chesspiece[]} pieces - List of all the pieces currently on the board.
   * @returns {boolean} Returns true if the Knight can legally move to (x, y).
   */
  canMoveTo(x: number, y: number, pieces: Chesspiece[]): boolean {
    // check if the destination is occupied by a piece of the same team
    if (this.isSameTeamOccupied(x, y, pieces)) return false;

    // calculate absolute differences in coordinates
    const dx = Math.abs(this.x - x);
    const dy = Math.abs(this.y - y);

    // knight moves in an "L" shape: 2x1 or 1x2
    return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
  }
}

export { Knight };
