"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var env_1 = require("../env");
function fetchOrThrow(url, init) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var fetch, res;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fetch = env_1.env.getEnv().fetch;
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
exports.fetchOrThrow = fetchOrThrow;
//# sourceMappingURL=fetchOrThrow.js.map