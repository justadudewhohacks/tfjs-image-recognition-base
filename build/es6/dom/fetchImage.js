import { __awaiter, __generator } from "tslib";
import { bufferToImage } from './bufferToImage';
import { fetchOrThrow } from './fetchOrThrow';
export function fetchImage(uri) {
    return __awaiter(this, void 0, void 0, function () {
        var res, blob;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchOrThrow(uri)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, (res).blob()];
                case 2:
                    blob = _a.sent();
                    if (!blob.type.startsWith('image/')) {
                        throw new Error("fetchImage - expected blob type to be of type image/*, instead have: " + blob.type + ", for url: " + res.url);
                    }
                    return [2 /*return*/, bufferToImage(blob)];
            }
        });
    });
}
//# sourceMappingURL=fetchImage.js.map