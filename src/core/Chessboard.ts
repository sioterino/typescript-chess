import { Piece } from "../models/Piece";
import { Bishop } from '../models/Bishop';
import { Pawn } from "../models/Pawn";
import { Rook } from "../models/Rook";
import { Knight } from "../models/Knight";
import { Queen } from "../models/Queen";
import { King } from "../models/King";

class Chessboard {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private tileSize: number;
    private pieces: Piece[];

    private selectedPiece: Piece | null = null;

    constructor(canvasId: string) {

        this.canvas = document.querySelector(`#${canvasId}`) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.tileSize = this.canvas.width / 8;

        const layout = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ];

        this.pieces = this.loadPiecesFromLayout(layout);

        this.render();

        this.canvas.addEventListener('click', (event) => this.onClick(event));
    }

    private loadPiecesFromLayout(layout: string[][]): Piece[] {
        const pieces: Piece[] = [];

        for (let y = 0; y < layout.length; y++) {
            for (let x = 0; x < layout[y].length; x++) {
                const char = layout[y][x];
                const black = char === char.toLowerCase();

                switch (char.toLowerCase()) {
                    case 'p': pieces.push(new Pawn(x, y, black)); break;
                    case 'r': pieces.push(new Rook(x, y, black)); break;
                    case 'n': pieces.push(new Knight(x, y, black)); break;
                    case 'b': pieces.push(new Bishop(x, y, black)); break;
                    case 'q': pieces.push(new Queen(x, y, black)); break;
                    case 'k': pieces.push(new King(x, y, black)); break;
                }
            }
        }

        return pieces;
    }

    private drawBoard() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const isSelected = this.selectedPiece && this.selectedPiece.x === col && this.selectedPiece.y === row;

                if (isSelected) {
                    this.ctx.fillStyle = '#ffcc00'; // highlight color
                } else {
                    this.ctx.fillStyle = (row + col) % 2 === 0 ? '#BBB' : '#555';
                }

                this.ctx.fillRect(col * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }

    private render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawBoard();

        for (const piece of this.pieces) {
            piece.render(this.ctx, this.tileSize);
        }
    }

    private getClickedPosition(event: MouseEvent): { x: number, y: number } {

        const rect = this.canvas.getBoundingClientRect();

        const x = Math.floor((event.clientX - rect.left) / this.tileSize);
        const y = Math.floor((event.clientY - rect.top) / this.tileSize);

        return { x, y };
    }

    private handleMoveOrCapture(x: number, y: number, clickedPiece: Piece | undefined) {
        if (this.selectedPiece && this.selectedPiece.canMoveTo(x, y, this.pieces)) {
            if (clickedPiece && clickedPiece.black !== this.selectedPiece.black) {
                this.pieces.splice(this.pieces.indexOf(clickedPiece), 1);
            }
    
            this.selectedPiece.move(x, y);
            this.selectedPiece.selected = false;
            this.selectedPiece = null;

        } else {
            this.handleInvalidMove();
        }
    }
    

    private handleInvalidMove() {
        if (this.selectedPiece) {
            this.selectedPiece.selected = false;
            this.selectedPiece = null;
        }
    }

    private handlePieceSelection(clickedPiece: Piece | undefined) {
        if (clickedPiece) {
            this.selectedPiece = clickedPiece;
            this.selectedPiece.selected = true;
        }
    }

    private renderAfterClick() {
        this.render();
    }

    private onClick(event: MouseEvent) {
        const { x, y } = this.getClickedPosition(event);

        const clickedPiece = this.pieces.find(p => p.x === x && p.y === y);

        if (this.selectedPiece) {
            // move or capture
            this.handleMoveOrCapture(x, y, clickedPiece);
            
        } else if (clickedPiece) {
            // select piece
            this.handlePieceSelection(clickedPiece);
        }

        this.renderAfterClick();
    }
}

export { Chessboard }