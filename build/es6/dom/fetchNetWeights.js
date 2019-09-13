import { __awaiter, __generator } from "tslib";
import { fetchOrThrow } from './fetchOrThrow';
export function fetchNetWeights(uri) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = Float32Array.bind;
                    return [4 /*yield*/, fetchOrThrow(uri)];
                case 1: return [4 /*yield*/, (_b.sent()).arrayBuffer()];
                case 2: return [2 /*return*/, new (_a.apply(Float32Array, [void 0, _b.sent()]))()];
            }
        });
    });
}
//# sourceMappingURL=fetchNetWeights.js.map