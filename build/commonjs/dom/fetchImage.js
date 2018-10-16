"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var bufferToImage_1 = require("./bufferToImage");
var fetchOrThrow_1 = require("./fetchOrThrow");
function fetchImage(uri) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res, blob;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchOrThrow_1.fetchOrThrow(uri)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, (res).blob()];
                case 2:
                    blob = _a.sent();
                    if (!blob.type.startsWith('image/')) {
                        throw new Error("fetchImage - expected blob type to be of type image/*, instead have: " + blob.type + ", for url: " + res.url);
                    }
                    return [2 /*return*/, bufferToImage_1.bufferToImage(blob)];
            }
        });
    });
}
exports.fetchImage = fetchImage;
//# sourceMappingURL=fetchImage.js.map