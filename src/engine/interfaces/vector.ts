export default interface vector {
    /*basic properties*/
    type: string;
    components: number[];
    dim: number;
    /*basic operation*/
    map: (func: Function) => vector;
    /* In-place methods*/
    add: (vector: vector) => vector;
    subtract: (vector: vector) => vector;
    dot: (vector: vector) => number;
    scale: (scaler: number) => vector;
    norm: () => number;
    normalize: () => vector;
    /* Out-of-place methods*/
    _add: (vector: vector) => vector;
    _subtract: (vector: vector) => vector;
    _scale: (scaler: number) => vector;
    _normalize: () => vector;
    /*identifying methods*/
    isEqualTo: (vector: vector) => boolean;
    hasSameDirection: (vector: vector) => boolean;
};