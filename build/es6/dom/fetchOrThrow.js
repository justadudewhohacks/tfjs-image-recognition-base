import { __awaiter, __generator } from "tslib";
import { env } from '../env';
export function fetchOrThrow(url, init) {
    return __awaiter(this, void 0, void 0, function () {
        var fetch, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fetch = env.getEnv().fetch;
                    return [4 /*yield*/, fetch(url, init)];
                case 1:
                    res = _a.sent();
                    if (!(res.status < 400)) {
                        throw new Error("failed to fetch: (" + res.status + ") " + res.statusText + ", from url: " + res.url);
                    }
                    return [2 /*return*/, res];
            }
        });
    });
}
//# sourceMappingURL=fetchOrThrow.js.map