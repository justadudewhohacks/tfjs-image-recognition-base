import * as tslib_1 from "tslib";
import { Box } from './Box';
var BoundingBox = /** @class */ (function (_super) {
    tslib_1.__extends(BoundingBox, _super);
    function BoundingBox(left, top, right, bottom, allowNegativeDimensions) {
        if (allowNegativeDimensions === void 0) { allowNegativeDimensions = false; }
        return _super.call(this, { left: left, top: top, right: right, bottom: bottom }, allowNegativeDimensions) || this;
    }
    return BoundingBox;
}(Box));
export { BoundingBox };
//# sourceMappingURL=BoundingBox.js.map