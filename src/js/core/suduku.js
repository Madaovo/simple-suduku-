"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = require("./generator");
class Suduku {
    constructor() {
        const generator = new generator_1.Generator();
        generator.generator();
        this._solutionMatrix = generator.matrix;
    }
    get puzzleMatrix() {
        return this._puzzleMatrix;
    }
    make(level = 4) {
        this._puzzleMatrix = this._solutionMatrix.map(row => row.map(cell => {
            return (Math.random() * 9) < level ? 0 : cell;
        }));
    }
}
exports.Suduku = Suduku;
exports.default = Suduku;
//# sourceMappingURL=suduku.js.map