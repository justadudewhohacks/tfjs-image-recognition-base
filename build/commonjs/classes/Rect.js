"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Box_1 = require("./Box");
var Rect = /** @class */ (function (_super) {
    tslib_1.__extends(Rect, _super);
    function Rect(x, y, width, height) {
        return _super.call(this, { x: x, y: y, width: width, height: height }) || this;
    }
    return Rect;
}(Box_1.Box));
exports.Rect = Rect;
//# sourceMappingURL=Rect.js.map