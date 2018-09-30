import { isTensor } from '../utils';
export function extractWeightEntryFactory(weightMap, paramMappings) {
    return function (originalPath, paramRank, mappedPath) {
        var tensor = weightMap[originalPath];
        if (!isTensor(tensor, paramRank)) {
            throw new Error("expected weightMap[" + originalPath + "] to be a Tensor" + paramRank + "D, instead have " + tensor);
        }
        paramMappings.push({ originalPath: originalPath, paramPath: mappedPath || originalPath });
        return tensor;
    };
}
//# sourceMappingURL=extractWeightEntryFactory.js.map