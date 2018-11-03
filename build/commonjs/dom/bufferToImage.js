"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("../env");
function bufferToImage(buf) {
    return new Promise(function (resolve, reject) {
        if (!(buf instanceof Blob)) {
            return reject('bufferToImage - expected buf to be of type: Blob');
        }
        var reader = new FileReader();
        reader.onload = function () {
            if (typeof reader.result !== 'string') {
                return reject('bufferToImage - expected reader.result to be a string, in onload');
            }
            var img = env_1.env.getEnv().createImageElement();
            img.onload = function () { return resolve(img); };
            img.onerror = reject;
            img.src = reader.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(buf);
    });
}
exports.bufferToImage = bufferToImage;
//# sourceMappingURL=bufferToImage.js.map