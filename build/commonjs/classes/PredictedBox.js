"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../utils");
var LabeledBox_1 = require("./LabeledBox");
var PredictedBox = /** @class */ (function (_super) {
    tslib_1.__extends(PredictedBox, _super);
    function PredictedBox(box, label, score, classScore) {
        var _this = _super.call(this, box, label) || this;
        _this._score = score;
        _this._classScore = classScore;
        return _this;
    }
    PredictedBox.assertIsValidPredictedBox = function (box, callee) {
        LabeledBox_1.LabeledBox.assertIsValidLabeledBox(box, callee);
        if (!utils_1.isValidProbablitiy(box.score)
            || !utils_1.isValidProbablitiy(box.classScore)) {
            throw new Error(callee + " - expected properties score (" + box.score + ") and (" + box.classScore + ") to be a number between [0, 1]");
        }
    };
    Object.defineProperty(PredictedBox.prototype, "score", {
        get: function () { return this._score; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PredictedBox.prototype, "classScore", {
        get: function () { return this._classScore; },
        enumerable: true,
        configurable: true
    });
    return PredictedBox;
}(LabeledBox_1.LabeledBox));
exports.PredictedBox = PredictedBox;
//# sourceMappingURL=PredictedBox.js.map