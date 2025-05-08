import { Login } from "./models/Credential";
import { Storage } from "./utils/Storage";

import { Piece } from "./models/Piece";
import { Bishop } from './models/Bishop';
import { Pawn } from "./models/Pawn";
import { Rook } from "./models/Rook";
import { Knight } from "./models/Knight";
import { Queen } from "./models/Queen";
import { King } from "./models/King";

const session = Storage.loadFromSessionStorage('type-chess:session');
if (!session) window.location.href = "public/login.html";

const login = new Login();
document.querySelector('#logout')?.addEventListener('click', login.logout);

const canvas = document.getElementById('chessboard') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const tileSize = canvas.width / 8;

function drawBoard(selectedPiece: Piece | null) {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const isSelected = selectedPiece && selectedPiece.x === col && selectedPiece.y === row;

            if (isSelected) {
                ctx.fillStyle = '#ffcc00'; // highlight color
            } else {
                ctx.fillStyle = (row + col) % 2 === 0 ? '#BBB' : '#555';
            }

            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }
}


function loadPiecesFromLayout(layout: string[][]): Piece[] {
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

const pieces = loadPiecesFromLayout(layout);


let selectedPiece: Piece | null = null;

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBoard(selectedPiece);

    for (const piece of pieces) {
        piece.render(ctx, tileSize);
    }
}


canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / tileSize);
    const y = Math.floor((event.clientY - rect.top) / tileSize);

    const clickedPiece = pieces.find(p => p.x === x && p.y === y);

    if (selectedPiece) {
        // Try move or capture
        if (clickedPiece && clickedPiece.black !== selectedPiece.black) {
            // Capture
            pieces.splice(pieces.indexOf(clickedPiece), 1);
            selectedPiece.move(x, y);
            selectedPiece.selected = false;
            selectedPiece = null;
        } else if (!clickedPiece) {
            // Move to empty square
            selectedPiece.move(x, y);
            selectedPiece.selected = false;
            selectedPiece = null;
        } else {
            // Clicked own piece again
            selectedPiece.selected = false;
            selectedPiece = null;
        }
    } else if (clickedPiece) {
        // Select a piece
        selectedPiece = clickedPiece;
        selectedPiece.selected = true;
    }

    render();
});


render();
