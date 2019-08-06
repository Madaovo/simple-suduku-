//生成数独的解决方案
import {Toolkit} from "./toolkit"

export class Generator {

    private _matrix:number[][]
    private orders:number[][]

    get matrix():number[][]{
        return this._matrix
    }

    generator(){
        while (!this.internalGenerator()){
        }
    }

    internalGenerator() {
        this._matrix = Toolkit.getMatrix.makeMatrix()
        this.orders = Toolkit.getMatrix.makeMatrix()
            .map(row => row.map((v:any, i:number) => i))
            .map(row => Toolkit.getMatrix.shuffle(row))
        for (let i = 1; i <= 9; i++) {
            if (!this.fillNumber(i)){
                return false
            }
        }
        return true
    }

    private fillNumber(n:number) {
        return  this.fillRow(n, 0)
    }

    private fillRow(n:number, rowIndex:number) {
        if (rowIndex > 8) {
            return true;
        }
        //获取行
        const row = this.matrix[rowIndex]
        const orders = this.orders[rowIndex]
        for (let i = 0; i < row.length; i++) {
            const colIndex = orders[i];
            if (row[colIndex]) {
                //已经填过了
                continue
            }
            //检查是否可以填
            if (!Toolkit.getMatrix.checkFillable(this.matrix,n,rowIndex,colIndex)) {
                continue
            }
            //可填
            row[colIndex] = n
            if (!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0
                continue
            }
            return true
        }
        return false
    }
}
export default Generator