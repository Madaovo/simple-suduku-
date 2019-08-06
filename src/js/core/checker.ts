function checkArray(array: Array<number>) {
    let length = array.length;
    const marks: boolean[] = new Array(length)
    marks.fill(true)

    for (let i = 0; i < length; i++) {

        if (!marks[i]) {
            continue
        }

        const v = array[i]

        //检查是否有效 0 - 无效， 1- 9 有效
        if (v === 0 || v < 1 || v > 9) {
            marks[i] = false
            continue
        }
        //检查重复
        for (let j = i + 1; j < length; j++) {
            if (array[j] === v) {
                marks[i] = marks[j] = false
                continue
            }
        }
    }
    return marks
}

import {Toolkit} from "./toolkit"

/*
* 输入: matrix ,用户完成的9x9数独
* 处理，对行，列，宫进行检查
* 输出marks
* */
export class Checker {

    private _matrix: number[][]
    private _marks:boolean[][]
    private _success: boolean = false

    constructor(matrix: number[][]) {
        this._matrix = matrix
        /*this._matrix = [ [ 6, 4, 9, 7, 5, 8, 1, 2, 3 ],
            [ 3, 5, 8, 1, 2, 9, 6, 7, 4 ],
            [ 7, 1, 2, 4, 3, 6, 5, 8, 9 ],
            [ 4, 3, 5, 6, 9, 7, 8, 1, 2 ],
            [ 8, 6, 7, 2, 4, 1, 3, 9, 5 ],
            [ 2, 9, 1, 3, 8, 5, 7, 4, 6 ],
            [ 1, 2, 6, 5, 7, 4, 9, 3, 8 ],
            [ 9, 7, 4, 8, 6, 3, 2, 5, 1 ],
            [ 5, 8, 3, 9, 1, 2, 4, 6, 7 ] ]*/
        this._marks = Toolkit.getMatrix.makeMatrix(true)
    }

    get marks() :boolean[][]{
        return this._marks
    }

    get isSuccess() :boolean{
        return this._success
    }

    check() :boolean{
        this.checkRow()
        this.checkCol()
        this.checkBox()
        this._success = this._matrix.every(row => row.every(mark => Boolean(mark)))
        return this._success

    }

    private checkRow() :void{
        for (let i = 0, length = this._matrix.length; i < length; i++) {
            const row = this._matrix[i]
            const mark = checkArray(row)
            for (let j = 0; j < mark.length; j++) {
                if (!mark[j]) {
                    this._marks[i][j] = false
                }
            }
        }
    }

    private checkCol() :void{
        for (let i = 0, length = this._matrix.length; i < length; i++) {
            const column = this._matrix.map((v, colIndex) => this._matrix[colIndex][i])
            const mark = checkArray(column)
            for (let j = 0, length = mark.length; j < length; j++) {
                if (!mark[j]) {
                    this._marks[j][i] = false
                }
            }
        }
    }

    private checkBox() :void{
        for (let boxIndex = 0, length = this._matrix.length; boxIndex < length; boxIndex++) {
            const box = Toolkit.getBoxToolkit.getBoxCells(this._matrix, boxIndex)
            const mark = checkArray(box)
            for (let cellIndex = 0, length = mark.length; cellIndex < length; cellIndex++) {
                if (!mark[cellIndex]) {
                    const {rowIndex, colIndex} = Toolkit.getBoxToolkit.coverFromBoxIndex(boxIndex, cellIndex)
                    this._marks[rowIndex][colIndex] = false
                }
            }
        }
    }
}

export default Checker