import vector from './vector';
import matrix from './matrix';
import {tensortype} from '../types/tensor';

export interface tensor {
    type: string;
    // dim: 
    map: (func: Function) => tensor;
};

export default tensor;