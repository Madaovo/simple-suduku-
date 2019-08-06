import {Suduku} from "../core/suduku"
import {Checker} from "../core/checker";
import PopupNumber from "./popupnumber";

export class Grid {

    private _$container:JQuery

    constructor(container:JQuery) {
        this._$container = container
    }

    build() {
        const suduku = new Suduku()
        suduku.make()
        const matrix = suduku.puzzleMatrix

        const rowGroupClasses = ['row_g_top', "row_g_middle", "row_g_bottom"]
        const colGroupClasses = ['col_g_left', "col_g_center", "col_g_right"]

        const $cells = matrix.map(rowValue =>
            rowValue.map((cellValue, colIndex) => {
                return $('<span>')
                    .addClass(colGroupClasses[colIndex % 3])
                    .addClass(cellValue ? "fixed" : "empty")
                    .text(cellValue)
            }))
        const $divArray = $cells.map(($spanArray, rowIndex) => {
            return $('<div class="row">')
                .addClass(rowGroupClasses[rowIndex % 3])
                .append($spanArray)
        })
        this._$container.append($divArray)
    }

    layout() {
        const width = $("span:first", this._$container).width()
        $('span', this._$container).height(width)
            .css({
                "line-height": `${width}px`,
                "font-size": width < 32 ? `${width / 2}px` : ""
            })
    }

    bindPopup(popupNumber:PopupNumber) {
        this._$container.on("click", "span", e => {
            const $cell = $(e.target)
            if ($cell.is(".fixed")){
                return
            }
            popupNumber.popup($cell)
        })
    }

    /*
    * 检查数独正确性，并标记错误的位置
    * */
    check() {
        let data = [];
        const $rows = this._$container.children()
        data = $rows.map((rowIndex, row) =>
            $(row).children()
                .map((cellIndex, span) => parseInt($(span).text(),10) || 0))
            .toArray().
            map($data=>$data.toArray())
        const checker = new Checker(data);
        checker.check()
        if (checker.isSuccess) {
            alert("验证成功")
        } else {
            const marks = checker.marks
            this._$container.children()
                .each((rowIndex,div)=>{
                    $(div).children()
                        .each((colIndex,span)=>{
                            if ($(span).is(".fixed") || marks[rowIndex][colIndex]){
                                $(span).removeClass("error")
                            } else if (!marks[rowIndex][colIndex]){
                                $(span).addClass("error")
                            }
                        })
                })
        }
    }

    /*
    * 清理错误标记
    * */
    clear() {
        this._$container.find("span.error")
            .removeClass("error")
    }

    /*
    * 将数独重置到初始状态
    * */
    reset() {
        this._$container.find("span:not('.fixed')")
            .removeClass("mark1 mark2 error")
            .addClass("empty")
            .text(0)
    }

    rebuild() {
        this._$container.empty()
        this.build()
        this.layout()
    }
}

export default Grid