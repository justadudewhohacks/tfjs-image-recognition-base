import { __assign } from "tslib";
import { LabeledBox } from '../classes/LabeledBox';
import { PredictedBox } from '../classes/PredictedBox';
import { averagePrecision } from './averagePrecision';
/**
 * Calculates the mean average precision (mAP) over all classes.
 *
 * @param inputs Array ground truth and predicted boxes of each image labeled by class.
 * @param iouThreshold IOU threshold at which a predicted box is considered to be a true positive.
 * @returns mAP
 */
export function meanAveragePrecision(inputs, iouThreshold, classScoreThreshold) {
    if (iouThreshold === void 0) { iouThreshold = 0.5; }
    if (classScoreThreshold === void 0) { classScoreThreshold = 0.5; }
    inputs.forEach(function (input) {
        input.groundTruth.forEach(function (box) {
            if (!(box instanceof LabeledBox)) {
                throw new Error('meanAveragePrecision - expected ground truth boxes to be instanceof LabeledBox');
            }
        });
        input.predictions.forEach(function (box) {
            if (!(box instanceof PredictedBox)) {
                throw new Error('meanAveragePrecision - expected predicted boxes to be instanceof PredictedBox');
            }
        });
    });
    var unique = function (arr) { return Array.from(new Set(arr).values()); };
    var classLabels = unique(inputs
        .map(function (input) {
        return input.groundTruth.map(function (gt) { return gt.label; })
            .concat(input.predictions.map(function (pred) { return pred.label; }));
    })
        .reduce(function (flat, arr) { return flat.concat(arr); }, []));
    var classLabelFilter = function (classLabel) { return function (boxes) {
        return boxes.filter(function (box) { return box.label === classLabel; });
    }; };
    var filterByClassConfidence = function (boxes) {
        return boxes.filter(function (box) { return box.classScore >= classScoreThreshold; });
    };
    var inputsByClass = classLabels.map(function (classLabel) {
        var filterByClassLabel = classLabelFilter(classLabel);
        classScoreThreshold;
        return {
            classLabel: classLabel,
            inputs: inputs.map(function (input) {
                return {
                    groundTruth: filterByClassLabel(input.groundTruth),
                    predictions: filterByClassConfidence(filterByClassLabel(input.predictions))
                };
            })
        };
    });
    var averagePrecisionsByClass = inputsByClass.map(function (_a) {
        var classLabel = _a.classLabel, inputs = _a.inputs;
        return __assign({ classLabel: classLabel }, averagePrecision(inputs, iouThreshold));
    });
    return {
        meanAveragePrec: averagePrecisionsByClass
            .reduce(function (sum, _a) {
            var averagePrec = _a.averagePrec;
            return sum + averagePrec;
        }, 0) / classLabels.length,
        averagePrecisionsByClass: averagePrecisionsByClass
    };
}
//# sourceMappingURL=meanAveragePrecision.js.map