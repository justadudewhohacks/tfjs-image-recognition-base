"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fetchOrThrow_1 = require("./fetchOrThrow");
function fetchJson(uri) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchOrThrow_1.fetchOrThrow(uri)];
                case 1: return [2 /*return*/, (_a.sent()).json()];
            }
        });
    });
}
exports.fetchJson = fetchJson;
//# sourceMappingURL=fetchJson.js.map