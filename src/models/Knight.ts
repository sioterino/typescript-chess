import { Piece } from "./Piece";

class Knight extends Piece {
    constructor(x: number, y: number, black: boolean = false) {
        super('knight', x, y, black);
    }

    public move(xClick: number, yClick: number): void {
        const dx = Math.abs(this.x - Math.floor(xClick));
        const dy = Math.abs(this.y - Math.floor(yClick));

        if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) {
            this.x = Math.floor(xClick);
            this.y = Math.floor(yClick);
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

export { Knight };
