import { createBrowserEnv } from './createBrowserEnv';
import { createFileSystem } from './createFileSystem';
import { createNodejsEnv } from './createNodejsEnv';
import { isBrowser } from './isBrowser';
import { isNodejs } from './isNodejs';
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
    if (isBrowser()) {
        setEnv(createBrowserEnv());
    }
    if (isNodejs()) {
        setEnv(createNodejsEnv());
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
export var env = {
    getEnv: getEnv,
    setEnv: setEnv,
    initialize: initialize,
    createBrowserEnv: createBrowserEnv,
    createFileSystem: createFileSystem,
    createNodejsEnv: createNodejsEnv,
    monkeyPatch: monkeyPatch,
    isBrowser: isBrowser,
    isNodejs: isNodejs
};
initialize();
//# sourceMappingURL=index.js.map