export function isNodejs() {
    return typeof module !== 'undefined' && !!module.exports
        && typeof process !== 'undefined' && !!process.version;
}
//# sourceMappingURL=isNodejs.js.map