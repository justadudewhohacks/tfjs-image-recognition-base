"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function extractWeightEntryFactory(weightMap, paramMappings) {
    return function (originalPath, paramRank, mappedPath) {
        var tensor = weightMap[originalPath];
        if (!utils_1.isTensor(tensor, paramRank)) {
            throw new Error("expected weightMap[" + originalPath + "] to be a Tensor" + paramRank + "D, instead have " + tensor);
        }
        paramMappings.push({ originalPath: originalPath, paramPath: mappedPath || originalPath });
        return tensor;
    };
}
exports.extractWeightEntryFactory = extractWeightEntryFactory;
//# sourceMappingURL=extractWeightEntryFactory.js.map