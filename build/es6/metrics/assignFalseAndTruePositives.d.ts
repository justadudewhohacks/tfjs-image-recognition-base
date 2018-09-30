import { Box } from '../classes/Box';
/**
 * Categorize predicted boxes of an image as true or false positives based on IOU to ground truth boxes.
 *
 * @param groundTruth Ground truth boxes for that image.
 * @param predictions Predicted boxes and for that image.
 * @param iouThreshold IOU threshold at which a predicted box is considered to be a true positive.
 * @returns AP
 */
export declare function assignFalseAndTruePositives<T extends Box, S extends Box>(groundTruth: T[], predictions: S[], iouThreshold: number): {
    truePositives: S[];
    falsePositives: S[];
};
export declare function createSortedIouPairs<T extends Box, S extends Box>(groundTruth: T[], predictions: S[]): {
    pred: S;
    gt: T;
    iou: number;
}[];
