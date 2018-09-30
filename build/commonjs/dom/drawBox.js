"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getDefaultDrawOptions_1 = require("./getDefaultDrawOptions");
function drawBox(ctx, x, y, w, h, options) {
    var drawOptions = Object.assign(getDefaultDrawOptions_1.getDefaultDrawOptions(), (options || {}));
    ctx.strokeStyle = drawOptions.boxColor;
    ctx.lineWidth = drawOptions.lineWidth;
    ctx.strokeRect(x, y, w, h);
}
exports.drawBox = drawBox;
//# sourceMappingURL=drawBox.js.map