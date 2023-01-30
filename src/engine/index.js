import React from 'react';
import { Matrix } from './system/matrix';
import { Vector } from './system/vector';
import { Tensor } from './system/tensor';

import Plane from '../space/plane/index.js';

export const Engine = ({}) => {
    const a = new Matrix([new Vector([1,4]), new Vector([2,3])])
    const b = new Matrix([new Vector([1,4]), new Vector([2,3])])
    const c = new Tensor([a, b])
    let _ = c.tensor
    console.log(c.tensor)
    return (
        <div style={{width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{width: '80%', height: '80%'}}>
                <Plane />
            </div>
        </div>
    )
};

export default Engine;