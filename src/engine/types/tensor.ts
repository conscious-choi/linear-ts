import vector from '../interfaces/vector';
import matrix from '../interfaces/matrix';
import tensor from '../interfaces/tensor';

type tensorInputType = 
   number
 | number[]
 | number[][]
 | number[][][]
 | number[][][][]
 | number[][][][][]
 | vector
 | vector[]
 | vector[][]
 | vector[][][]
 | vector[][][][]
 | matrix
 | matrix[]
 | matrix[][]
 | matrix[][][]
 | tensor
 | tensor[]
 | tensor[][]

type tensortype = 
   number
 | number[]
 | number[][]
 | number[][][]
 | number[][][][]
 | number[][][][][]

export {tensorInputType, tensortype}