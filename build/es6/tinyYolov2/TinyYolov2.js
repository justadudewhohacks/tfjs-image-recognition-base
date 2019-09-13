import { __assign, __awaiter, __extends, __generator } from "tslib";
import * as tf from '@tensorflow/tfjs-core';
import { BoundingBox } from '../classes/BoundingBox';
import { ObjectDetection } from '../classes/ObjectDetection';
import { convLayer } from '../common';
import { toNetInput } from '../dom';
import { NeuralNetwork } from '../NeuralNetwork';
import { sigmoid } from '../ops';
import { nonMaxSuppression } from '../ops/nonMaxSuppression';
import { normalize } from '../ops/normalize';
import { validateConfig } from './config';
import { convWithBatchNorm } from './convWithBatchNorm';
import { depthwiseSeparableConv } from './depthwiseSeparableConv';
import { extractParams } from './extractParams';
import { extractParamsFromWeigthMap } from './extractParamsFromWeigthMap';
import { leaky } from './leaky';
import { TinyYolov2Options } from './TinyYolov2Options';
var TinyYolov2 = /** @class */ (function (_super) {
    __extends(TinyYolov2, _super);
    function TinyYolov2(config) {
        var _this = _super.call(this, 'TinyYolov2') || this;
        validateConfig(config);
        _this._config = config;
        return _this;
    }
    Object.defineProperty(TinyYolov2.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TinyYolov2.prototype, "withClassScores", {
        get: function () {
            return this.config.withClassScores || this.config.classes.length > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TinyYolov2.prototype, "boxEncodingSize", {
        get: function () {
            return 5 + (this.withClassScores ? this.config.classes.length : 0);
        },
        enumerable: true,
        configurable: true
    });
    TinyYolov2.prototype.runTinyYolov2 = function (x, params) {
        var out = convWithBatchNorm(x, params.conv0);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = convWithBatchNorm(out, params.conv1);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = convWithBatchNorm(out, params.conv2);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = convWithBatchNorm(out, params.conv3);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = convWithBatchNorm(out, params.conv4);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = convWithBatchNorm(out, params.conv5);
        out = tf.maxPool(out, [2, 2], [1, 1], 'same');
        out = convWithBatchNorm(out, params.conv6);
        out = convWithBatchNorm(out, params.conv7);
        return convLayer(out, params.conv8, 'valid', false);
    };
    TinyYolov2.prototype.runMobilenet = function (x, params) {
        var out = this.config.isFirstLayerConv2d
            ? leaky(convLayer(x, params.conv0, 'valid', false))
            : depthwiseSeparableConv(x, params.conv0);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = depthwiseSeparableConv(out, params.conv1);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = depthwiseSeparableConv(out, params.conv2);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = depthwiseSeparableConv(out, params.conv3);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = depthwiseSeparableConv(out, params.conv4);
        out = tf.maxPool(out, [2, 2], [2, 2], 'same');
        out = depthwiseSeparableConv(out, params.conv5);
        out = tf.maxPool(out, [2, 2], [1, 1], 'same');
        out = params.conv6 ? depthwiseSeparableConv(out, params.conv6) : out;
        out = params.conv7 ? depthwiseSeparableConv(out, params.conv7) : out;
        return convLayer(out, params.conv8, 'valid', false);
    };
    TinyYolov2.prototype.forwardInput = function (input, inputSize) {
        var _this = this;
        var params = this.params;
        if (!params) {
            throw new Error('TinyYolov2 - load model before inference');
        }
        return tf.tidy(function () {
            var batchTensor = input.toBatchTensor(inputSize, false).toFloat();
            batchTensor = _this.config.meanRgb
                ? normalize(batchTensor, _this.config.meanRgb)
                : batchTensor;
            batchTensor = batchTensor.div(tf.scalar(256));
            return _this.config.withSeparableConvs
                ? _this.runMobilenet(batchTensor, params)
                : _this.runTinyYolov2(batchTensor, params);
        });
    };
    TinyYolov2.prototype.forward = function (input, inputSize) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.forwardInput;
                        return [4 /*yield*/, toNetInput(input)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent(), inputSize])];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    TinyYolov2.prototype.detect = function (input, forwardParams) {
        if (forwardParams === void 0) { forwardParams = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, inputSize, scoreThreshold, netInput, out, out0, inputDimensions, results, boxes, scores, classScores, classNames, indices, detections;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = new TinyYolov2Options(forwardParams), inputSize = _a.inputSize, scoreThreshold = _a.scoreThreshold;
                        return [4 /*yield*/, toNetInput(input)];
                    case 1:
                        netInput = _b.sent();
                        return [4 /*yield*/, this.forwardInput(netInput, inputSize)];
                    case 2:
                        out = _b.sent();
                        out0 = tf.tidy(function () { return tf.unstack(out)[0].expandDims(); });
                        inputDimensions = {
                            width: netInput.getInputWidth(0),
                            height: netInput.getInputHeight(0)
                        };
                        return [4 /*yield*/, this.extractBoxes(out0, netInput.getReshapedInputDimensions(0), scoreThreshold)];
                    case 3:
                        results = _b.sent();
                        out.dispose();
                        out0.dispose();
                        boxes = results.map(function (res) { return res.box; });
                        scores = results.map(function (res) { return res.score; });
                        classScores = results.map(function (res) { return res.classScore; });
                        classNames = results.map(function (res) { return _this.config.classes[res.label]; });
                        indices = nonMaxSuppression(boxes.map(function (box) { return box.rescale(inputSize); }), scores, this.config.iouThreshold, true);
                        detections = indices.map(function (idx) {
                            return new ObjectDetection(scores[idx], classScores[idx], classNames[idx], boxes[idx], inputDimensions);
                        });
                        return [2 /*return*/, detections];
                }
            });
        });
    };
    TinyYolov2.prototype.getDefaultModelName = function () {
        return '';
    };
    TinyYolov2.prototype.extractParamsFromWeigthMap = function (weightMap) {
        return extractParamsFromWeigthMap(weightMap, this.config);
    };
    TinyYolov2.prototype.extractParams = function (weights) {
        var filterSizes = this.config.filterSizes || TinyYolov2.DEFAULT_FILTER_SIZES;
        var numFilters = filterSizes ? filterSizes.length : undefined;
        if (numFilters !== 7 && numFilters !== 8 && numFilters !== 9) {
            throw new Error("TinyYolov2 - expected 7 | 8 | 9 convolutional filters, but found " + numFilters + " filterSizes in config");
        }
        return extractParams(weights, this.config, this.boxEncodingSize, filterSizes);
    };
    TinyYolov2.prototype.extractBoxes = function (outputTensor, inputBlobDimensions, scoreThreshold) {
        return __awaiter(this, void 0, void 0, function () {
            var width, height, inputSize, correctionFactorX, correctionFactorY, numCells, numBoxes, _a, boxesTensor, scoresTensor, classScoresTensor, results, scoresData, boxesData, row, col, anchor, score, ctX, ctY, width_1, height_1, x, y, pos, _b, classScore, label, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        width = inputBlobDimensions.width, height = inputBlobDimensions.height;
                        inputSize = Math.max(width, height);
                        correctionFactorX = inputSize / width;
                        correctionFactorY = inputSize / height;
                        numCells = outputTensor.shape[1];
                        numBoxes = this.config.anchors.length;
                        _a = tf.tidy(function () {
                            var reshaped = outputTensor.reshape([numCells, numCells, numBoxes, _this.boxEncodingSize]);
                            var boxes = reshaped.slice([0, 0, 0, 0], [numCells, numCells, numBoxes, 4]);
                            var scores = reshaped.slice([0, 0, 0, 4], [numCells, numCells, numBoxes, 1]);
                            var classScores = _this.withClassScores
                                ? tf.softmax(reshaped.slice([0, 0, 0, 5], [numCells, numCells, numBoxes, _this.config.classes.length]), 3)
                                : tf.scalar(0);
                            return [boxes, scores, classScores];
                        }), boxesTensor = _a[0], scoresTensor = _a[1], classScoresTensor = _a[2];
                        results = [];
                        return [4 /*yield*/, scoresTensor.array()];
                    case 1:
                        scoresData = _d.sent();
                        return [4 /*yield*/, boxesTensor.array()];
                    case 2:
                        boxesData = _d.sent();
                        row = 0;
                        _d.label = 3;
                    case 3:
                        if (!(row < numCells)) return [3 /*break*/, 12];
                        col = 0;
                        _d.label = 4;
                    case 4:
                        if (!(col < numCells)) return [3 /*break*/, 11];
                        anchor = 0;
                        _d.label = 5;
                    case 5:
                        if (!(anchor < numBoxes)) return [3 /*break*/, 10];
                        score = sigmoid(scoresData[row][col][anchor][0]);
                        if (!(!scoreThreshold || score > scoreThreshold)) return [3 /*break*/, 9];
                        ctX = ((col + sigmoid(boxesData[row][col][anchor][0])) / numCells) * correctionFactorX;
                        ctY = ((row + sigmoid(boxesData[row][col][anchor][1])) / numCells) * correctionFactorY;
                        width_1 = ((Math.exp(boxesData[row][col][anchor][2]) * this.config.anchors[anchor].x) / numCells) * correctionFactorX;
                        height_1 = ((Math.exp(boxesData[row][col][anchor][3]) * this.config.anchors[anchor].y) / numCells) * correctionFactorY;
                        x = (ctX - (width_1 / 2));
                        y = (ctY - (height_1 / 2));
                        pos = { row: row, col: col, anchor: anchor };
                        if (!this.withClassScores) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.extractPredictedClass(classScoresTensor, pos)];
                    case 6:
                        _c = _d.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        _c = { classScore: 1, label: 0 };
                        _d.label = 8;
                    case 8:
                        _b = _c, classScore = _b.classScore, label = _b.label;
                        results.push(__assign({ box: new BoundingBox(x, y, x + width_1, y + height_1), score: score, classScore: score * classScore, label: label }, pos));
                        _d.label = 9;
                    case 9:
                        anchor++;
                        return [3 /*break*/, 5];
                    case 10:
                        col++;
                        return [3 /*break*/, 4];
                    case 11:
                        row++;
                        return [3 /*break*/, 3];
                    case 12:
                        boxesTensor.dispose();
                        scoresTensor.dispose();
                        classScoresTensor.dispose();
                        return [2 /*return*/, results];
                }
            });
        });
    };
    TinyYolov2.prototype.extractPredictedClass = function (classesTensor, pos) {
        return __awaiter(this, void 0, void 0, function () {
            var row, col, anchor, classesData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        row = pos.row, col = pos.col, anchor = pos.anchor;
                        return [4 /*yield*/, classesTensor.array()];
                    case 1:
                        classesData = _a.sent();
                        return [2 /*return*/, Array(this.config.classes.length).fill(0)
                                .map(function (_, i) { return classesData[row][col][anchor][i]; })
                                .map(function (classScore, label) { return ({
                                classScore: classScore,
                                label: label
                            }); })
                                .reduce(function (max, curr) { return max.classScore > curr.classScore ? max : curr; })];
                }
            });
        });
    };
    TinyYolov2.DEFAULT_FILTER_SIZES = [
        3, 16, 32, 64, 128, 256, 512, 1024, 1024
    ];
    return TinyYolov2;
}(NeuralNetwork));
export { TinyYolov2 };
//# sourceMappingURL=TinyYolov2.js.map