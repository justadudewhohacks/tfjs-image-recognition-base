import * as tf from '@tensorflow/tfjs-core';
import { env } from '../env';
import { padToSquare } from '../ops/padToSquare';
import { computeReshapedDimensions, isTensor3D, isTensor4D, range } from '../utils';
import { createCanvasFromMedia } from './createCanvas';
import { imageToSquare } from './imageToSquare';
var NetInput = /** @class */ (function () {
    function NetInput(inputs, treatAsBatchInput) {
        var _this = this;
        if (treatAsBatchInput === void 0) { treatAsBatchInput = false; }
        this._imageTensors = [];
        this._canvases = [];
        this._treatAsBatchInput = false;
        this._inputDimensions = [];
        if (!Array.isArray(inputs)) {
            throw new Error("NetInput.constructor - expected inputs to be an Array of TResolvedNetInput or to be instanceof tf.Tensor4D, instead have " + inputs);
        }
        this._treatAsBatchInput = treatAsBatchInput;
        this._batchSize = inputs.length;
        inputs.forEach(function (input, idx) {
            if (isTensor3D(input)) {
                _this._imageTensors[idx] = input;
                _this._inputDimensions[idx] = input.shape;
                return;
            }
            if (isTensor4D(input)) {
                var batchSize = input.shape[0];
                if (batchSize !== 1) {
                    throw new Error("NetInput - tf.Tensor4D with batchSize " + batchSize + " passed, but not supported in input array");
                }
                _this._imageTensors[idx] = input;
                _this._inputDimensions[idx] = input.shape.slice(1);
                return;
            }
            var canvas = input instanceof env.getEnv().Canvas ? input : createCanvasFromMedia(input);
            _this._canvases[idx] = canvas;
            _this._inputDimensions[idx] = [canvas.height, canvas.width, 3];
        });
    }
    Object.defineProperty(NetInput.prototype, "imageTensors", {
        get: function () {
            return this._imageTensors;
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
    Object.defineProperty(NetInput.prototype, "isBatchInput", {
        get: function () {
            return this.batchSize > 1 || this._treatAsBatchInput;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetInput.prototype, "batchSize", {
        get: function () {
            return this._batchSize;
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
    Object.defineProperty(NetInput.prototype, "inputSize", {
        get: function () {
            return this._inputSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetInput.prototype, "reshapedInputDimensions", {
        get: function () {
            var _this = this;
            return range(this.batchSize, 0, 1).map(function (_, batchIdx) { return _this.getReshapedInputDimensions(batchIdx); });
        },
        enumerable: true,
        configurable: true
    });
    NetInput.prototype.getInput = function (batchIdx) {
        return this.canvases[batchIdx] || this.imageTensors[batchIdx];
    };
    NetInput.prototype.getInputDimensions = function (batchIdx) {
        return this._inputDimensions[batchIdx];
    };
    NetInput.prototype.getInputHeight = function (batchIdx) {
        return this._inputDimensions[batchIdx][0];
    };
    NetInput.prototype.getInputWidth = function (batchIdx) {
        return this._inputDimensions[batchIdx][1];
    };
    NetInput.prototype.getReshapedInputDimensions = function (batchIdx) {
        if (typeof this.inputSize !== 'number') {
            throw new Error('getReshapedInputDimensions - inputSize not set, toBatchTensor has not been called yet');
        }
        var width = this.getInputWidth(batchIdx);
        var height = this.getInputHeight(batchIdx);
        return computeReshapedDimensions({ width: width, height: height }, this.inputSize);
    };
    /**
     * Create a batch tensor from all input canvases and tensors
     * with size [batchSize, inputSize, inputSize, 3].
     *
     * @param inputSize Height and width of the tensor.
     * @param isCenterImage (optional, default: false) If true, add an equal amount of padding on
     * both sides of the minor dimension oof the image.
     * @returns The batch tensor.
     */
    NetInput.prototype.toBatchTensor = function (inputSize, isCenterInputs) {
        var _this = this;
        if (isCenterInputs === void 0) { isCenterInputs = true; }
        this._inputSize = inputSize;
        return tf.tidy(function () {
            var inputTensors = range(_this.batchSize, 0, 1).map(function (batchIdx) {
                var input = _this.getInput(batchIdx);
                if (input instanceof tf.Tensor) {
                    var imgTensor = isTensor4D(input) ? input : input.expandDims();
                    imgTensor = padToSquare(imgTensor, isCenterInputs);
                    if (imgTensor.shape[1] !== inputSize || imgTensor.shape[2] !== inputSize) {
                        imgTensor = tf.image.resizeBilinear(imgTensor, [inputSize, inputSize]);
                    }
                    return imgTensor.as3D(inputSize, inputSize, 3);
                }
                if (input instanceof env.getEnv().Canvas) {
                    return tf.browser.fromPixels(imageToSquare(input, inputSize, isCenterInputs));
                }
                throw new Error("toBatchTensor - at batchIdx " + batchIdx + ", expected input to be instanceof tf.Tensor or instanceof HTMLCanvasElement, instead have " + input);
            });
            var batchTensor = tf.stack(inputTensors.map(function (t) { return t.toFloat(); })).as4D(_this.batchSize, inputSize, inputSize, 3);
            return batchTensor;
        });
    };
    return NetInput;
}());
export { NetInput };
//# sourceMappingURL=NetInput.js.map