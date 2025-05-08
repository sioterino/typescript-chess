abstract class Piece {

    public x: number;
    public y: number;

    public black: boolean;
    public selected: boolean = false;
    
    public img: string;

    constructor(name: string, x: number, y: number, black: boolean = false) {
        this.x = x;
        this.y = y;
        this.black = black;
        this.img = `/src/assets/images/${name}${black ? '1' : ''}.png`;
    }

    public abstract canMoveTo(x: number, y: number, pieces: Piece[]): boolean;

    public isSameTeamOccupied(x: number, y: number, pieces: Piece[]): boolean {
        const piece = pieces.find(p => p.x === x && p.y === y);
        return piece ? piece.black === this.black : false;
    }

    public move(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public abstract render(ctx: CanvasRenderingContext2D, tileSize: number): void;
}

export { Piece };
