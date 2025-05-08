import { Piece } from "./Piece";

class Bishop extends Piece {

    public constructor(x: number, y: number, black: boolean = false) {
        super('bishop', x, y, black)
    }

    public move(xClick: number, yClick: number): void {
        const xTarget = Math.floor(xClick)
        const yTarget = Math.floor(yClick)

        if (Math.abs(this.x - xTarget) === Math.abs(this.y - yTarget)) {
            this.x = xTarget
            this.y = yTarget
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

export { Bishop }