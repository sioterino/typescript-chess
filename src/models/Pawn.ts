import { Piece } from "./Piece";

class Pawn extends Piece {
    constructor(x: number, y: number, black = false) {
        super('pawn', x, y, black);
    }

    canMoveTo(x: number, y: number, pieces: Piece[]): boolean {
        if (this.isSameTeamOccupied(x, y, pieces)) return false;

        const dir = this.black ? 1 : -1;
        const startRow = this.black ? 1 : 6;

        const dx = x - this.x;
        const dy = y - this.y;

        const isBlocked = (x: number, y: number) =>
            pieces.some(p => p.x === x && p.y === y);

        if (dx === 0) {
            if (dy === dir && !isBlocked(x, y)) return true;
            if (this.y === startRow && dy === dir * 2 && !isBlocked(x, y) && !isBlocked(x, y - dir)) return true;
        }

        if (Math.abs(dx) === 1 && dy === dir) {
            const target = pieces.find(p => p.x === x && p.y === y);
            if (target && target.black !== this.black) return true;
        }

        return false;
    }

    render(ctx: CanvasRenderingContext2D, tileSize: number): void {
        const img = new Image();
        img.src = this.img;
        img.onload = () => {
            const size = tileSize * 0.8;
            ctx.drawImage(img, this.x * tileSize + (tileSize - size) / 2, this.y * tileSize + (tileSize - size) / 2, size, size);
        };
    }
}

export { Pawn };
