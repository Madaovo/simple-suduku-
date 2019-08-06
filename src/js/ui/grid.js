"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const suduku_1 = require("../core/suduku");
const checker_1 = require("../core/checker");
class Grid {
    constructor(container) {
        this._$container = container;
    }
    build() {
        const suduku = new suduku_1.Suduku();
        suduku.make();
        const matrix = suduku.puzzleMatrix;
        const rowGroupClasses = ['row_g_top', "row_g_middle", "row_g_bottom"];
        const colGroupClasses = ['col_g_left', "col_g_center", "col_g_right"];
        const $cells = matrix.map(rowValue => rowValue.map((cellValue, colIndex) => {
            return $('<span>')
                .addClass(colGroupClasses[colIndex % 3])
                .addClass(cellValue ? "fixed" : "empty")
                .text(cellValue);
        }));
        const $divArray = $cells.map(($spanArray, rowIndex) => {
            return $('<div class="row">')
                .addClass(rowGroupClasses[rowIndex % 3])
                .append($spanArray);
        });
        this._$container.append($divArray);
    }
    layout() {
        const width = $("span:first", this._$container).width();
        $('span', this._$container).height(width)
            .css({
            "line-height": `${width}px`,
            "font-size": width < 32 ? `${width / 2}px` : ""
        });
    }
    bindPopup(popupNumber) {
        this._$container.on("click", "span", e => {
            const $cell = $(e.target);
            if ($cell.is(".fixed")) {
                return;
            }
            popupNumber.popup($cell);
        });
    }
    check() {
        let data = [];
        const $rows = this._$container.children();
        data = $rows.map((rowIndex, row) => $(row).children()
            .map((cellIndex, span) => parseInt($(span).text()) || 0))
            .toArray().
            map($data => $data.toArray());
        const checker = new checker_1.Checker(data);
        checker.check();
        if (checker.isSuccess) {
            alert("验证成功");
        }
        else {
            const marks = checker.marks;
            this._$container.children()
                .each((rowIndex, div) => {
                $(div).children()
                    .each((colIndex, span) => {
                    if ($(span).is(".fixed") || marks[rowIndex][colIndex]) {
                        $(span).removeClass("error");
                    }
                    else if (!marks[rowIndex][colIndex]) {
                        $(span).addClass("error");
                    }
                });
            });
        }
    }
    clear() {
        this._$container.find("span.error")
            .removeClass("error");
    }
    reset() {
        this._$container.find("span:not('.fixed')")
            .removeClass("mark1 mark2 error")
            .addClass("empty")
            .text(0);
    }
    rebuild() {
        this._$container.empty();
        this.build();
        this.layout();
    }
}
exports.Grid = Grid;
exports.default = Grid;
//# sourceMappingURL=grid.js.map