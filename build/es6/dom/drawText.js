import { getDefaultDrawOptions } from './getDefaultDrawOptions';
export function drawText(ctx, x, y, text, options) {
    if (options === void 0) { options = {}; }
    var drawOptions = Object.assign(getDefaultDrawOptions(), options);
    var padText = 2 + drawOptions.lineWidth;
    ctx.fillStyle = drawOptions.textColor;
    ctx.font = drawOptions.fontSize + "px " + drawOptions.fontStyle;
    ctx.fillText(text, x + padText, y + padText + (drawOptions.fontSize * 0.6));
}
//# sourceMappingURL=drawText.js.map