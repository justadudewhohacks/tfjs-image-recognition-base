import { GroundTruthsAndPredictions } from './types';
/**
 * Calculates the average precision (AP) over 11 recall levels between [0, 1].
 *
 * @param inputs Array of ground truth and predicted boxes of each image.
 * @param iouThreshold IOU threshold at which a predicted box is considered to be a true positive.
 * @returns AP
 */
export declare function averagePrecision(inputs: GroundTruthsAndPredictions[], iouThreshold: number): {
    averagePrec: number;
    accumulatedTps: number;
    accumulatedFps: number;
};
