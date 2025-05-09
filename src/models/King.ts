import { Chesspiece } from "./Chesspiece";

/**
 * REPRESENTS A KING PIECE IN THE GAME OF CHESS.
 * 
 * The King can move exactly one square in any direction.
 */
class King extends Chesspiece {

  /**
   * CONSTRUCTS A NEW KING PIECE AND INITIALIZES ITS POSITION, COLOR, AND IMAGE.
   * 
   * @param {number} x - Initial X coordinate (column) on the chessboard.
   * @param {number} y - Initial Y coordinate (row) on the chessboard.
   * @param {boolean} [black=false] - Whether the King is black (default is false, which means white).
   */
  constructor(x: number, y: number, black: boolean = false) {
    super("king", x, y, black);
  }

  /**
   * DETERMINES WHETHER THE KING CAN MOVE TO A SPECIFIED DESTINATION.
   * 
   * Kings can move one square in any direction, as long as the destination
   * is not occupied by a piece of the same team.
   *
   * @param {number} x - Destination X coordinate (column).
   * @param {number} y - Destination Y coordinate (row).
   * @param {Chesspiece[]} pieces - List of all the pieces currently on the board.
   * @returns {boolean} Returns true if the King can legally move to (x, y).
   */
  canMoveTo(x: number, y: number, pieces: Chesspiece[]): boolean {
    // check if the destination is occupied by a piece of the same team
    if (this.isSameTeamOccupied(x, y, pieces)) return false;

    // calculate how far the move is in both directions
    const dx = Math.abs(this.x - x);
    const dy = Math.abs(this.y - y);

    // king moves one square in any direction
    return dx <= 1 && dy <= 1;
  }
}

export { King };
