export interface IBookCoord {
    boxIndex:number,
    cellIndex:number
}
export interface IRowColCoord {
    rowIndex:number,
    colIndex:number
}
/*宫坐标系*/
const boxToolkit = {

    //获取九宫格的数据
    getBoxCells(matrix: number[][], boxIndex: number):number[] {
        const startRowIndex = Math.floor(boxIndex / 3) * 3
        const startColIndex = Math.floor(boxIndex % 3) * 3
        const result = []
        for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor(cellIndex / 3)
            const colIndex = startColIndex + cellIndex % 3
            result.push(matrix[rowIndex][colIndex])
        }
        return result
    },

    covertToBoxIndex(rowIndex: number, colIndex: number):IBookCoord {
        //rowIndex:4,colIndex:6 boxIndex:5,cellIndex:3
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        }
    },
    coverFromBoxIndex(boxIndex: number, cellIndex: number) :IRowColCoord{
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        }
    }
}
class MatrixToolkit {

    static makeRow(): number[];
    static makeRow<T>(v: T): T[];
    static makeRow(v: any = 0): any[] {
        const array = new Array(9)
        array.fill(v)
        return array
    }


    static makeMatrix():number[][];
    static makeMatrix<T>(v:T):T[][]
    static makeMatrix(v: any = 0): any[][] {
        return Array.from({length: 9}, () => this.makeRow(v))
    }


    /*
    * Fisher-Yates 洗牌算法
    * */
    static shuffle<T>(array:T[]):T[] {
        const endIndex = array.length - 2
        for (let i = 0; i < endIndex; i++) {
            let j = i + Math.floor(Math.random() * (array.length - i));
            [array[j], array[i]] = [array[i], array[j]]
        }
        return array;
    }


    static checkFillable<T>(matrix: number[][], n: number, rowIndex: number, colIndex: number):boolean {
        const row = matrix[rowIndex]
        const column = matrix.map((v, i) => matrix[i][colIndex])
        const {boxIndex} = boxToolkit.covertToBoxIndex(rowIndex, colIndex);
        const box = boxToolkit.getBoxCells(matrix, boxIndex)
        for (let i = 0; i < 9; i++) {
            if (row[i] === n || column[i] === n || box[i] === n)
                return false
        }
        return true;
    }
}

export class Toolkit {
    /*
    * 矩阵和数组相关的工具
    * */
    static get getMatrix() :typeof MatrixToolkit{
        return MatrixToolkit
    }

    /*
    * 宫坐标相关的
    * */
    static get getBoxToolkit() {
        return boxToolkit
    }
}

export default Toolkit
