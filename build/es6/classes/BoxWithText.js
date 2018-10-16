import * as tslib_1 from "tslib";
import { Box } from './Box';
var BoxWithText = /** @class */ (function (_super) {
    tslib_1.__extends(BoxWithText, _super);
    function BoxWithText(box, text) {
        var _this = _super.call(this, box) || this;
        _this._text = text;
        return _this;
    }
    Object.defineProperty(BoxWithText.prototype, "text", {
        get: function () { return this._text; },
        enumerable: true,
        configurable: true
    });
    return BoxWithText;
}(Box));
export { BoxWithText };
//# sourceMappingURL=BoxWithText.js.map