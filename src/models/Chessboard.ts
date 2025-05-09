import { Chesspiece } from "../models/Chesspiece";
import { Bishop } from "../models/Bishop";
import { Pawn } from "../models/Pawn";
import { Rook } from "../models/Rook";
import { Knight } from "../models/Knight";
import { Queen } from "../models/Queen";
import { King } from "../models/King";

/**
 * MANAGES THE STATE, RENDERING AND INTERACTIONS OF A CHESSBOARD.
 */
class Chessboard { // ==============================================================================
    /** Canvas element used to draw the game board */
    private canvas: HTMLCanvasElement;
    /** 2D rendering context of the canvas */
    private ctx: CanvasRenderingContext2D;
    /** Size of the tile in pixels, calculated based on canvas width */
    private tileSize: number;
  
    /** Array that holds all the pieces currently on the board */
    private pieces: Chesspiece[];
    /** Reference to the currently selected piece, if any */
    private selectedPiece: Chesspiece | null = null;
  
    /**
     * CONSTRUCTOR - INITIALIZES THE BOARD, PIECES, EVENTS, AND FIRST RENDER
     * 
     * @param {string} canvasId - The ID of the canvas element to render the chessboard on.
     */
    constructor(canvasId: string) { // =============================================================
      // get the canvas element from the dom using its id
      this.canvas = document.querySelector(`#${canvasId}`) as HTMLCanvasElement;
      // get the 2d drawing context from the canvas
      this.ctx = this.canvas.getContext("2d")!;
      // divide the canvas width by 8 to get the size of each tile
      this.tileSize = this.canvas.width / 8;
  
      // initial layout of the board using standard chess notation
      const layout = [
        ["r", "n", "b", "q", "k", "b", "n", "r"],
        ["p", "p", "p", "p", "p", "p", "p", "p"],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        ["P", "P", "P", "P", "P", "P", "P", "P"],
        ["R", "N", "B", "Q", "K", "B", "N", "R"],
      ];
  
      // convert layout into actual piece instances
      this.pieces = this.loadPiecesFromLayout(layout);
      // initial drawing of the board and pieces
      this.render();
  
      // set up click event to handle selection and movement
      this.canvas.addEventListener("click", (event) => this.onClick(event));
      // set up mouse move event to change cursor when hovering over pieces
      this.canvas.addEventListener("mousemove", (event) => this.onMouseMove(event));
    } // ===========================================================================================

    /**
     * CHECKS IF MOUSE IS HOVERING OVER A PIECE, AND SETS THE CURSOR ACCORDINGLY
     * 
     * @param {MouseEvent} event - The mousemove event.
     */
  private onMouseMove(event: MouseEvent): void { // ================================================
    const { x, y } = this.getClickedPosition(event);
    const hoveredPiece = this.pieces.find(p => p.x === x && p.y === y);

    // show pointer cursor if hovering over a piece, otherwise default
    if (hoveredPiece) {
        this.canvas.style.cursor = 'pointer';
    } else {
        this.canvas.style.cursor = 'default';
    }
  } // =============================================================================================

    /**
     * LOADS PIECES FROM THE STRING LAYOUT INTO CHESSPIECE OBJECTS
     * 
     * @param {string[][]} layout - The initial layout of the chessboard.
     * @returns {Chesspiece[]} Array of initialized chess pieces.
     */
  private loadPiecesFromLayout(layout: string[][]): Chesspiece[] { // ==============================
    const pieces: Chesspiece[] = [];

    // iterates through chessboard layout
    for (let y = 0; y < layout.length; y++) {
      for (let x = 0; x < layout[y].length; x++) {

        // gets char from chessboard layout
        const char = layout[y][x];
        // if char indicates an empty tile
        if (char === '') continue
        // defines rather a chesspiece is black or white
        const black = char === char.toLowerCase();

        switch (char.toLowerCase()) {
          case "p": pieces.push(new Pawn(x, y, black)); break;
          case "r": pieces.push(new Rook(x, y, black)); break;
          case "n": pieces.push(new Knight(x, y, black)); break;
          case "b": pieces.push(new Bishop(x, y, black)); break;
          case "q": pieces.push(new Queen(x, y, black)); break;
          case "k": pieces.push(new King(x, y, black)); break;
        }
      }
    }

    return pieces;
  } // =============================================================================================

