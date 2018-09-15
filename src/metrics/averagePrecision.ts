import { PredictedBox } from '../classes/PredictedBox';
import { range } from '../utils';
import { assignFalseAndTruePositives } from './assignFalseAndTruePositives';
import { GroundTruthsAndPredictions } from './types';

/**
 * Calculates the average precision (AP) over 11 recall levels between [0, 1].
 *
 * @param inputs Array of ground truth and predicted boxes of each image.
 * @param iouThreshold IOU threshold at which a predicted box is considered to be a true positive.
 * @returns AP
 */
export function averagePrecision(inputs: GroundTruthsAndPredictions[], iouThreshold: number) {

  const sortedDetections = inputs
    .map(input => categorizeBoxes(input, iouThreshold))
    .reduce((flat, arr) => flat.concat(arr))
    .sort((b1, b2) => b2.score - b1.score)
    .map(b => b.isTruePositive)

  const numGroundTruth = inputs
    .map(input => input.groundTruth.length)
    .reduce((sum, val) => sum + val, 0)

  const computeRecall = (tp: number) => tp / numGroundTruth
  const computePrecision = (tp: number, fp: number) => tp / (tp + fp)

  let accumulatedTps = 0, accumulatedFps = 0
  const precisionRecallPairs = sortedDetections.map((isTruePositive) => {
    accumulatedTps += (isTruePositive ? 1 : 0)
    accumulatedFps += (isTruePositive ? 0 : 1)

    const recall = computeRecall(accumulatedTps)
    const precision = computePrecision(accumulatedTps, accumulatedFps)

    return { recall, precision }
  })

  const numIntervals = 11
  const precisionsForRecallInterval = range(numIntervals, 0, 0.1).map(
    recallThreshold =>
      precisionRecallPairs
        .filter(pair => pair.recall >= recallThreshold)
        .map(pair => pair.precision)
        .reduce((max, val) => max > val ? max : val, 0)
  )

  return {
    averagePrec: precisionsForRecallInterval.reduce((sum, val) => sum + val, 0) / numIntervals,
    accumulatedTps,
    accumulatedFps
  }
}

function categorizeBoxes(input: GroundTruthsAndPredictions, iouThreshold: number) {
  const {
    truePositives,
    falsePositives
  } = assignFalseAndTruePositives(input.groundTruth, input.predictions, iouThreshold)


  return truePositives
    .map(categorize(true))
    .concat(falsePositives.map(categorize(false)))
}

const categorize = (isTruePositive: boolean) => ({ score }: PredictedBox) => ({ score, isTruePositive })
