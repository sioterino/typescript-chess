import { newElement } from "../utils/DOM";

const canvas = newElement('canvas', {
    attr: { id: 'chessboard', width: "300", height: "300" }
})

export { canvas }