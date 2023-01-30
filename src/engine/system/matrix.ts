/* ----------------------------------------------------
Copyright by 2023 S. Choi. All Rights Reserved.
linear-ts: https://www.github.com/virochana/linear-ts
Distributed under the MIT License.
----------------------------------------------------*/

import {sum} from '../utils';
import vector from '../interfaces/vector';
import matrix from '../interfaces/matrix';
import { Vector } from './vector';
import { matrixInputType, matrixtype } from '../types/matrix';

export class Matrix implements matrix {
    
    private _rows: matrixtype
    private _columns: matrixtype
    type: string;
    dim: number[];

    constructor(rows: matrixInputType){
        this.type = "matrix"
        this._rows = this.vectorizing(rows)
        this._columns = this.vectorizing(this.row2columns())
        this.dim = [this.rows.length, this.rows[0].dim]
    }

    public get rows() {
        return this._rows;
    };

    public set rows(rows: any) {
        this._rows = rows;
        this._columns = this.vectorizing(this.row2columns())
    }

    public get columns() {
        return this._columns;
    };

    public set columns(columns: any) {
        this._columns = columns;
        this._rows = this.vectorizing(this.column2row())
    }

    private components(vector: any){
        return vector.components ? vector.components : vector;
    }
    
    private vectorizing(array: matrixInputType): vector[] {
        return array.map((row: any) => {
            if (row.type == "vector") {
                return row;
            } else if (Array.isArray(row)) {
                return new Vector(row)
            }
        })
    }

    private row2columns(): number[][] {
        const rows = this.rows;
        return this.components(rows[0]).map((_: any, i: any) => rows.map((r: any) => this.components(r)[i]))
    }

    private column2row(): number[][] {
        const columns = this.columns;
        return this.components(columns[0]).map((_: any, i: any) => columns.map((r: any) => this.components(r)[i]))
    }

    private dimCheck(matrix: matrix): void {
        console.log(this.dim, matrix.dim)
        if (this.dim[0] != matrix.dim[0] || this.dim[1] != matrix.dim[1]){
           throw Error(`Expected the same dimensions between two matrices. Expected dim of matrix1 (${this.dim[0]}x${this.dim[1]}), but got dim matrix2 (${matrix.dim[0]}x${matrix.dim[1]})`)
        }
    }

    private componentWiseOperation(func: Function, matrix: matrix): matrix {
        matrix.rows.map((row : vector, i: number) => row.map((element: any, j: any) => func(this.components(this.rows[i])[j], element)))
        return this
    }

    private _componentWiseOperation(func: Function, matrix: matrix): matrix {
        const rows = this.rows
        const newRows = (): vector[] => matrix.rows.map((row : vector, i: number) => row.map((element: any, j: any) => func(this.components(rows[i])[j], element)))
        return new Matrix(newRows())
    }

    /**
     * In-place operation of element-wise adding 'input matrix' to 'current matrix'
     * @remark This method is in-place operation.
     * @param matrix - A matrix object which will be added to this matrix object.
     * @returns Return the matrix object
    // */
    add(matrix: matrix): matrix {
        this.dimCheck(matrix)
        return this.componentWiseOperation((a: any, b: any) => a + b, matrix)
    }

    /**
     * Out-of-place operation of element-wise adding 'input matrix' to 'current matrix'
     * @remark This method is out-of-place operation.
     * @param matrix - A matrix object which will be added to this matrix object.
     * @returns Return the matrix object
    // */
    _add(matrix: matrix): matrix {
        this.dimCheck(matrix)
        return this._componentWiseOperation((a: any, b: any) => a + b, matrix)
    }

    /**
     * In-place operation of element-wise subtracting 'current matrix' from 'input matrix'
     * @remark This method is in-place operation.
     * @param matrix - A matrix object which will be subtracted to this matrix object.
    */
    subtract(matrix: matrix): matrix {
        this.dimCheck(matrix)
        return this.componentWiseOperation((a: any, b: any) => a - b, matrix)
    }

    /**
     * Out-of-place operation of element-wise subtracting 'current matrix' from 'input matrix'
     * @remark This method is out-of-place operation.
     * @param matrix - A matrix object which will be subtracted to this matrix object.
    */
    _subtract(matrix: matrix): matrix {
        this.dimCheck(matrix)
        return this._componentWiseOperation((a: any, b: any) => a - b, matrix)
    }

    /**
     * In-place operation of element-wise scaling the matrix with the 'input scaler'
     * @remark This method is in-place operation.
     * @param scaler - A scaler to be used to scale the matrix.
    */
    scale(scaler: number): matrix {
        this.rows = this._rows.map((row: vector) =>
            this.components(row).map((element: any) => element * scaler)
        )
        return this
    }

    /**
     * Out-of-place operation of element-wise scaling the matrix with the 'input scaler'
     * @remark This method is out-of-place operation.
     * @param scaler - A scaler to be used to scale the matrix.
    */
    _scale(scaler: number): matrix {
        const newRows = this.rows.map((row: any) => this.components(row).map((element: any) => element * scaler))
        return new Matrix(newRows)
    }

