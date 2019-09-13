import { __extends } from "tslib";
import { Box } from './Box';
import { isValidNumber } from '../utils/index';
var LabeledBox = /** @class */ (function (_super) {
    __extends(LabeledBox, _super);
    function LabeledBox(box, label) {
        var _this = _super.call(this, box) || this;
        _this._label = label;
        return _this;
    }
    LabeledBox.assertIsValidLabeledBox = function (box, callee) {
        Box.assertIsValidBox(box, callee);
        if (!isValidNumber(box.label)) {
            throw new Error(callee + " - expected property label (" + box.label + ") to be a number");
        }
    };
    Object.defineProperty(LabeledBox.prototype, "label", {
        get: function () { return this._label; },
        enumerable: true,
        configurable: true
    });
    return LabeledBox;
}(Box));
export { LabeledBox };
//# sourceMappingURL=LabeledBox.js.map