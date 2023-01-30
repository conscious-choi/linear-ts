import vector from './vector';

export interface matrix {
    // basic properties
    type: string;
    rows: vector[];
    columns: vector[];
    dim: number[]
    
    // In-place methods
    add: (matrix: matrix) => matrix;
    subtract: (matrix: matrix) => matrix;
    scale: (scaler: number) => matrix;
    normalize: (axis: number) => matrix;
    transpose: () => matrix;

    // Out-of-place methods
    _add: (matrix: matrix) => matrix;
    _subtract: (matrix: matrix) => matrix;
    _scale: (scaler: number) => matrix;
    _normalize: (axis: number) => matrix;
    _transpose: () => matrix;

    // determinant
    determinant: () => number;

    // identifying methods
    isEqualTo: (matrix: matrix) => boolean;
    hasSameDeterminant: (matrix: matrix) => boolean;
}

export default matrix;