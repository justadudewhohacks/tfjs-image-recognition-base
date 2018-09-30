"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tf = require("@tensorflow/tfjs-core");
var getModelUris_1 = require("../common/getModelUris");
function loadWeightMap(uri, defaultModelName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, manifestUri, modelBaseUri, manifest;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getModelUris_1.getModelUris(uri, defaultModelName), manifestUri = _a.manifestUri, modelBaseUri = _a.modelBaseUri;
                    return [4 /*yield*/, fetch(manifestUri)];
                case 1: return [4 /*yield*/, (_b.sent()).json()];
                case 2:
                    manifest = _b.sent();
                    return [2 /*return*/, tf.io.loadWeights(manifest, modelBaseUri)];
            }
        });
    });
}
exports.loadWeightMap = loadWeightMap;
//# sourceMappingURL=loadWeightMap.js.map