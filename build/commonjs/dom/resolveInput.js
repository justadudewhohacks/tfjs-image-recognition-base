"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("../env");
function resolveInput(arg) {
    if (!env_1.env.isNodejs() && typeof arg === 'string') {
        return document.getElementById(arg);
    }
    return arg;
}
exports.resolveInput = resolveInput;
//# sourceMappingURL=resolveInput.js.map