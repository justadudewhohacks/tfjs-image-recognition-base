import { range } from '../utils';
import { assignFalseAndTruePositives } from './assignFalseAndTruePositives';
/**
 * Calculates the average precision (AP) over 11 recall levels between [0, 1].
 *
 * @param inputs Array of ground truth and predicted boxes of each image.
 * @param iouThreshold IOU threshold at which a predicted box is considered to be a true positive.
 * @returns AP
 */
export function averagePrecision(inputs, iouThreshold) {
    var sortedDetections = inputs
        .map(function (input) { return categorizeBoxes(input, iouThreshold); })
        .reduce(function (flat, arr) { return flat.concat(arr); })
        .sort(function (b1, b2) { return b2.score - b1.score; })
        .map(function (b) { return b.isTruePositive; });
    var numGroundTruth = inputs
        .map(function (input) { return input.groundTruth.length; })
        .reduce(function (sum, val) { return sum + val; }, 0);
    var computeRecall = function (tp) { return tp / numGroundTruth; };
    var computePrecision = function (tp, fp) { return tp / (tp + fp); };
    var accumulatedTps = 0, accumulatedFps = 0;
    var precisionRecallPairs = sortedDetections.map(function (isTruePositive) {
        accumulatedTps += (isTruePositive ? 1 : 0);
        accumulatedFps += (isTruePositive ? 0 : 1);
        var recall = computeRecall(accumulatedTps);
        var precision = computePrecision(accumulatedTps, accumulatedFps);
        return { recall: recall, precision: precision };
    });
    var numIntervals = 11;
    var precisionsForRecallInterval = range(numIntervals, 0, 0.1).map(function (recallThreshold) {
        return precisionRecallPairs
            .filter(function (pair) { return pair.recall >= recallThreshold; })
            .map(function (pair) { return pair.precision; })
            .reduce(function (max, val) { return max > val ? max : val; }, 0);
    });
    return {
        averagePrec: precisionsForRecallInterval.reduce(function (sum, val) { return sum + val; }, 0) / numIntervals,
        accumulatedTps: accumulatedTps,
        accumulatedFps: accumulatedFps
    };
}
function categorizeBoxes(input, iouThreshold) {
    var _a = assignFalseAndTruePositives(input.groundTruth, input.predictions, iouThreshold), truePositives = _a.truePositives, falsePositives = _a.falsePositives;
    return truePositives
        .map(categorize(true))
        .concat(falsePositives.map(categorize(false)));
}
var categorize = function (isTruePositive) { return function (_a) {
    var score = _a.score;
    return ({ score: score, isTruePositive: isTruePositive });
}; };
//# sourceMappingURL=averagePrecision.js.map