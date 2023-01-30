/* ----------------------------------------------------
Copyright by 2023 S. Choi. All Rights Reserved.
linear-ts: https://www.github.com/virochana/linear-ts
Distributed under the MIT License.
----------------------------------------------------*/

import vector from '../interfaces/vector';
import vectortype from '../types/vector';

export class Vector implements vector {

    type: string;
    components: vectortype;
    dim: number;

    constructor(components: vectortype){
        this.type = "vector"
        this.components = components
        this.dim = components.length
    }

    dimCheck(vector: vector): void {
        if (this.dim != vector.dim){
           throw Error(`Expected the same dimensions between two vectors. Vector1 dim: ${this.dim}, but got Vector2 dim: ${vector.dim} (expected ${this.dim} dim)`)
        }
    }

    map(func: Function): vector {
        this.components.map(func())
        return this
    }

    /**
     * In-place operation of adding 'input vector' to 'current vector'
     * @remark This method is in-place operation.
     * @param vector - A vector object which will be added to this vector object.
     * @returns Return the vector object
    */
    add(vector: vector): vector {
        this.dimCheck(vector)
        vector.components.map((component, index) => this.components[index] + component)
        return this
    }

    /**
     * Out-of-place operation of adding 'input vector' to 'current vector'
     * @remark This method is out-of-place operation.
     * @param vector - A vector object which will be added to this vector object.
     * @returns Return the vector object
    */
    _add(vector: vector): vector {
        this.dimCheck(vector)
        let components = this.components
        vector.components.map((component, index) => components[index] + component)
        return new Vector(components);
    }


    /**
     * In-place operation of subtracting 'current vector' from 'input vector'
     * @remark This method is in-place operation.
     * @param vector - A vector object which will be subtracted to this vector object.
    */
    subtract(vector: vector): vector {
        this.dimCheck(vector)
        vector.components.map((component, index) => this.components[index] - component)
        return this
    }

    /**
     * Out-of-place operation of subtracting 'current vector' from 'input vector'
     * @remark This method is out-of-place operation.
     * @param vector - A vector object which will be subtracted to this vector object.
    */
    _subtract(vector: vector): vector {
        this.dimCheck(vector)
        let components = this.components;
        vector.components.map((component, index) => components[index] - component)
        return new Vector(components);
    }
    

    /**
     * The dot product of the 'current vector' and the 'input vector'
     * @remark This method only operate with same dim of the vectors.
     * @param vector - A vector object to be dot producted with this vector.
     * @returns The dot product of 'input vector' and 'current vector'.
    */
    dot(vector: vector): number {
        this.dimCheck(vector)
        return vector.components.reduce((acc, component, index) => acc + component * this.components[index], 0)

    }


    /**
     * Get the Euclidean Norm (Euclidean Length) of the vector
     * @returns The length of the vector.
    */
    norm(): number {
        return Math.hypot(...this.components)
    }


    /**
     * In-place operation of scaling the vector with the 'input scaler'
     * @remark This method is in-place operation.
     * @param scaler - A scaler to be used to scale the vector.
    */
    scale(scaler: number): vector {
        this.components = this.components.map(component => component * scaler);
        return this
    }

    /**
     * Out-of-place operation of scaling the vector with the 'input scaler'
     * @remark This method is out-of-place operation.
     * @param scaler - A scaler to be used to scale the vector.
    */
    _scale(scaler: number): vector {
        let components = this.components;
        components = this.components.map(component => component * scaler);
        return new Vector(components);
    }


    /**
     * In-place operation of normalizing the vector by its norm.
     * @returns Returns the normalized vector object.
    */
    normalize(): vector {
        this.scale(1 / this.norm())
        return this
    }

    /**
     * Out-of-place operation of normalizing the vector by its norm.
     * @returns Returns the normalized vector object.
    */
    _normalize(): vector {
        let vector = this._scale(1 / this.norm())
        return vector
    }
    
    /**
     * Identifying whether the vectors are the same.
     * @returns Returns true/false of the result.
    */
    isEqualTo(vector: vector): boolean {
        return vector.components === this.components
    }

    /**
     * Identifying whether the vectors have the same direction.
     * @returns Returns true/false of the result.
    */
    hasSameDirection(vector: vector): boolean {
        this.dimCheck(vector)
        let sourceNormalized = this._normalize()
        let targetNormalized = vector._normalize()
        return sourceNormalized.components === targetNormalized.components
    }
}

/**
 * Check whether the dimensions of two vectors are the same
 * @returns Returns true/false of the result.
*/
export const dimCheck = (vector1: vector, vector2: vector): void => {
    if (vector1.dim != vector2.dim){
       throw Error(`Expected the same dimensions between two vectors. Vector1 dim: ${vector1.dim}, but got Vector2 dim: ${vector2.dim} (expected ${vector1.dim} dim)`)
    }
}

/**
 * Get the Euclidean Norm (Euclidean Length) of the vector
 * @returns The length of the vector.
*/
export const norm = (vector: vector): number => {
    return Math.hypot(...vector.components)
}

/**
 * Identifying whether the vectors are the same.
 * @returns Returns true/false of the result.
*/
export const isEqual = (vector1: vector, vector2: vector): boolean => {
    return vector1.components === vector2.components;
}

/**
 * Identifying whether the vectors have the same direction.
 * @returns Returns true/false of the result.
*/
export const isSameDirection = (vector1: vector, vector2: vector): boolean => {
    let sourceNormalized = vector1.normalize()
    let targetNormalized = vector2.normalize()
    return sourceNormalized.components === targetNormalized.components
}

/**
 * Adding the 'vector1' to 'vector2'
 * @param vector1, vector2 - Vector objects to be added.
*/
export const add = (vector1: vector, vector2: vector): vector => {
    let components = vector1.components.map((component, index) => vector2.components[index] + component)
    return new Vector(components);
}


/**
 * Subtracting the 'vector1' with 'vector2'
 * @param vector1, vector2 - Vector objects to be subtracted one from another.
*/
export const subtract = (vector1: vector, vector2: vector): vector => {
    let components = vector1.components.map((component, index) => vector2.components[index] - component)
    return new Vector(components);
}


/**
 * Dot producting with two vectors
 * @remark This method only operate with same dim of the vectors.
 * @param vector1, vector2 - Vector objects to be dot producted.
 * @returns The dot product of 'vector1' and 'vector2'.
*/
export const dot = (vector1: vector, vector2: vector): number => {
    if (vector1.dim === vector2.dim){
        return vector1.components.reduce((acc, component, index) => acc + component * vector2.components[index], 0)
    } else {
        throw Error("Dimensions of the two vectors are not same")
    }
}


/**
 * Get the Euclidean Norm (Euclidean Length) of the vector.
 * @returns Returns the length of the vector.
*/
export const length = (vector: vector): number => {
    return Math.hypot(...vector.components)
}


/**
 * Scales the vector with the scaler
 * @param scaler - A scaler to be used to scale the vector.
 * @returns Returns the scaled vector
*/
export const scale = (vector: vector, scaler: number): vector => {
    let components = vector.components.map(component => component * scaler);
    return new Vector(components);
}


/**
 * Normalize the Vector by its norm
 * @param vector - A vector to be normalized
 * @returns Returns the normalized vector.
 */
export const normalize = (vector: vector): vector => {
    let components = vector.components.map(component => component / vector.norm());
    return new Vector(components)
}

export * as Vectors from './vector';