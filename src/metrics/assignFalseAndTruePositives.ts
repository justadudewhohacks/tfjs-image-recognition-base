import { Box } from '../classes/Box';
import { iou } from '../ops/iou';

/**
 * Categorize predicted boxes of an image as true or false positives based on IOU to ground truth boxes.
 *
 * @param groundTruth Ground truth boxes for that image.
 * @param predictions Predicted boxes and for that image.
 * @param iouThreshold IOU threshold at which a predicted box is considered to be a true positive.
 * @returns AP
 */
export function assignFalseAndTruePositives<T extends Box, S extends Box>(
  groundTruth: T[],
  predictions: S[],
  iouThreshold: number
) {
  // sort descending by iou to ensure predicted box with highest iou
  // is considered to be true positive
  const sortedIouPairs = createSortedIouPairs(groundTruth, predictions)
    .filter(pair => pair.iou > iouThreshold)

  const assignedGtBoxes = new Set<T>()
  const assignedPredBoxes = new Set<S>()

  sortedIouPairs.forEach(({ gt, pred }) => {
    if (assignedGtBoxes.has(gt) || assignedPredBoxes.has(pred)) {
      return
    }
    assignedGtBoxes.add(gt)
    assignedPredBoxes.add(pred)
  })

  const truePositives = Array.from(assignedPredBoxes.values())
  const falsePositives = predictions.filter(pred => !assignedPredBoxes.has(pred))

  return { truePositives, falsePositives }
}

export function createSortedIouPairs<T extends Box, S extends Box>(groundTruth: T[], predictions: S[]) {
  return predictions.map(pred => groundTruth.map(gt => ({
    pred,
    gt,
    iou: iou(gt, pred)
  })))
    .reduce((flat, arr) => flat.concat(arr), [])
    .sort((p1, p2) => p2.iou - p1.iou)
}