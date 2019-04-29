import * as tslib_1 from "tslib";
import { Box } from './Box';
var Rect = /** @class */ (function (_super) {
    tslib_1.__extends(Rect, _super);
    function Rect(x, y, width, height, allowNegativeDimensions) {
        if (allowNegativeDimensions === void 0) { allowNegativeDimensions = false; }
        return _super.call(this, { x: x, y: y, width: width, height: height }, allowNegativeDimensions) || this;
    }
    return Rect;
}(Box));
export { Rect };
//# sourceMappingURL=Rect.js.map