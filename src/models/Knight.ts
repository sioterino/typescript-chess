import { Piece } from "./Piece";

class Knight extends Piece {
    constructor(x: number, y: number, black = false) {
        super('knight', x, y, black);
    }

    canMoveTo(x: number, y: number, pieces: Piece[]): boolean {
        if (this.isSameTeamOccupied(x, y, pieces)) return false;

        const dx = Math.abs(this.x - x);
        const dy = Math.abs(this.y - y);
        return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
    }

    render(ctx: CanvasRenderingContext2D, tileSize: number): void {
        const img = new Image();
        img.src = this.img;

        img.onload = () => {
            const size = tileSize * 0.8;
            ctx.drawImage(img, this.x * tileSize + (tileSize - size) / 2, this.y * tileSize + (tileSize - size) / 2, size, size);
        };

        img.onerror = () => {
            console.error(`Failed to load image: ${this.img}`);
        };
    }
}

export { Knight };
