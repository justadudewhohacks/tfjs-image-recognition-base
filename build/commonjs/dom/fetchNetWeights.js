"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fetchOrThrow_1 = require("./fetchOrThrow");
function fetchNetWeights(uri) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = Float32Array.bind;
                    return [4 /*yield*/, fetchOrThrow_1.fetchOrThrow(uri)];
                case 1: return [4 /*yield*/, (_b.sent()).arrayBuffer()];
                case 2: return [2 /*return*/, new (_a.apply(Float32Array, [void 0, _b.sent()]))()];
            }
        });
    });
}
exports.fetchNetWeights = fetchNetWeights;
//# sourceMappingURL=fetchNetWeights.js.map