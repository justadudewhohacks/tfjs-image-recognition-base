"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Box_1 = require("./Box");
var index_1 = require("../utils/index");
var LabeledBox = /** @class */ (function (_super) {
    tslib_1.__extends(LabeledBox, _super);
    function LabeledBox(box, label) {
        var _this = _super.call(this, box) || this;
        _this._label = label;
        return _this;
    }
    LabeledBox.assertIsValidLabeledBox = function (box, callee) {
        Box_1.Box.assertIsValidBox(box, callee);
        if (!index_1.isValidNumber(box.label)) {
            throw new Error(callee + " - expected property label (" + box.label + ") to be a number");
        }
    };
    Object.defineProperty(LabeledBox.prototype, "label", {
        get: function () { return this._label; },
        enumerable: true,
        configurable: true
    });
    return LabeledBox;
}(Box_1.Box));
exports.LabeledBox = LabeledBox;
//# sourceMappingURL=LabeledBox.js.map