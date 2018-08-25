import * as tslib_1 from "tslib";
import * as tf from '@tensorflow/tfjs-core';
import { getModelUris } from '../common/getModelUris';
export function loadWeightMap(uri, defaultModelName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, manifestUri, modelBaseUri, manifest;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getModelUris(uri, defaultModelName), manifestUri = _a.manifestUri, modelBaseUri = _a.modelBaseUri;
                    return [4 /*yield*/, fetch(manifestUri)];
                case 1: return [4 /*yield*/, (_b.sent()).json()];
                case 2:
                    manifest = _b.sent();
                    return [2 /*return*/, tf.io.loadWeights(manifest, modelBaseUri)];
            }
        });
    });
}
//# sourceMappingURL=loadWeightMap.js.map