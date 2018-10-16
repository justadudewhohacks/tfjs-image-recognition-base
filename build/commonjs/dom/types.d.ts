import * as tf from '@tensorflow/tfjs-core';
import { NetInput } from './NetInput';
export declare type TMediaElement = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;
export declare type TResolvedNetInput = TMediaElement | tf.Tensor3D | tf.Tensor4D;
export declare type TNetInputArg = string | TResolvedNetInput;
export declare type TNetInput = TNetInputArg | Array<TNetInputArg> | NetInput | tf.Tensor4D;
export declare type DrawBoxOptions = {
    lineWidth?: number;
    color?: string;
};
export declare type DrawTextOptions = {
    lineWidth?: number;
    fontSize?: number;
    fontStyle?: string;
    textColor?: string;
};
export declare type DrawDetectionOptions = {
    lineWidth?: number;
    fontSize?: number;
    fontStyle?: string;
    textColor?: string;
    boxColor?: string;
    withScore?: boolean;
    withClassName?: boolean;
};
export declare type DrawOptions = {
    lineWidth: number;
    fontSize: number;
    fontStyle: string;
    textColor: string;
    boxColor: string;
    withScore: boolean;
    withClassName: boolean;
};
