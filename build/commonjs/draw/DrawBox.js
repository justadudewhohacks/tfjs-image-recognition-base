"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var classes_1 = require("../classes");
var getContext2dOrThrow_1 = require("../dom/getContext2dOrThrow");
var DrawTextField_1 = require("./DrawTextField");
var DrawBoxOptions = /** @class */ (function () {
    function DrawBoxOptions(options) {
        if (options === void 0) { options = {}; }
        var boxColor = options.boxColor, lineWidth = options.lineWidth, label = options.label, drawLabelOptions = options.drawLabelOptions;
        this.boxColor = boxColor || 'rgba(0, 0, 255, 1)';
        this.lineWidth = lineWidth || 2;
        this.label = label;
        var defaultDrawLabelOptions = {
            anchorPosition: DrawTextField_1.AnchorPosition.BOTTOM_LEFT,
            backgroundColor: this.boxColor
        };
        this.drawLabelOptions = new DrawTextField_1.DrawTextFieldOptions(Object.assign({}, defaultDrawLabelOptions, drawLabelOptions));
    }
    return DrawBoxOptions;
}());
exports.DrawBoxOptions = DrawBoxOptions;
var DrawBox = /** @class */ (function () {
    function DrawBox(box, options) {
        if (options === void 0) { options = {}; }
        this.box = new classes_1.Box(box);
        this.options = new DrawBoxOptions(options);
    }
    DrawBox.prototype.draw = function (canvasArg) {
        var ctx = getContext2dOrThrow_1.getContext2dOrThrow(canvasArg);
        var _a = this.options, boxColor = _a.boxColor, lineWidth = _a.lineWidth;
        var _b = this.box, x = _b.x, y = _b.y, width = _b.width, height = _b.height;
        ctx.strokeStyle = boxColor;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(x, y, width, height);
        var label = this.options.label;
        if (label) {
            new DrawTextField_1.DrawTextField([label], { x: x - (lineWidth / 2), y: y }, this.options.drawLabelOptions).draw(canvasArg);
        }
    };
    return DrawBox;
}());
exports.DrawBox = DrawBox;
//# sourceMappingURL=DrawBox.js.map