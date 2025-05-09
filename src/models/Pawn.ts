import { Chesspiece } from "./Chesspiece";

/**
 * REPRESENTS A PAWN PIECE IN THE GAME OF CHESS.
 * 
 * Pawns move forward 1 square, or 2 squares from their starting position.
 * 
 * They can only capture diagonally and cannot move backward.
 */
class Pawn extends Chesspiece {

  /**
   * CONSTRUCTS A NEW PAWN PIECE AND INITIALIZES ITS POSITION, COLOR, AND IMAGE.
   * 
   * @param {number} x - Initial X coordinate (column) on the chessboard.
   * @param {number} y - Initial Y coordinate (row) on the chessboard.
   * @param {boolean} [black=false] - Whether the Pawn is black (default is false, which means white).
   */
  constructor(x: number, y: number, black: boolean = false) {
    super("pawn", x, y, black);
  }

   /**
   * DETERMINES WHETHER THE PAWN CAN MOVE TO THE SPECIFIED (X, Y) LOCATION.
   * 
   * Pawns move vertically forward one tile (or two if on starting row),
   * and can capture diagonally forward by one tile.
   * 
   * @param {number} x - Destination X coordinate (column).
   * @param {number} y - Destination Y coordinate (row).
   * @param {Chesspiece[]} pieces - List of all the pieces currently on the board.
   * @returns {boolean} Returns true if the Pawn can legally move to (x, y).
   */
  canMoveTo(x: number, y: number, pieces: Chesspiece[]): boolean {
    // check if the destination is occupied by a piece of the same team
    if (this.isSameTeamOccupied(x, y, pieces)) return false;

    // determine direction of movement based on team color
    const dir = this.black ? 1 : -1;
    // identify starting row for a two-square initial move
    const startRow = this.black ? 1 : 6;

    // calculate the distance of attempted move
    // the Pawn is the only chesspiece in which its direction movement matters
    // in this case, the absolute difference (which is always positive) is unuseful
    const dx = x - this.x;
    const dy = y - this.y;

    // helper function to check if a tile is blocked by any piece
    const isBlocked = (x: number, y: number) => pieces.some((p) => p.x === x && p.y === y);

    // standard forward move (1 square)
    if (dx === 0) {
      if (dy === dir && !isBlocked(x, y)) return true;

      // initial 2-square move from starting row
      if (this.y === startRow && dy === dir * 2 && !isBlocked(x, y) && !isBlocked(x, y - dir)) return true;
    }

    // diagonal capture (1 square diagonally forward)
    if (Math.abs(dx) === 1 && dy === dir) {
      const target = pieces.find((p) => p.x === x && p.y === y);
      if (target && target.black !== this.black) return true;
    }

    // any other move is illegal
    return false;
  }
}

export { Pawn };
