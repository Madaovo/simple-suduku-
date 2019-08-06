"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkArray(array) {
    let length = array.length;
    const marks = new Array(length);
    marks.fill(true);
    for (let i = 0; i < length; i++) {
        if (!marks[i]) {
            continue;
        }
        const v = array[i];
        if (v === 0 || v < 1 || v > 9) {
            marks[i] = false;
            continue;
        }
        for (let j = i + 1; j < length; j++) {
            if (array[j] === v) {
                marks[i] = marks[j] = false;
                continue;
            }
        }
    }
    return marks;
}
const toolkit_1 = require("./toolkit");
class Checker {
    constructor(matrix) {
        this._matrix = matrix;
        this._marks = toolkit_1.Toolkit.getMatrix.makeMatrix(true);
    }
    get marks() {
        return this._marks;
    }
    get isSuccess() {
        return this._success;
    }
    check() {
        this.checkRow();
        this.checkCol();
        this.checkBox();
        this._success = this._matrix.every(row => row.every(mark => mark));
        return this._success;
    }
    checkRow() {
        for (let i = 0, length = this._matrix.length; i < length; i++) {
            const row = this._matrix[i];
            const mark = checkArray(row);
            for (let j = 0; j < mark.length; j++) {
                if (!mark[j]) {
                    this._marks[i][j] = false;
                }
            }
        }
    }
    checkCol() {
        for (let i = 0, length = this._matrix.length; i < length; i++) {
            const column = this._matrix.map((v, colIndex) => this._matrix[colIndex][i]);
            const mark = checkArray(column);
            for (let j = 0, length = mark.length; j < length; j++) {
                if (!mark[j]) {
                    this._marks[j][i] = false;
                }
            }
        }
    }
    checkBox() {
        for (let boxIndex = 0, length = this._matrix.length; boxIndex < length; boxIndex++) {
            const box = toolkit_1.Toolkit.getBoxToolkit.getBoxCells(this._matrix, boxIndex);
            const mark = checkArray(box);
            for (let cellIndex = 0, length = mark.length; cellIndex < length; cellIndex++) {
                if (!mark[cellIndex]) {
                    const { rowIndex, colIndex } = toolkit_1.Toolkit.getBoxToolkit.coverFromBoxIndex(boxIndex, cellIndex);
                    this._marks[rowIndex][colIndex] = false;
                }
            }
        }
    }
}
exports.Checker = Checker;
exports.default = Checker;
//# sourceMappingURL=checker.js.map