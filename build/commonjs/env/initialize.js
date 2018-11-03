"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isNodejs_1 = require("./isNodejs");
function initializeEnvironment() {
    return isNodejs_1.isNodejs()
        ? initializeNodejsEnv()
        : initializeBrowserEnv();
}
exports.initializeEnvironment = initializeEnvironment;
function initializeNodejsEnv() {
    var Canvas = global['Canvas'] || global['HTMLCanvasElement'];
    var Image = global['Image'] || global['HTMLImageElement'];
    var createCanvasElement = function () {
        if (Canvas) {
            return new Canvas();
        }
        throw new Error('createCanvasElement - missing Canvas implementation for nodejs environment');
    };
    var createImageElement = function () {
        if (Image) {
            return new Image();
        }
        throw new Error('createImageElement - missing Image implementation for nodejs environment');
    };
    var fetch = global['fetch'] || function () {
        throw new Error('fetch - missing fetch implementation for nodejs environment');
    };
    var fs = null, requireFsError = '';
    try {
        fs = require('fs');
    }
    catch (err) {
        requireFsError = err.toString();
    }
    var readFile = fs
        ? function (filePath) {
            return new Promise(function (res, rej) {
                fs.readFile(filePath, function (err, buffer) {
                    return err ? rej(err) : res(buffer);
                });
            });
        }
        : function () {
            throw new Error("readFile - failed to require fs in nodejs environment with error: " + requireFsError);
        };
    return {
        Canvas: Canvas || /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()),
        Image: Image || /** @class */ (function () {
            function class_2() {
            }
            return class_2;
        }()),
        ImageData: global['ImageData'] || /** @class */ (function () {
            function class_3() {
            }
            return class_3;
        }()),
        Video: global['HTMLVideoElement'] || /** @class */ (function () {
            function class_4() {
            }
            return class_4;
        }()),
        createCanvasElement: createCanvasElement,
        createImageElement: createImageElement,
        fetch: fetch,
        readFile: readFile
    };
}
function initializeBrowserEnv() {
    var fetch = window['fetch'] || function () {
        throw new Error('fetch - missing fetch implementation for browser environment');
    };
    var readFile = function () {
        throw new Error('readFile - filesystem not available for browser environment');
    };
    return {
        Canvas: HTMLCanvasElement,
        Image: HTMLImageElement,
        ImageData: ImageData,
        Video: HTMLVideoElement,
        createCanvasElement: function () { return document.createElement('canvas'); },
        createImageElement: function () { return document.createElement('img'); },
        fetch: fetch,
        readFile: readFile
    };
}
//# sourceMappingURL=initialize.js.map