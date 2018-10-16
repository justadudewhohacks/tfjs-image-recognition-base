"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Box_1 = require("./Box");
var Dimensions_1 = require("./Dimensions");
var ObjectDetection = /** @class */ (function () {
    function ObjectDetection(score, classScore, className, relativeBox, imageDims) {
        this._imageDims = new Dimensions_1.Dimensions(imageDims.width, imageDims.height);
        this._score = score;
        this._classScore = classScore;
        this._className = className;
        this._box = new Box_1.Box(relativeBox).rescale(this._imageDims);
    }
    Object.defineProperty(ObjectDetection.prototype, "score", {
        get: function () { return this._score; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectDetection.prototype, "classScore", {
        get: function () { return this._classScore; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectDetection.prototype, "className", {
        get: function () { return this._className; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectDetection.prototype, "box", {
        get: function () { return this._box; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectDetection.prototype, "imageDims", {
        get: function () { return this._imageDims; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectDetection.prototype, "imageWidth", {
        get: function () { return this.imageDims.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectDetection.prototype, "imageHeight", {
        get: function () { return this.imageDims.height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectDetection.prototype, "relativeBox", {
        get: function () { return new Box_1.Box(this._box).rescale(this.imageDims.reverse()); },
        enumerable: true,
        configurable: true
    });
    ObjectDetection.prototype.forSize = function (width, height) {
        return new ObjectDetection(this.score, this.classScore, this.className, this.relativeBox, { width: width, height: height });
    };
    return ObjectDetection;
}());
exports.ObjectDetection = ObjectDetection;
//# sourceMappingURL=ObjectDetection.js.map