/* ----------------------------------------------------
Copyright by 2023 S. Choi. All Rights Reserved.
linear-ts: https://www.github.com/virochana/linear-ts
Distributed under the MIT License.
----------------------------------------------------*/

import vector from "../interfaces/vector";
import matrix from "../interfaces/matrix";
import tensor from "../interfaces/tensor";

import { Vector } from "./vector";
import { Matrix } from "./matrix";
import { tensorInputType, tensortype } from "../types/tensor";



export class Tensor implements tensor {

    private _tensor: tensortype; 
    type: string;
    shape: number[];

    constructor(tensor: tensorInputType){
        this.type = "tensor"
        this._tensor = this.tensorizing(tensor)
        this.shape = this.size()
    }
    
    public get tensor(){
        return this._tensor;
    }

    public set tensor(tensor: any){
        this._tensor = tensor;
    };

    public map(func: Function): any{
        this.tensor.map(func())
        return this
    }

    type2array = (tensor: any): any => {
        if (tensor.type === "vector") {
            return tensor.components;
        }
        else if (tensor.type === "matrix") {
            const a = tensor.rows.map((row: { components: any; }) => row.components);
            return a;
        }
        else if (tensor.type === "tensor") {
            return tensor.tensor
        }
    }
    
    private tensorizing(tensor: any): tensortype {
        const iterating = (tensor: any) => 
            tensor.map((t: any) => 
                t.type ? this.type2array(t) : Array.isArray(t) ? iterating(t) : t);
        return typeof(tensor) === "number" ? tensor: iterating(tensor);
    }

    // private sequenceAssertion(tensor: any): tensortype {
    //     tensor.map((t: any) => {

    //     })
    // }
    
    public size(): number[] {
        let shape: any[] = []
        const _iter = (tensor: any) => {
            shape.push(1);
            iterating(tensor);
        }
        const iterating = (tensor: any) => {
            Array.isArray(tensor[0]) ? _iter(tensor[0]) : shape.push(
                Array.isArray(tensor) ? tensor.length : 1
            );
           return shape;
        };
        return iterating(this.tensor);
    }
}

//      sum

//     add(tensor: tensor): tensor {
        
//     }

//     _add(tensor: tensor): tensor {
        
//     }

//     subtract(tensor: tensor): tensor {

//     }

//     _subtract(tensor: tensor): tensor {

//     }

//     scale(scaler: number): tensor {

//     }

//     _scale(scaler: number): tensor {

//     }
    
//     normalize(): tensor {
        
//     }

//     _normalize(): tensor {
        
//     }
    
//     matmul(): tensor {

//     }

//     _matmul(): tensor {
        
//     }

//     transpose(): tensor {

//     }
    
//     _transpose(): tensor {

//     }

//     flatten(): vector {

//     }

//     _flatten(): vector {
        
//     }
    
//     reshape(): tensor {

//     }

//     _reshape(): tensor {

//     }

//     isEqualTo(): boolean {
        
//     }
// }

// export const add;
// export const substract
// export const mul;
// export const normalize
// export const reshape
// export const flatten
// export const isEqual
// export const determinant <= matrix same
// export const scale
// export const norm <= vector is same
// export const isSameDirection <= vector is Same
