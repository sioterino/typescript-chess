/**
 * ABSTRACT BASE CLASS REPRESENTING A GENERIC CHESS PIECE.
 * 
 * All specific piece types (pawn, rook, etc.) should extend this class.
 */
abstract class Chesspiece {

    /** x Coordinate (column) on the board */
    public x: number;
    /** y Coordinate (row) on the board */
    public y: number;

    /** Indicates if the piece is black (true) or white (false) */
    public black: boolean;
    /** Tracks whether the piece is currently selected */
    public selected: boolean = false;

    /** File path to the image representing this piece */
    public img: string;

    /**
     * CONSTRUCTS A NEW CHESSPIECE INSTANCE.
     * 
     * @param {string} name - The name of the piece (used for loading image).
     * @param {number} x - Initial x coordinate.
     * @param {number} y - Initial y coordinate.
     * @param {boolean} [black=false] - Whether the piece is black (default: false).
     */
    constructor(name: string, x: number, y: number, black: boolean = false) {
        this.x = x;
        this.y = y;
        this.black = black;
        this.img = `/src/assets/images/${name}${black ? '1' : ''}.png`;
    }

    /**
     * CHECKS IF A TILE IS OCCUPIED BY A PIECE ON THE SAME TEAM.
     * 
     * @param {number} x - Target x coordinate.
     * @param {number} y - Target y coordinate.
     * @param {Chesspiece[]} pieces - All pieces currently on the board.
     * @returns {boolean} True if tile has a friendly piece, false otherwise.
     */
    public isSameTeamOccupied(x: number, y: number, pieces: Chesspiece[]): boolean {
        // looks for the exact chesspiece on the x and y coordinates
        const piece = pieces.find(p => p.x === x && p.y === y);
        // returns whether the selected piece above is the same color as this instance of chesspiece
        return piece ? piece.black === this.black : false;
    }

    /**
     * CHECKS IF THE PATH BETWEEN THIS PIECE'S CURRENT POSITION AND A DESTINATION TILE IS CLEAR.
     * 
     * Used by pieces like Rook, Bishop, and Queen for valid movement checking.
     * 
     * Pieces like the King and Pawn move only one tile per movement,
     * therefore the usage of this method for these pieces is obsolete.
     * 
     * Knights are the only chesspieces which can jump over other pieces,
     * therefore the usage of this method for this piece is also obsolete.
     * 
     * @param {number} toX - Destination x coordinate.
     * @param {number} toY - Destination y coordinate.
     * @param {Chesspiece[]} pieces - All pieces currently on the board.
     * @returns {boolean} True if there are no pieces blocking the path; false otherwise.
     */
    protected isPathClear(toX: number, toY: number, pieces: Chesspiece[]): boolean {
        // calculate how far the destination is from the current position in x and y
        const dx = toX - this.x;
        const dy = toY - this.y;

        // determine the direction of movement along x and y:
        // 1 if moving right/down, -1 if moving left/up, 0 if not moving in that axis
        const stepX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
        const stepY = dy === 0 ? 0 : dy > 0 ? 1 : -1;

        // start from the next tile in the direction of movement
        let x = this.x + stepX;
        let y = this.y + stepY;

        // continue moving step-by-step until reaching the destination tile
        while (x !== toX || y !== toY) {
            // check if any piece occupies the current tile (x, y)
            if (pieces.some(p => p.x === x && p.y === y)) return false;
            // move one step further along the path
            x += stepX;
            y += stepY;
        }

        // no pieces were found blocking the path, so it's clear
        return true;    
    }

    /**
     * UPDATES THE INTERNAL POSITION OF THE PIECE.
     * 
     * @param {number} x - New x coordinate.
     * @param {number} y - New y coordinate.
     */
    public move(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

  /**
   * RENDERS THE CHESSPIECE ON THE CANVAS.
   * 
   * This method draws the piece using its image at the correct position on the board.
   * 
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   * @param {number} tileSize - The size of one square on the chessboard, in pixels.
   */
  render(ctx: CanvasRenderingContext2D, tileSize: number): void {
    // create a new image object
    const img = new Image();
    // set the source of the image to the piece's image path
    img.src = this.img;

    // once the image is loaded, draw it on the canvas
    img.onload = () => {
      // scale the image to fit within the square (80% of the tile size)
      const size = tileSize * 0.8;

      // draw the image centered within the tile
      ctx.drawImage(
        img,
        this.x * tileSize + (tileSize - size) / 2,  // x position (centered)
        this.y * tileSize + (tileSize - size) / 2,  // y position (centered)
        size,  // width
        size   // height
      );
    };
  }

  /**
   * ABSTRACT METHOD TO DETERMINE IF THE PIECE CAN MOVE TO A GIVEN TILE.
   * 
   * Must be implemented by each specific chess piece class.
   * 
   * @param {number} x - Destination X coordinate (column).
   * @param {number} y - Destination Y coordinate (row).
   * @param {Chesspiece[]} pieces - List of all the pieces currently on the board.
   * @returns {boolean} Returns true if the piece can legally move to (x, y).
   */
  public abstract canMoveTo(x: number, y: number, pieces: Chesspiece[]): boolean;
}

export { Chesspiece };
