"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getContext2dOrThrow_1 = require("../dom/getContext2dOrThrow");
var resolveInput_1 = require("../dom/resolveInput");
var AnchorPosition;
(function (AnchorPosition) {
    AnchorPosition["TOP_LEFT"] = "TOP_LEFT";
    AnchorPosition["TOP_RIGHT"] = "TOP_RIGHT";
    AnchorPosition["BOTTOM_LEFT"] = "BOTTOM_LEFT";
    AnchorPosition["BOTTOM_RIGHT"] = "BOTTOM_RIGHT";
})(AnchorPosition = exports.AnchorPosition || (exports.AnchorPosition = {}));
var DrawTextFieldOptions = /** @class */ (function () {
    function DrawTextFieldOptions(options) {
        if (options === void 0) { options = {}; }
        var anchorPosition = options.anchorPosition, backgroundColor = options.backgroundColor, fontColor = options.fontColor, fontSize = options.fontSize, fontStyle = options.fontStyle, padding = options.padding;
        this.anchorPosition = anchorPosition || AnchorPosition.TOP_LEFT;
        this.backgroundColor = backgroundColor || 'rgba(0, 0, 0, 0.5)';
        this.fontColor = fontColor || 'rgba(255, 255, 255, 1)';
        this.fontSize = fontSize || 14;
        this.fontStyle = fontStyle || 'Georgia';
        this.padding = padding || 4;
    }
    return DrawTextFieldOptions;
}());
exports.DrawTextFieldOptions = DrawTextFieldOptions;
var DrawTextField = /** @class */ (function () {
    function DrawTextField(text, anchor, options) {
        if (options === void 0) { options = {}; }
        this.text = typeof text === 'string'
            ? [text]
            : (text instanceof DrawTextField ? text.text : text);
        this.anchor = anchor;
        this.options = new DrawTextFieldOptions(options);
    }
    DrawTextField.prototype.measureWidth = function (ctx) {
        var padding = this.options.padding;
        return this.text.map(function (l) { return ctx.measureText(l).width; }).reduce(function (w0, w1) { return w0 < w1 ? w1 : w0; }, 0) + (2 * padding);
    };
    DrawTextField.prototype.measureHeight = function () {
        var _a = this.options, fontSize = _a.fontSize, padding = _a.padding;
        return this.text.length * fontSize + (2 * padding);
    };
    DrawTextField.prototype.getUpperLeft = function (ctx, canvasDims) {
        var anchorPosition = this.options.anchorPosition;
        var isShiftLeft = anchorPosition === AnchorPosition.BOTTOM_RIGHT || anchorPosition === AnchorPosition.TOP_RIGHT;
        var isShiftTop = anchorPosition === AnchorPosition.BOTTOM_LEFT || anchorPosition === AnchorPosition.BOTTOM_RIGHT;
        var textFieldWidth = this.measureWidth(ctx);
        var textFieldHeight = this.measureHeight();
        var x = (isShiftLeft ? this.anchor.x - textFieldWidth : this.anchor.x);
        var y = isShiftTop ? this.anchor.y - textFieldHeight : this.anchor.y;
        // adjust anchor if text box exceeds canvas borders
        if (canvasDims) {
            var width = canvasDims.width, height = canvasDims.height;
            var newX = Math.max(Math.min(x, width - textFieldWidth), 0);
            var newY = Math.max(Math.min(y, height - textFieldHeight), 0);
            return { x: newX, y: newY };
        }
        return { x: x, y: y };
    };
    DrawTextField.prototype.draw = function (canvasArg) {
        var canvas = resolveInput_1.resolveInput(canvasArg);
        var ctx = getContext2dOrThrow_1.getContext2dOrThrow(canvas);
        var _a = this.options, backgroundColor = _a.backgroundColor, fontColor = _a.fontColor, fontSize = _a.fontSize, fontStyle = _a.fontStyle, padding = _a.padding;
        ctx.font = fontSize + "px " + fontStyle;
        var maxTextWidth = this.measureWidth(ctx);
        var textHeight = this.measureHeight();
        ctx.fillStyle = backgroundColor;
        var upperLeft = this.getUpperLeft(ctx, canvas);
        ctx.fillRect(upperLeft.x, upperLeft.y, maxTextWidth, textHeight);
        ctx.fillStyle = fontColor;
        this.text.forEach(function (textLine, i) {
            var x = padding + upperLeft.x;
            var y = padding + upperLeft.y + ((i + 1) * fontSize);
            ctx.fillText(textLine, x, y);
        });
    };
    return DrawTextField;
}());
exports.DrawTextField = DrawTextField;
//# sourceMappingURL=DrawTextField.js.map