abstract class Piece {

    public x: number;
    public y: number;

    public black: boolean;
    public selected: boolean = false;

    public img: string;

    public constructor(type: string, x: number, y: number, black: boolean) {
        this.x = x
        this.y = y
        this.black = black
        this.img = this.getImagePath(type)
    }

    public toggleSelected(): void {
        this.selected = !this.selected
    }

    public abstract move(xClick: number, yClick: number): void

    public abstract render(ctx: CanvasRenderingContext2D, tileSize: number): void

    protected getImagePath(type: string) {
        if (this.black) {
            return `/src/assets/images/${type}1.png`
        } else {
            return `/src/assets/images/${type}.png`
        }
    }

}

export { Piece }