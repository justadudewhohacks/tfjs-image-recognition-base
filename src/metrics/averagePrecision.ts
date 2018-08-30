import { range } from '../utils';
import { assignFalseAndTruePositives } from './assignFalseAndTruePositives';
import { GroundTruthAndPredictionBoxes } from './types';

/**
 * Calculates the average precision (AP) over 11 recall levels between [0, 1].
 *
 * @param inputs Array of ground truth and predicted boxes of each image.
 * @param iouThreshold IOU threshold at which a predicted box is considered to be a true positive.
 * @returns AP
 */
export function averagePrecision(inputs: GroundTruthAndPredictionBoxes[], iouThreshold: number): number {

  const precisionRecallPairs = inputs.map(input => {
    const {
      truePositives,
      falsePositives
    } = assignFalseAndTruePositives(input.groundTruth, input.predictions, iouThreshold)

    const tp = truePositives.length
    const fp = falsePositives.length

    return {
      recall: tp / (tp + fp),
      precision: tp / input.predictions.length,
    }
  })

  const numIntervals = 11
  const precisionsForRecallInterval = range(numIntervals, 0, 0.1).map(
    recallThreshold =>
      precisionRecallPairs
        .filter(pair => pair.recall >= recallThreshold)
        .map(pair => pair.precision)
        .reduce((max, val) => max > val ? max : val, 0)
  )

  return precisionsForRecallInterval.reduce((sum, val) => sum + val, 0) / numIntervals
}
