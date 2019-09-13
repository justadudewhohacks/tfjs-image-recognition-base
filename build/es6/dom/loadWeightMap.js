import { __awaiter, __generator } from "tslib";
import * as tf from '@tensorflow/tfjs-core';
import { getModelUris } from '../common/getModelUris';
import { fetchJson } from './fetchJson';
export function loadWeightMap(uri, defaultModelName) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, manifestUri, modelBaseUri, manifest;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getModelUris(uri, defaultModelName), manifestUri = _a.manifestUri, modelBaseUri = _a.modelBaseUri;
                    return [4 /*yield*/, fetchJson(manifestUri)];
                case 1:
                    manifest = _b.sent();
                    return [2 /*return*/, tf.io.loadWeights(manifest, modelBaseUri)];
            }
        });
    });
}
//# sourceMappingURL=loadWeightMap.js.map