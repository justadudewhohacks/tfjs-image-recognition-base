"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Point.prototype, "x", {
        get: function () { return this._x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y", {
        get: function () { return this._y; },
        enumerable: true,
        configurable: true
    });
    Point.prototype.add = function (pt) {
        return new Point(this.x + pt.x, this.y + pt.y);
    };
    Point.prototype.sub = function (pt) {
        return new Point(this.x - pt.x, this.y - pt.y);
    };
    Point.prototype.mul = function (pt) {
        return new Point(this.x * pt.x, this.y * pt.y);
    };
    Point.prototype.div = function (pt) {
        return new Point(this.x / pt.x, this.y / pt.y);
    };
    Point.prototype.abs = function () {
        return new Point(Math.abs(this.x), Math.abs(this.y));
    };
    Point.prototype.magnitude = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };
    Point.prototype.floor = function () {
        return new Point(Math.floor(this.x), Math.floor(this.y));
    };
    return Point;
}());
exports.Point = Point;
//# sourceMappingURL=Point.js.map