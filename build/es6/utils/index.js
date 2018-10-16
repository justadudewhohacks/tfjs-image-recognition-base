import * as tf from '@tensorflow/tfjs-core';
import { Dimensions } from '../classes/Dimensions';
import { Point } from '../classes/Point';
export function isTensor(tensor, dim) {
    return tensor instanceof tf.Tensor && tensor.shape.length === dim;
}
export function isTensor1D(tensor) {
    return isTensor(tensor, 1);
}
export function isTensor2D(tensor) {
    return isTensor(tensor, 2);
}
export function isTensor3D(tensor) {
    return isTensor(tensor, 3);
}
export function isTensor4D(tensor) {
    return isTensor(tensor, 4);
}
export function isFloat(num) {
    return num % 1 !== 0;
}
export function isEven(num) {
    return num % 2 === 0;
}
export function round(num, prec) {
    if (prec === void 0) { prec = 2; }
    var f = Math.pow(10, prec);
    return Math.floor(num * f) / f;
}
export function isDimensions(obj) {
    return obj && obj.width && obj.height;
}
export function computeReshapedDimensions(_a, inputSize) {
    var width = _a.width, height = _a.height;
    var scale = inputSize / Math.max(height, width);
    return new Dimensions(Math.round(width * scale), Math.round(height * scale));
}
export function getCenterPoint(pts) {
    return pts.reduce(function (sum, pt) { return sum.add(pt); }, new Point(0, 0))
        .div(new Point(pts.length, pts.length));
}
export function range(num, start, step) {
    return Array(num).fill(0).map(function (_, i) { return start + (i * step); });
}
export function isValidNumber(num) {
    return !!num && num !== Infinity && num !== -Infinity && !isNaN(num) || num === 0;
}
export function isValidProbablitiy(num) {
    return isValidNumber(num) && 0 <= num && num <= 1.0;
}
//# sourceMappingURL=index.js.map