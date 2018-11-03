import * as tslib_1 from "tslib";
import * as tf from '@tensorflow/tfjs-core';
// TODO: remove this once PR is merged and published
var DTYPE_VALUE_SIZE_MAP = {
    'float32': 4,
    'int32': 4,
    'uint16': 2,
    'uint8': 1,
    'bool': 1,
};
export function weightsLoaderFactory(fetchWeightsFunction) {
    var _this = this;
    return function (manifest, filePathPrefix, weightNames) {
        if (filePathPrefix === void 0) { filePathPrefix = ''; }
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var groupIndicesToFetchMap, groupWeightsToFetch, weightsFound, allManifestWeightNames, weightsNotFound, groupIndicesToFetch, fetchUrls, buffers, weightsTensorMap, bufferIndexOffset;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groupIndicesToFetchMap = manifest.map(function () { return false; });
                        groupWeightsToFetch = {};
                        weightsFound = weightNames != null
                            ? weightNames.map(function () { return false; })
                            : [];
                        allManifestWeightNames = [];
                        manifest.forEach(function (manifestGroupConfig, groupIndex) {
                            var groupOffset = 0;
                            manifestGroupConfig.weights.forEach(function (weightsEntry) {
                                var rawDtype = (weightsEntry.quantization) ?
                                    weightsEntry.quantization.dtype :
                                    weightsEntry.dtype;
                                var weightsBytes = DTYPE_VALUE_SIZE_MAP[rawDtype] *
                                    tf.util.sizeFromShape(weightsEntry.shape);
                                var enqueueWeightsForFetchingFn = function () {
                                    groupIndicesToFetchMap[groupIndex] = true;
                                    if (groupWeightsToFetch[groupIndex] == null) {
                                        groupWeightsToFetch[groupIndex] = [];
                                    }
                                    groupWeightsToFetch[groupIndex].push({
                                        manifestEntry: weightsEntry,
                                        groupOffset: groupOffset,
                                        sizeBytes: weightsBytes
                                    });
                                };
                                if (weightNames != null) {
                                    weightNames.forEach(function (weightName, weightIndex) {
                                        if (weightName === weightsEntry.name) {
                                            enqueueWeightsForFetchingFn();
                                            weightsFound[weightIndex] = true;
                                        }
                                    });
                                }
                                else {
                                    enqueueWeightsForFetchingFn();
                                }
                                allManifestWeightNames.push(weightsEntry.name);
                                groupOffset += weightsBytes;
                            });
                        });
                        if (!weightsFound.every(function (found) { return found; }) && weightNames) {
                            weightsNotFound = weightNames.filter(function (_, i) { return !weightsFound[i]; });
                            throw new Error("Could not find weights in manifest with names: " +
                                (weightsNotFound.join(', ') + ". \n") +
                                "Manifest JSON has weights with names: " +
                                (allManifestWeightNames.join(', ') + "."));
                        }
                        groupIndicesToFetch = groupIndicesToFetchMap.reduce(function (accumulator, shouldFetch, i) {
                            if (shouldFetch) {
                                accumulator.push(i);
                            }
                            return accumulator;
                        }, []);
                        fetchUrls = [];
                        groupIndicesToFetch.forEach(function (i) {
                            manifest[i].paths.forEach(function (filepath) {
                                var fetchUrl = filePathPrefix +
                                    (!filePathPrefix.endsWith('/') ? '/' : '') + filepath;
                                fetchUrls.push(fetchUrl);
                            });
                        });
                        return [4 /*yield*/, fetchWeightsFunction(fetchUrls)];
                    case 1:
                        buffers = _a.sent();
                        weightsTensorMap = {};
                        bufferIndexOffset = 0;
                        groupIndicesToFetch.forEach(function (i) {
                            var numBuffers = manifest[i].paths.length;
                            var groupBytes = 0;
                            for (var i_1 = 0; i_1 < numBuffers; i_1++) {
                                groupBytes += buffers[bufferIndexOffset + i_1].byteLength;
                            }
                            // Create a buffer for the whole group.
                            var groupBuffer = new ArrayBuffer(groupBytes);
                            var groupByteBuffer = new Uint8Array(groupBuffer);
                            var groupBufferOffset = 0;
                            for (var i_2 = 0; i_2 < numBuffers; i_2++) {
                                var buffer = new Uint8Array(buffers[bufferIndexOffset + i_2]);
                                groupByteBuffer.set(buffer, groupBufferOffset);
                                groupBufferOffset += buffer.byteLength;
                            }
                            var weightsEntries = groupWeightsToFetch[i];
                            weightsEntries.forEach(function (weightsEntry) {
                                var byteBuffer = groupBuffer.slice(weightsEntry.groupOffset, weightsEntry.groupOffset + weightsEntry.sizeBytes);
                                var nameToTensorMap = tf.io.decodeWeights(byteBuffer, [weightsEntry.manifestEntry]);
                                for (var name_1 in nameToTensorMap) {
                                    weightsTensorMap[name_1] = nameToTensorMap[name_1];
                                }
                            });
                            bufferIndexOffset += numBuffers;
                        });
                        return [2 /*return*/, weightsTensorMap];
                }
            });
        });
    };
}
//# sourceMappingURL=weightsLoaderFactory.js.map