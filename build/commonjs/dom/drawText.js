"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getDefaultDrawOptions_1 = require("./getDefaultDrawOptions");
function drawText(ctx, x, y, text, options) {
    if (options === void 0) { options = {}; }
    var drawOptions = Object.assign(getDefaultDrawOptions_1.getDefaultDrawOptions(), options);
    var padText = 2 + drawOptions.lineWidth;
    ctx.fillStyle = drawOptions.textColor;
    ctx.font = drawOptions.fontSize + "px " + drawOptions.fontStyle;
    ctx.fillText(text, x + padText, y + padText + (drawOptions.fontSize * 0.6));
}
exports.drawText = drawText;
//# sourceMappingURL=drawText.js.map