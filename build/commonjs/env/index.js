"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createBrowserEnv_1 = require("./createBrowserEnv");
var createFileSystem_1 = require("./createFileSystem");
var createNodejsEnv_1 = require("./createNodejsEnv");
var isBrowser_1 = require("./isBrowser");
var isNodejs_1 = require("./isNodejs");
var environment;
function getEnv() {
    if (!environment) {
        throw new Error('getEnv - environment is not defined, check isNodejs() and isBrowser()');
    }
    return environment;
}
function setEnv(env) {
    environment = env;
}
function initialize() {
    // check for isBrowser() first to prevent electron renderer process
    // to be initialized with wrong environment due to isNodejs() returning true
    if (isBrowser_1.isBrowser()) {
        setEnv(createBrowserEnv_1.createBrowserEnv());
    }
    if (isNodejs_1.isNodejs()) {
        setEnv(createNodejsEnv_1.createNodejsEnv());
    }
}
function monkeyPatch(env) {
    if (!environment) {
        initialize();
    }
    if (!environment) {
        throw new Error('monkeyPatch - environment is not defined, check isNodejs() and isBrowser()');
    }
    var _a = env.Canvas, Canvas = _a === void 0 ? environment.Canvas : _a, _b = env.Image, Image = _b === void 0 ? environment.Image : _b;
    environment.Canvas = Canvas;
    environment.Image = Image;
    environment.createCanvasElement = env.createCanvasElement || (function () { return new Canvas(); });
    environment.createImageElement = env.createImageElement || (function () { return new Image(); });
    environment.ImageData = env.ImageData || environment.ImageData;
    environment.Video = env.Video || environment.Video;
    environment.fetch = env.fetch || environment.fetch;
    environment.readFile = env.readFile || environment.readFile;
}
exports.env = {
    getEnv: getEnv,
    setEnv: setEnv,
    initialize: initialize,
    createBrowserEnv: createBrowserEnv_1.createBrowserEnv,
    createFileSystem: createFileSystem_1.createFileSystem,
    createNodejsEnv: createNodejsEnv_1.createNodejsEnv,
    monkeyPatch: monkeyPatch,
    isBrowser: isBrowser_1.isBrowser,
    isNodejs: isNodejs_1.isNodejs
};
initialize();
//# sourceMappingURL=index.js.map