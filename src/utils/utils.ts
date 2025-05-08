import { Piece } from "../models/Piece";

function isPathClear(fromX: number, fromY: number, toX: number, toY: number, pieces: Piece[]): boolean {
    const dx = toX - fromX;
    const dy = toY - fromY;

    const stepX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
    const stepY = dy === 0 ? 0 : dy > 0 ? 1 : -1;

    let x = fromX + stepX;
    let y = fromY + stepY;

    while (x !== toX || y !== toY) {
        if (pieces.some(p => p.x === x && p.y === y)) return false;
        x += stepX;
        y += stepY;
    }

    return true;
}

export { isPathClear };
