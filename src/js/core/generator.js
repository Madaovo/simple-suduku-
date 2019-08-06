"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("./toolkit");
class Generator {
    get matrix() {
        return this._matrix;
    }
    generator() {
        while (!this.internalGenerator()) {
        }
    }
    internalGenerator() {
        this._matrix = toolkit_1.Toolkit.getMatrix.makeMatrix();
        this.orders = toolkit_1.Toolkit.getMatrix.makeMatrix()
            .map(row => row.map((v, i) => i))
            .map(row => toolkit_1.Toolkit.getMatrix.shuffle(row));
        for (let i = 1; i <= 9; i++) {
            if (!this.fillNumber(i)) {
                return false;
            }
        }
        return true;
    }
    fillNumber(n) {
        return this.fillRow(n, 0);
    }
    fillRow(n, rowIndex) {
        if (rowIndex > 8) {
            return true;
        }
        const row = this.matrix[rowIndex];
        const orders = this.orders[rowIndex];
        for (let i = 0; i < row.length; i++) {
            const colIndex = orders[i];
            if (row[colIndex]) {
                continue;
            }
            if (!toolkit_1.Toolkit.getMatrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                continue;
            }
            row[colIndex] = n;
            if (!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0;
                continue;
            }
            return true;
        }
        return false;
    }
}
exports.Generator = Generator;
exports.default = Generator;
//# sourceMappingURL=generator.js.map