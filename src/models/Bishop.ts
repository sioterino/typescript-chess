import { Piece } from "./Piece";
import { isPathClear } from "../utils/utils";

class Bishop extends Piece {
    constructor(x: number, y: number, black = false) {
        super('bishop', x, y, black);
    }

    canMoveTo(x: number, y: number, pieces: Piece[]): boolean {
        if (this.isSameTeamOccupied(x, y, pieces)) return false;
        
        if (Math.abs(this.x - x) !== Math.abs(this.y - y)) return false;

        return isPathClear(this.x, this.y, x, y, pieces);
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

export { Bishop };
