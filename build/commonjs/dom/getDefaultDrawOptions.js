"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDefaultDrawOptions(options) {
    if (options === void 0) { options = {}; }
    return Object.assign({}, {
        boxColor: 'blue',
        textColor: 'red',
        lineWidth: 2,
        fontSize: 20,
        fontStyle: 'Georgia',
        withScore: true,
        withClassName: true
    }, options);
}
exports.getDefaultDrawOptions = getDefaultDrawOptions;
//# sourceMappingURL=getDefaultDrawOptions.js.map