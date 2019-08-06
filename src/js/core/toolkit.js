"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matrixToolkit = {
    makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v);
        return array;
    },
    makeMatrix(v = 0) {
        return Array.from({ length: 9 }, () => this.makeRow(v));
    },
    shuffle(array) {
        const endIndex = array.length - 2;
        for (let i = 0; i < endIndex; i++) {
            let j = i + Math.floor(Math.random() * (array.length - i));
            [array[j], array[i]] = [array[i], array[j]];
        }
        return array;
    },
    checkFillable(matrix, n, rowIndex, colIndex) {
        const row = matrix[rowIndex];
        const column = matrix.map((v, i) => matrix[i][colIndex]);
        const { boxIndex } = boxToolkit.covertToBoxIndex(rowIndex, colIndex);
        const box = boxToolkit.getBoxCells(matrix, boxIndex);
        for (let i = 0; i < 9; i++) {
            if (row[i] === n || column[i] === n || box[i] === n)
                return false;
        }
        return true;
    }
};
const boxToolkit = {
    getBoxCells(matrix, boxIndex) {
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = Math.floor(boxIndex % 3) * 3;
        const result = [];
        for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            const colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    },
    covertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },
    coverFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    }
};
class Toolkit {
    static get getMatrix() {
        return matrixToolkit;
    }
    static get getBoxToolkit() {
        return boxToolkit;
    }
}
exports.Toolkit = Toolkit;
exports.default = Toolkit;
//# sourceMappingURL=toolkit.js.map