    /**
     * DRAWS THE CHESSBOARD BACKGROUND AND HIGHLIGHTS SELECTION
     */
  private drawBoard(): void { // ===================================================================
    // iterates through rows and columns
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {

        // check if this tile is where the selected piece is
        const isSelected = this.selectedPiece && this.selectedPiece.x === col && this.selectedPiece.y === row;

        if (isSelected) {
            // if selected paint the tile golden yellow
          this.ctx.fillStyle = "#ffcc00";
        } else {
            // otherwise, if even : paint it white, if odd : paint it black
          this.ctx.fillStyle = (row + col) % 2 === 0 ? "#BBB" : "#555";
        }

        // draw the tule 
        this.ctx.fillRect(col * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
      }
    }
  } // =============================================================================================

    /**
     * DRAWS THE BOARD AND ALL PIECES
     */
  private render(): void { // ======================================================================
    // clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw the background tiles
    this.drawBoard();
    // draw each piece on the board
    this.pieces.forEach(p => p.render(this.ctx, this.tileSize))
  } // =============================================================================================

    /**
     * TRANSLATES A MOUSE EVENT INTO BOARD COORDINATES
     * 
     * @param {MouseEvent} event - The click or mousemove event on the canvas.
     * @returns {{x: number, y: number}} The tile coordinates on the board.
     */
  private getClickedPosition(event: MouseEvent): { x: number; y: number } { // =====================
    // gets the position and size of the canvas relative to the browser window
    const rect = this.canvas.getBoundingClientRect();
    // account for any css scaling between canvas pixels and screen pixels
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
     // calculate exact tile on the board based on adjusted mouse position
    const x = Math.floor((event.clientX - rect.left) * scaleX / this.tileSize);
    const y = Math.floor((event.clientY - rect.top) * scaleY / this.tileSize);

    return { x, y };
} // =============================================================================================

    /**
     * HANDLES MOVING OR CAPTURING A PIECE IF VALID
     * 
     * @param {number} x - X coordinate of the clicked tile.
     * @param {number} y - Y coordinate of the clicked tile.
     * @param {Chesspiece | undefined} clickedPiece The piece at the destination tile (if any).
     */
  private handleMoveOrCapture(x: number, y: number, clickedPiece: Chesspiece | undefined) : void {
    if (this.selectedPiece && this.selectedPiece.canMoveTo(x, y, this.pieces)) {
      // if selected piece can move to this tile
      this.captureChesspiece(clickedPiece)
      // move the chesspiece to selected tile
      this.selectedPiece.move(x, y);  
    }
    // unselect piece
    this.unselectChesspiece()
  } // =============================================================================================

    /**
     * CHECKS IF IT IS POSSIBLE TO CAPTURE A CHESSPIECE AND DOES IT
     * 
     * @param {Chesspiece | undefined} clickedPiece - The piece that might be captured.
     */
  private captureChesspiece(clickedPiece: Chesspiece | undefined): void {
    if (clickedPiece && clickedPiece.black !== this.selectedPiece!.black) {
        // if the clicked tile is occupied by the opposite team,
        // then capture and remove it from the chesspieces array
        this.pieces.splice(this.pieces.indexOf(clickedPiece), 1);
      }
  }

    /**
     * UNSELECTS A CHESSPIECE AFTER MOVEMENT HAPPENS
     */
  private unselectChesspiece(): void { // ===============================================================
    if (this.selectedPiece) {
        this.selectedPiece.selected = false;
        this.selectedPiece = null;
      }
  } // =============================================================================================

    /**
     * SELECTS A CHESSPIECE WHEN CLICKED
     * 
     * @param {Chesspiece | undefined} clickedPiece - The piece to be selected.
     */
  private selectChesspiece(clickedPiece: Chesspiece | undefined): void { // ====================
    if (clickedPiece) {
      this.selectedPiece = clickedPiece;
      this.selectedPiece.selected = true;
    }
  } // =============================================================================================

    /**
     * MAIN CLICK HANDLER FOR SELECTION, MOVEMENT, AND CAPTURE
     * 
     * @param {MouseEvent} event - The mouse click event on the board.
     */
  private onClick(event: MouseEvent): void { // ====================================================

    const { x, y } = this.getClickedPosition(event);
    const clickedPiece = this.pieces.find((p) => p.x === x && p.y === y);

    if (this.selectedPiece) {
      // if a chesspiece is already selected => handle movement or capture
      this.handleMoveOrCapture(x, y, clickedPiece);

    } else if (clickedPiece) {
      // else, select a chesspiece to be moved
      this.selectChesspiece(clickedPiece);
    }

    // render chessboard again
    this.render();
  } // =============================================================================================
}

export { Chessboard };
