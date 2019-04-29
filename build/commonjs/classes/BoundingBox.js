"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Box_1 = require("./Box");
var BoundingBox = /** @class */ (function (_super) {
    tslib_1.__extends(BoundingBox, _super);
    function BoundingBox(left, top, right, bottom, allowNegativeDimensions) {
        if (allowNegativeDimensions === void 0) { allowNegativeDimensions = false; }
        return _super.call(this, { left: left, top: top, right: right, bottom: bottom }, allowNegativeDimensions) || this;
    }
    return BoundingBox;
}(Box_1.Box));
exports.BoundingBox = BoundingBox;
//# sourceMappingURL=BoundingBox.js.map