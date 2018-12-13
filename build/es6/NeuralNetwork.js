import * as tslib_1 from "tslib";
import * as tf from '@tensorflow/tfjs-core';
import { getModelUris } from './common/getModelUris';
import { loadWeightMap } from './dom';
import { env } from './env';
var NeuralNetwork = /** @class */ (function () {
    function NeuralNetwork(_name) {
        this._name = _name;
        this._params = undefined;
        this._paramMappings = [];
    }
    Object.defineProperty(NeuralNetwork.prototype, "params", {
        get: function () { return this._params; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NeuralNetwork.prototype, "paramMappings", {
        get: function () { return this._paramMappings; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NeuralNetwork.prototype, "isLoaded", {
        get: function () { return !!this.params; },
        enumerable: true,
        configurable: true
    });
    NeuralNetwork.prototype.getParamFromPath = function (paramPath) {
        var _a = this.traversePropertyPath(paramPath), obj = _a.obj, objProp = _a.objProp;
        return obj[objProp];
    };
    NeuralNetwork.prototype.reassignParamFromPath = function (paramPath, tensor) {
        var _a = this.traversePropertyPath(paramPath), obj = _a.obj, objProp = _a.objProp;
        obj[objProp].dispose();
        obj[objProp] = tensor;
    };
    NeuralNetwork.prototype.getParamList = function () {
        var _this = this;
        return this._paramMappings.map(function (_a) {
            var paramPath = _a.paramPath;
            return ({
                path: paramPath,
                tensor: _this.getParamFromPath(paramPath)
            });
        });
    };
    NeuralNetwork.prototype.getTrainableParams = function () {
        return this.getParamList().filter(function (param) { return param.tensor instanceof tf.Variable; });
    };
    NeuralNetwork.prototype.getFrozenParams = function () {
        return this.getParamList().filter(function (param) { return !(param.tensor instanceof tf.Variable); });
    };
    NeuralNetwork.prototype.variable = function () {
        var _this = this;
        this.getFrozenParams().forEach(function (_a) {
            var path = _a.path, tensor = _a.tensor;
            _this.reassignParamFromPath(path, tensor.variable());
        });
    };
    NeuralNetwork.prototype.freeze = function () {
        var _this = this;
        this.getTrainableParams().forEach(function (_a) {
            var path = _a.path, variable = _a.tensor;
            var tensor = tf.tensor(variable.dataSync());
            variable.dispose();
            _this.reassignParamFromPath(path, tensor);
        });
    };
    NeuralNetwork.prototype.dispose = function (throwOnRedispose) {
        if (throwOnRedispose === void 0) { throwOnRedispose = true; }
        this.getParamList().forEach(function (param) {
            if (throwOnRedispose && param.tensor.isDisposed) {
                throw new Error("param tensor has already been disposed for path " + param.path);
            }
            param.tensor.dispose();
        });
        this._params = undefined;
    };
    NeuralNetwork.prototype.serializeParams = function () {
        return new Float32Array(this.getParamList()
            .map(function (_a) {
            var tensor = _a.tensor;
            return Array.from(tensor.dataSync());
        })
            .reduce(function (flat, arr) { return flat.concat(arr); }));
    };
    NeuralNetwork.prototype.load = function (weightsOrUrl) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (weightsOrUrl instanceof Float32Array) {
                            this.extractWeights(weightsOrUrl);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.loadFromUri(weightsOrUrl)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NeuralNetwork.prototype.loadFromUri = function (uri) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var weightMap;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (uri && typeof uri !== 'string') {
                            throw new Error(this._name + ".loadFromUri - expected model uri");
                        }
                        return [4 /*yield*/, loadWeightMap(uri, this.getDefaultModelName())];
                    case 1:
                        weightMap = _a.sent();
                        this.loadFromWeightMap(weightMap);
                        return [2 /*return*/];
                }
            });
        });
    };
    NeuralNetwork.prototype.loadFromDisk = function (filePath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var readFile, _a, manifestUri, modelBaseUri, fetchWeightsFromDisk, loadWeights, manifest, _b, _c, weightMap;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (filePath && typeof filePath !== 'string') {
                            throw new Error(this._name + ".loadFromDisk - expected model file path");
                        }
                        readFile = env.getEnv().readFile;
                        _a = getModelUris(filePath, this.getDefaultModelName()), manifestUri = _a.manifestUri, modelBaseUri = _a.modelBaseUri;
                        fetchWeightsFromDisk = function (filePaths) { return Promise.all(filePaths.map(function (filePath) { return readFile(filePath).then(function (buf) { return buf.buffer; }); })); };
                        loadWeights = tf.io.weightsLoaderFactory(fetchWeightsFromDisk);
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, readFile(manifestUri)];
                    case 1:
                        manifest = _c.apply(_b, [(_d.sent()).toString()]);
                        return [4 /*yield*/, loadWeights(manifest, modelBaseUri)];
                    case 2:
                        weightMap = _d.sent();
                        this.loadFromWeightMap(weightMap);
                        return [2 /*return*/];
                }
            });
        });
    };
    NeuralNetwork.prototype.loadFromWeightMap = function (weightMap) {
        var _a = this.extractParamsFromWeigthMap(weightMap), paramMappings = _a.paramMappings, params = _a.params;
        this._paramMappings = paramMappings;
        this._params = params;
    };
    NeuralNetwork.prototype.extractWeights = function (weights) {
        var _a = this.extractParams(weights), paramMappings = _a.paramMappings, params = _a.params;
        this._paramMappings = paramMappings;
        this._params = params;
    };
    NeuralNetwork.prototype.traversePropertyPath = function (paramPath) {
        if (!this.params) {
            throw new Error("traversePropertyPath - model has no loaded params");
        }
        var result = paramPath.split('/').reduce(function (res, objProp) {
            if (!res.nextObj.hasOwnProperty(objProp)) {
                throw new Error("traversePropertyPath - object does not have property " + objProp + ", for path " + paramPath);
            }
            return { obj: res.nextObj, objProp: objProp, nextObj: res.nextObj[objProp] };
        }, { nextObj: this.params });
        var obj = result.obj, objProp = result.objProp;
        if (!obj || !objProp || !(obj[objProp] instanceof tf.Tensor)) {
            throw new Error("traversePropertyPath - parameter is not a tensor, for path " + paramPath);
        }
        return { obj: obj, objProp: objProp };
    };
    return NeuralNetwork;
}());
export { NeuralNetwork };
//# sourceMappingURL=NeuralNetwork.js.map