"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shuffleArray(inputArray) {
    var array = inputArray.slice();
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}
exports.shuffleArray = shuffleArray;
//# sourceMappingURL=shuffleArray.js.map