    /**
     * The in-place inner product operation of the 'current matrix' and the 'input matrix'
     * @remark This method is in-place operation.
     * @remark This method only operate when the n == p, subject to matrix1's dim (m x n) and matrix2's dim (p x q)
     * @param matrix - A matrix object to be dot producted with this matrix.
     * @returns The inner product of 'input matrix' and 'current matrix'.
    */
    matmul(matrix: matrix): matrix {
        if (this.rows[0].dim !== matrix.rows.length) {
          throw new Error(`mat1 and mat2 shapes cannot be multiplied (${this.dim[0]}x${this.dim[1]} and ${matrix.dim[0]}x${matrix.dim[1]})`)
        }
        this.rows = this._rows.map((row: vector) => 
            matrix.columns.map((column: vector) => 
                sum(this.components(row).map((element: number, i: number) => 
                    element * this.components(column)[i]))))
        return this
    }

    /**
     * The out-of-place inner product operation of the 'current matrix' and the 'input matrix'
     * @remark This method is out-of-place operation.
     * @remark This method only operate when the n == p, subject to matrix1's dim (m x n) and matrix2's dim (p x q)
     * @param matrix - A matrix object to be dot producted with this matrix.
     * @returns The inner product of 'input matrix' and 'current matrix'.
    */
    _matmul(matrix: matrix): matrix {
        if (this.rows[0].dim !== matrix.rows.length) {
          throw new Error(`mat1 and mat2 shapes cannot be multiplied (${this.dim[0]}x${this.dim[1]} and ${matrix.dim[0]}x${matrix.dim[1]})`)
        }
        const newRows = this.rows.map((row: vector) => 
                matrix.columns.map((column: vector) => 
                    sum(row.map((element: any, i: any) => element * this.components(column)[i]))))
        return new Matrix(newRows)
    }

    /**
     * The in-place operation of transposing the current matrix.
     * @remark This method is in-place operation.
     * @remark The dimension of the matrix will be reversed. E.g) M x N => N x M
     * @returns The transposed matrix of the current matrix.
    */
    transpose(): matrix {
        this.rows = this.columns
        return this
    }
    
    /**
     * The out-of-place operation of transposing the current matrix.
     * @remark This method is out-of-place operation.
     * @remark The dimension of the matrix will be reversed. E.g) M x N => N x M
     * @returns The transposed matrix of the current matrix.
    */
    _transpose(): matrix {
        return new Matrix(this.columns)
    }
    
    /**
     * Get the determinant of the matrix.
     * @remark The determinant will be computed. E.g) if the matrix = [[1,2],[3,4]], the determinant will be 1x4 - 2x3 = -2
     * @returns The determinant value of the matrix.
    */
    determinant(): number {
        if (this.rows.length !== this.rows[0].dim) {
            throw new Error('Only Square Matrix (m == n at dim(m x n)) can be computed!')
        }
        if (this.rows.length === 2) {
            return this.components(this.rows[0])[0] * this.components(this.rows[1])[1] - this.components(this.rows[0])[1] * this.components(this.rows[1])[0]
        }
        
        const rows = this.rows
        const parts = rows[0].map((coef: any, index: any) => {
            const matrixRows = (): any => 
                rows.slice(1).map((row: any) => 
                    [ ...row.slice(0, index), ...row.slice(index + 1)])
            const matrix = new Matrix(matrixRows())
            const result: any = coef * matrix.determinant()
            return index % 2 === 0 ? result : -result
        })
        return sum(parts)
    }

    /**
     * In-place operation of scaling the row or columns to range between 0 and 1.
     * @param axis - axis to normalize the matrix (0 or 1). If axis = 0, the matrix is normalized by columns. Else axis = 1, the matrix will be normalized by rows.
     * @returns Returns the normalized matrix object.
    */
    normalize(axis: number): matrix {
        if (axis == 0){
            this.columns.map((column: any) => column.normalize())
            this.rows = new Matrix(this.columns).transpose().rows
        } else if (axis == 1) {
            this.rows.map((row: any) => row.normalize())
        }
        return this
    }

    /**
     * Out-of-place operation of normalizing the matrix by its norm.
     * @returns Returns the normalized matrix object.
    */
    _normalize(axis: number): matrix {
        let columns = this.columns;
        let rows = this.rows;

        if (axis == 0){
            columns = columns.map((column: any) => column._normalize())
        } else if (axis == 1) {
            rows = rows.map((row: any) => row._normalize())
        } else {
            throw Error("axis exceeds the limit of dimension (Expected axis of 0 or 1)")
        }
        return axis == 0 ? new Matrix(columns).transpose() : new Matrix(rows)
    }
    
    /**
     * Identifying whether the matrices are the same.
     * @returns Returns true/false of the result.
    */
    isEqualTo(matrix: matrix): boolean {
        return this.rows == matrix.rows && this.columns == matrix.columns
    }

    /**
     * Identifying whether the matrices have the same determinant.
     * @returns Returns true/false of the result.
    */
    hasSameDeterminant(matrix: matrix): boolean {
        return this.determinant() == matrix.determinant()
    }

    //flatten & reshape
}