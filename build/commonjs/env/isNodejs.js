"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNodejs() {
    return typeof module !== 'undefined' && !!module.exports
        && typeof process !== 'undefined' && !!process.version;
}
exports.isNodejs = isNodejs;
//# sourceMappingURL=isNodejs.js.map