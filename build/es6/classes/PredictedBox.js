import { __extends } from "tslib";
import { isValidProbablitiy } from '../utils';
import { LabeledBox } from './LabeledBox';
var PredictedBox = /** @class */ (function (_super) {
    __extends(PredictedBox, _super);
    function PredictedBox(box, label, score, classScore) {
        var _this = _super.call(this, box, label) || this;
        _this._score = score;
        _this._classScore = classScore;
        return _this;
    }
    PredictedBox.assertIsValidPredictedBox = function (box, callee) {
        LabeledBox.assertIsValidLabeledBox(box, callee);
        if (!isValidProbablitiy(box.score)
            || !isValidProbablitiy(box.classScore)) {
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
}(LabeledBox));
export { PredictedBox };
//# sourceMappingURL=PredictedBox.js.map