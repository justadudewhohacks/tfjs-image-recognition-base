import { isValidNumber } from '../utils';
var Dimensions = /** @class */ (function () {
    function Dimensions(width, height) {
        if (!isValidNumber(width) || !isValidNumber(height)) {
            throw new Error("Dimensions.constructor - expected width and height to be valid numbers, instead have " + JSON.stringify({ width: width, height: height }));
        }
        this._width = width;
        this._height = height;
    }
    Object.defineProperty(Dimensions.prototype, "width", {
        get: function () { return this._width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dimensions.prototype, "height", {
        get: function () { return this._height; },
        enumerable: true,
        configurable: true
    });
    Dimensions.prototype.reverse = function () {
        return new Dimensions(1 / this.width, 1 / this.height);
    };
    return Dimensions;
}());
export { Dimensions };
//# sourceMappingURL=Dimensions.js.map