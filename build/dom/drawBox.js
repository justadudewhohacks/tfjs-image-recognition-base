import { getDefaultDrawOptions } from './getDefaultDrawOptions';
export function drawBox(ctx, x, y, w, h, options) {
    var drawOptions = Object.assign(getDefaultDrawOptions(), (options || {}));
    ctx.strokeStyle = drawOptions.boxColor;
    ctx.lineWidth = drawOptions.lineWidth;
    ctx.strokeRect(x, y, w, h);
}
//# sourceMappingURL=drawBox.js.map