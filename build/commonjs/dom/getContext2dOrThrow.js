"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getContext2dOrThrow(canvas) {
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('canvas 2d context is null');
    }
    return ctx;
}
exports.getContext2dOrThrow = getContext2dOrThrow;
//# sourceMappingURL=getContext2dOrThrow.js.map