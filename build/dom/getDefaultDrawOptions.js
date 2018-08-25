export function getDefaultDrawOptions(options) {
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
//# sourceMappingURL=getDefaultDrawOptions.js.map