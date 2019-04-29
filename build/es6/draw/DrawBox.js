import { Box } from '../classes';
import { getContext2dOrThrow } from '../dom/getContext2dOrThrow';
import { AnchorPosition, DrawTextField, DrawTextFieldOptions } from './DrawTextField';
var DrawBoxOptions = /** @class */ (function () {
    function DrawBoxOptions(options) {
        if (options === void 0) { options = {}; }
        var boxColor = options.boxColor, lineWidth = options.lineWidth, label = options.label, drawLabelOptions = options.drawLabelOptions;
        this.boxColor = boxColor || 'rgba(0, 0, 255, 1)';
        this.lineWidth = lineWidth || 2;
        this.label = label;
        var defaultDrawLabelOptions = {
            anchorPosition: AnchorPosition.BOTTOM_LEFT,
            backgroundColor: this.boxColor
        };
        this.drawLabelOptions = new DrawTextFieldOptions(Object.assign({}, defaultDrawLabelOptions, drawLabelOptions));
    }
    return DrawBoxOptions;
}());
export { DrawBoxOptions };
var DrawBox = /** @class */ (function () {
    function DrawBox(box, options) {
        if (options === void 0) { options = {}; }
        this.box = new Box(box);
        this.options = new DrawBoxOptions(options);
    }
    DrawBox.prototype.draw = function (canvasArg) {
        var ctx = getContext2dOrThrow(canvasArg);
        var _a = this.options, boxColor = _a.boxColor, lineWidth = _a.lineWidth;
        var _b = this.box, x = _b.x, y = _b.y, width = _b.width, height = _b.height;
        ctx.strokeStyle = boxColor;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(x, y, width, height);
        var label = this.options.label;
        if (label) {
            new DrawTextField([label], { x: x - (lineWidth / 2), y: y }, this.options.drawLabelOptions).draw(canvasArg);
        }
    };
    return DrawBox;
}());
export { DrawBox };
//# sourceMappingURL=DrawBox.js.map