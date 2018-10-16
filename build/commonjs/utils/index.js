"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("@tensorflow/tfjs-core");
var Dimensions_1 = require("../classes/Dimensions");
var Point_1 = require("../classes/Point");
function isTensor(tensor, dim) {
    return tensor instanceof tf.Tensor && tensor.shape.length === dim;
}
exports.isTensor = isTensor;
function isTensor1D(tensor) {
    return isTensor(tensor, 1);
}
exports.isTensor1D = isTensor1D;
function isTensor2D(tensor) {
    return isTensor(tensor, 2);
}
exports.isTensor2D = isTensor2D;
function isTensor3D(tensor) {
    return isTensor(tensor, 3);
}
exports.isTensor3D = isTensor3D;
function isTensor4D(tensor) {
    return isTensor(tensor, 4);
}
exports.isTensor4D = isTensor4D;
function isFloat(num) {
    return num % 1 !== 0;
}
exports.isFloat = isFloat;
function isEven(num) {
    return num % 2 === 0;
}
exports.isEven = isEven;
function round(num, prec) {
    if (prec === void 0) { prec = 2; }
    var f = Math.pow(10, prec);
    return Math.floor(num * f) / f;
}
exports.round = round;
function isDimensions(obj) {
    return obj && obj.width && obj.height;
}
exports.isDimensions = isDimensions;
function computeReshapedDimensions(_a, inputSize) {
    var width = _a.width, height = _a.height;
    var scale = inputSize / Math.max(height, width);
    return new Dimensions_1.Dimensions(Math.round(width * scale), Math.round(height * scale));
}
exports.computeReshapedDimensions = computeReshapedDimensions;
function getCenterPoint(pts) {
    return pts.reduce(function (sum, pt) { return sum.add(pt); }, new Point_1.Point(0, 0))
        .div(new Point_1.Point(pts.length, pts.length));
}
exports.getCenterPoint = getCenterPoint;
function range(num, start, step) {
    return Array(num).fill(0).map(function (_, i) { return start + (i * step); });
}
exports.range = range;
function isValidNumber(num) {
    return !!num && num !== Infinity && num !== -Infinity && !isNaN(num) || num === 0;
}
exports.isValidNumber = isValidNumber;
function isValidProbablitiy(num) {
    return isValidNumber(num) && 0 <= num && num <= 1.0;
}
exports.isValidProbablitiy = isValidProbablitiy;
//# sourceMappingURL=index.js.map