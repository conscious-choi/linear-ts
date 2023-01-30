import vector from "../interfaces/vector"
import matrix from "../interfaces/matrix"
import tensor from "../interfaces/tensor"

import { Vector } from "../system/vector"
import { Matrix } from "../system/matrix"
// import { Tensor } from "../system/tensor"

export const sum = (arr: any): any => {
    arr.reduce((acc: any, value: any) => acc + value, 0)
}

// export const broadcast = (sourceTensor: any, targetSource: any): tensor => {
//     // convert inputs to tensor type if not
//     // broadcast by expanding the target tensor.
// }