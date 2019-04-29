"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var Point_1 = require("./Point");
var Box = /** @class */ (function () {
    function Box(_box, allowNegativeDimensions) {
        if (allowNegativeDimensions === void 0) { allowNegativeDimensions = true; }
        var box = (_box || {});
        var isBbox = [box.left, box.top, box.right, box.bottom].every(utils_1.isValidNumber);
        var isRect = [box.x, box.y, box.width, box.height].every(utils_1.isValidNumber);
        if (!isRect && !isBbox) {
            throw new Error("Box.constructor - expected box to be IBoundingBox | IRect, instead have " + JSON.stringify(box));
        }
        var _a = isRect
            ? [box.x, box.y, box.width, box.height]
            : [box.left, box.top, box.right - box.left, box.bottom - box.top], x = _a[0], y = _a[1], width = _a[2], height = _a[3];
        Box.assertIsValidBox({ x: x, y: y, width: width, height: height }, 'Box.constructor', allowNegativeDimensions);
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }
    Box.isRect = function (rect) {
        return !!rect && [rect.x, rect.y, rect.width, rect.height].every(utils_1.isValidNumber);
    };
    Box.assertIsValidBox = function (box, callee, allowNegativeDimensions) {
        if (allowNegativeDimensions === void 0) { allowNegativeDimensions = false; }
        if (!Box.isRect(box)) {
            throw new Error(callee + " - invalid box: " + JSON.stringify(box) + ", expected object with properties x, y, width, height");
        }
        if (!allowNegativeDimensions && (box.width < 0 || box.height < 0)) {
            throw new Error(callee + " - width (" + box.width + ") and height (" + box.height + ") must be positive numbers");
        }
    };
    Object.defineProperty(Box.prototype, "x", {
        get: function () { return this._x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "y", {
        get: function () { return this._y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "width", {
        get: function () { return this._width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "height", {
        get: function () { return this._height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "left", {
        get: function () { return this.x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "top", {
        get: function () { return this.y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "right", {
        get: function () { return this.x + this.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "bottom", {
        get: function () { return this.y + this.height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "area", {
        get: function () { return this.width * this.height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "topLeft", {
        get: function () { return new Point_1.Point(this.left, this.top); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "topRight", {
        get: function () { return new Point_1.Point(this.right, this.top); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "bottomLeft", {
        get: function () { return new Point_1.Point(this.left, this.bottom); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "bottomRight", {
        get: function () { return new Point_1.Point(this.right, this.bottom); },
        enumerable: true,
        configurable: true
    });
    Box.prototype.round = function () {
        var _a = [this.x, this.y, this.width, this.height]
            .map(function (val) { return Math.round(val); }), x = _a[0], y = _a[1], width = _a[2], height = _a[3];
        return new Box({ x: x, y: y, width: width, height: height });
    };
    Box.prototype.floor = function () {
        var _a = [this.x, this.y, this.width, this.height]
            .map(function (val) { return Math.floor(val); }), x = _a[0], y = _a[1], width = _a[2], height = _a[3];
        return new Box({ x: x, y: y, width: width, height: height });
    };
    Box.prototype.toSquare = function () {
        var _a = this, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var diff = Math.abs(width - height);
        if (width < height) {
            x -= (diff / 2);
            width += diff;
        }
        if (height < width) {
            y -= (diff / 2);
            height += diff;
        }
        return new Box({ x: x, y: y, width: width, height: height });
    };
    Box.prototype.rescale = function (s) {
        var scaleX = utils_1.isDimensions(s) ? s.width : s;
        var scaleY = utils_1.isDimensions(s) ? s.height : s;
        return new Box({
            x: this.x * scaleX,
            y: this.y * scaleY,
            width: this.width * scaleX,
            height: this.height * scaleY
        });
    };
    Box.prototype.pad = function (padX, padY) {
        var _a = [
            this.x - (padX / 2),
            this.y - (padY / 2),
            this.width + padX,
            this.height + padY
        ], x = _a[0], y = _a[1], width = _a[2], height = _a[3];
        return new Box({ x: x, y: y, width: width, height: height });
    };
    Box.prototype.clipAtImageBorders = function (imgWidth, imgHeight) {
        var _a = this, x = _a.x, y = _a.y, right = _a.right, bottom = _a.bottom;
        var clippedX = Math.max(x, 0);
        var clippedY = Math.max(y, 0);
        var newWidth = right - clippedX;
        var newHeight = bottom - clippedY;
        var clippedWidth = Math.min(newWidth, imgWidth - clippedX);
        var clippedHeight = Math.min(newHeight, imgHeight - clippedY);
        return (new Box({ x: clippedX, y: clippedY, width: clippedWidth, height: clippedHeight })).floor();
    };
    Box.prototype.shift = function (sx, sy) {
        var _a = this, width = _a.width, height = _a.height;
        var x = this.x + sx;
        var y = this.y + sy;
        return new Box({ x: x, y: y, width: width, height: height });
    };
    Box.prototype.padAtBorders = function (imageHeight, imageWidth) {
        var w = this.width + 1;
        var h = this.height + 1;
        var dx = 1;
        var dy = 1;
        var edx = w;
        var edy = h;
        var x = this.left;
        var y = this.top;
        var ex = this.right;
        var ey = this.bottom;
        if (ex > imageWidth) {
            edx = -ex + imageWidth + w;
            ex = imageWidth;
        }
        if (ey > imageHeight) {
            edy = -ey + imageHeight + h;
            ey = imageHeight;
        }
        if (x < 1) {
            edy = 2 - x;
            x = 1;
        }
        if (y < 1) {
            edy = 2 - y;
            y = 1;
        }
        return { dy: dy, edy: edy, dx: dx, edx: edx, y: y, ey: ey, x: x, ex: ex, w: w, h: h };
    };
    Box.prototype.calibrate = function (region) {
        return new Box({
            left: this.left + (region.left * this.width),
            top: this.top + (region.top * this.height),
            right: this.right + (region.right * this.width),
            bottom: this.bottom + (region.bottom * this.height)
        }).toSquare().round();
    };
    return Box;
}());
exports.Box = Box;
//# sourceMappingURL=Box.js.map