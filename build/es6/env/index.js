import { initializeEnvironment } from './initialize';
import { isNodejs } from './isNodejs';
var environment;
function initialize() {
    environment = initializeEnvironment();
}
function getEnv() {
    return environment;
}
function monkeyPatch(env) {
    environment = environment || initializeEnvironment();
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
    initialize: initialize,
    monkeyPatch: monkeyPatch,
    isNodejs: isNodejs
};
initialize();
//# sourceMappingURL=index.js.map