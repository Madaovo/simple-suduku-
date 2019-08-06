/*
* 1.生成初始的数组
* 2.随机去除一些空
* */
import {Generator} from './generator'

export class Suduku {

    private _solutionMatrix:number[][]
    private _puzzleMatrix:number[][]

    constructor() {
        const generator = new Generator()
        generator.generator()
        this._solutionMatrix = generator.matrix
    }

    get puzzleMatrix():number[][]{
        return this._puzzleMatrix
    }

    make(level:number = 4) {
        this._puzzleMatrix = this._solutionMatrix.map(row => row.map(cell => {
            return (Math.random() * 9) < level ? 0 : cell
        }))
    }
}
export default Suduku