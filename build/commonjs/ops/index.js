"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
tslib_1.__exportStar(require("./iou"), exports);
tslib_1.__exportStar(require("./nonMaxSuppression"), exports);
tslib_1.__exportStar(require("./normalize"), exports);
tslib_1.__exportStar(require("./padToSquare"), exports);
tslib_1.__exportStar(require("./shuffleArray"), exports);
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}
exports.sigmoid = sigmoid;
function inverseSigmoid(x) {
    return Math.log(x / (1 - x));
}
exports.inverseSigmoid = inverseSigmoid;
//# sourceMappingURL=index.js.map