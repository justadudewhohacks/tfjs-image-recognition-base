import * as tf from '@tensorflow/tfjs-core';
import { Point } from '../classes/Point';
import { padToSquare } from '../ops/padToSquare';
import { isTensor3D, isTensor4D } from '../utils';
import { computeReshapedDimensions } from '../utils';
import { createCanvasFromMedia } from './createCanvas';
var NetInput = /** @class */ (function () {
    function NetInput(inputs, isBatchInput, keepCanvases) {
        if (isBatchInput === void 0) { isBatchInput = false; }
        if (keepCanvases === void 0) { keepCanvases = false; }
        var _this = this;
        this._inputs = [];
        this._canvases = [];
        this._isManaged = false;
        this._isBatchInput = false;
        this._inputDimensions = [];
        this._paddings = [];
        if (isTensor4D(inputs)) {
            this._inputs = tf.unstack(inputs);
        }
        if (Array.isArray(inputs)) {
            this._inputs = inputs.map(function (input, idx) {
                if (isTensor3D(input)) {
                    // TODO: make sure not to dispose original tensors passed in by the user
                    return tf.clone(input);
                }
                if (isTensor4D(input)) {
                    var shape = input.shape;
                    var batchSize = shape[0];
                    if (batchSize !== 1) {
                        throw new Error("NetInput - tf.Tensor4D with batchSize " + batchSize + " passed, but not supported in input array");
                    }
                    return input.reshape(shape.slice(1));
                }
                var canvas = input instanceof HTMLCanvasElement ? input : createCanvasFromMedia(input);
                if (keepCanvases) {
                    _this._canvases[idx] = canvas;
                }
                return tf.fromPixels(canvas);
            });
        }
        this._isBatchInput = this.batchSize > 1 || isBatchInput;
        this._inputDimensions = this._inputs.map(function (t) { return t.shape; });
    }
    Object.defineProperty(NetInput.prototype, "inputs", {
        get: function () {
            return this._inputs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetInput.prototype, "canvases", {
        get: function () {
            return this._canvases;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetInput.prototype, "isManaged", {
        get: function () {
            return this._isManaged;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetInput.prototype, "isBatchInput", {
        get: function () {
            return this._isBatchInput;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetInput.prototype, "batchSize", {
        get: function () {
            return this._inputs.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetInput.prototype, "inputDimensions", {
        get: function () {
            return this._inputDimensions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetInput.prototype, "paddings", {
        get: function () {
            return this._paddings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetInput.prototype, "inputSize", {
        get: function () {
            return this._inputSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetInput.prototype, "relativePaddings", {
        get: function () {
            var _this = this;
            return Array(this.inputs.length).fill(0).map(function (_, batchIdx) { return _this.getRelativePaddings(batchIdx); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetInput.prototype, "reshapedInputDimensions", {
        get: function () {
            var _this = this;
            return Array(this.inputs.length).fill(0).map(function (_, batchIdx) { return _this.getReshapedInputDimensions(batchIdx); });
        },
        enumerable: true,
        configurable: true
    });
    NetInput.prototype.getInputDimensions = function (batchIdx) {
        return this._inputDimensions[batchIdx];
    };
    NetInput.prototype.getInputHeight = function (batchIdx) {
        return this._inputDimensions[batchIdx][0];
    };
    NetInput.prototype.getInputWidth = function (batchIdx) {
        return this._inputDimensions[batchIdx][1];
    };
    NetInput.prototype.getPaddings = function (batchIdx) {
        return this._paddings[batchIdx];
    };
    NetInput.prototype.getRelativePaddings = function (batchIdx) {
        return new Point((this.getPaddings(batchIdx).x + this.getInputWidth(batchIdx)) / this.getInputWidth(batchIdx), (this.getPaddings(batchIdx).y + this.getInputHeight(batchIdx)) / this.getInputHeight(batchIdx));
    };
    NetInput.prototype.getReshapedInputDimensions = function (batchIdx) {
        if (typeof this.inputSize !== 'number') {
            throw new Error('getReshapedInputDimensions - inputSize not set, toBatchTensor has not been called yet');
        }
        var width = this.getInputWidth(batchIdx);
        var height = this.getInputHeight(batchIdx);
        return computeReshapedDimensions({ width: width, height: height }, this.inputSize);
    };
    NetInput.prototype.toBatchTensor = function (inputSize, isCenterInputs) {
        var _this = this;
        if (isCenterInputs === void 0) { isCenterInputs = true; }
        this._inputSize = inputSize;
        return tf.tidy(function () {
            var inputTensors = _this._inputs.map(function (inputTensor) {
                var _a = inputTensor.shape, originalHeight = _a[0], originalWidth = _a[1];
                var imgTensor = inputTensor.expandDims().toFloat();
                imgTensor = padToSquare(imgTensor, isCenterInputs);
                var _b = imgTensor.shape.slice(1), heightAfterPadding = _b[0], widthAfterPadding = _b[1];
                if (heightAfterPadding !== inputSize || widthAfterPadding !== inputSize) {
                    imgTensor = tf.image.resizeBilinear(imgTensor, [inputSize, inputSize]);
                }
                _this._paddings.push(new Point(widthAfterPadding - originalWidth, heightAfterPadding - originalHeight));
                return imgTensor;
            });
            var batchTensor = tf.stack(inputTensors).as4D(_this.batchSize, inputSize, inputSize, 3);
            if (_this.isManaged) {
                _this.dispose();
            }
            return batchTensor;
        });
    };
    /**
     *  By setting the isManaged flag, all newly created tensors will be
     *  automatically disposed after the batch tensor has been created
     */
    NetInput.prototype.managed = function () {
        this._isManaged = true;
        return this;
    };
    NetInput.prototype.dispose = function () {
        this._inputs.forEach(function (t) { return t.dispose(); });
    };
    return NetInput;
}());
export { NetInput };
//# sourceMappingURL=NetInput.js.map