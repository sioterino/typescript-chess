import { Piece } from "./Piece";

class Pawn extends Piece {
    constructor(x: number, y: number, black: boolean = false) {
        super('pawn', x, y, black);
    }

    public move(xClick: number, yClick: number): void {
        const xTarget = Math.floor(xClick);
        const yTarget = Math.floor(yClick);
        const direction = this.black ? 1 : -1;

        if (xTarget === this.x && yTarget === this.y + direction) {
            this.y = yTarget;
        }
    }

    public render(ctx: CanvasRenderingContext2D, tileSize: number): void {
        const img = new Image();
        img.src = this.img;
        img.onload = () => {
            const size = tileSize * 0.8;
            ctx.drawImage(img, this.x * tileSize + (tileSize - size) / 2, this.y * tileSize + (tileSize - size) / 2, size, size);
        };
    }
}

export { Pawn };
