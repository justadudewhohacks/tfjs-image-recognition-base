import { Point } from '../classes/Point';
import { Dimensions } from '../classes/types';
export declare function isTensor(tensor: any, dim: number): boolean;
export declare function isTensor1D(tensor: any): boolean;
export declare function isTensor2D(tensor: any): boolean;
export declare function isTensor3D(tensor: any): boolean;
export declare function isTensor4D(tensor: any): boolean;
export declare function isFloat(num: number): boolean;
export declare function isEven(num: number): boolean;
export declare function round(num: number, prec?: number): number;
export declare function isDimensions(obj: any): boolean;
export declare function computeReshapedDimensions({ width, height }: Dimensions, inputSize: number): {
    height: number;
    width: number;
};
export declare function getCenterPoint(pts: Point[]): Point;
