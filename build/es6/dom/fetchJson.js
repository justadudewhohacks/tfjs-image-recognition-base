import * as tslib_1 from "tslib";
import { fetchOrThrow } from './fetchOrThrow';
export function fetchJson(uri) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchOrThrow(uri)];
                case 1: return [2 /*return*/, (_a.sent()).json()];
            }
        });
    });
}
//# sourceMappingURL=fetchJson.js.map