import { GroundTruthsAndPredictions } from './types';
/**
 * Calculates the mean average precision (mAP) over all classes.
 *
 * @param inputs Array ground truth and predicted boxes of each image labeled by class.
 * @param iouThreshold IOU threshold at which a predicted box is considered to be a true positive.
 * @returns mAP
 */
export declare function meanAveragePrecision(inputs: GroundTruthsAndPredictions[], iouThreshold?: number, classScoreThreshold?: number): {
    meanAveragePrec: number;
    averagePrecisionsByClass: {
        averagePrec: number;
        accumulatedTps: number;
        accumulatedFps: number;
        classLabel: number;
    }[];
};
