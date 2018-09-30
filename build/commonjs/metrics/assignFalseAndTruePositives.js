"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iou_1 = require("../ops/iou");
/**
 * Categorize predicted boxes of an image as true or false positives based on IOU to ground truth boxes.
 *
 * @param groundTruth Ground truth boxes for that image.
 * @param predictions Predicted boxes and for that image.
 * @param iouThreshold IOU threshold at which a predicted box is considered to be a true positive.
 * @returns AP
 */
function assignFalseAndTruePositives(groundTruth, predictions, iouThreshold) {
    // sort descending by iou to ensure predicted box with highest iou
    // is considered to be true positive
    var sortedIouPairs = createSortedIouPairs(groundTruth, predictions)
        .filter(function (pair) { return pair.iou > iouThreshold; });
    var assignedGtBoxes = new Set();
    var assignedPredBoxes = new Set();
    sortedIouPairs.forEach(function (_a) {
        var gt = _a.gt, pred = _a.pred;
        if (assignedGtBoxes.has(gt) || assignedPredBoxes.has(pred)) {
            return;
        }
        assignedGtBoxes.add(gt);
        assignedPredBoxes.add(pred);
    });
    var truePositives = Array.from(assignedPredBoxes.values());
    var falsePositives = predictions.filter(function (pred) { return !assignedPredBoxes.has(pred); });
    return { truePositives: truePositives, falsePositives: falsePositives };
}
exports.assignFalseAndTruePositives = assignFalseAndTruePositives;
function createSortedIouPairs(groundTruth, predictions) {
    return predictions.map(function (pred) { return groundTruth.map(function (gt) { return ({
        pred: pred,
        gt: gt,
        iou: iou_1.iou(gt, pred)
    }); }); })
        .reduce(function (flat, arr) { return flat.concat(arr); }, [])
        .sort(function (p1, p2) { return p2.iou - p1.iou; });
}
exports.createSortedIouPairs = createSortedIouPairs;
//# sourceMappingURL=assignFalseAndTruePositives.js.map