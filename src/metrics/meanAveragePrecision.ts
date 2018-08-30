import { LabeledBox } from '../classes/LabeledBox';
import { averagePrecision } from './averagePrecision';
import { GroundTruthsAndPredictions } from './types';

/**
 * Calculates the mean average precision (mAP) over all classes.
 *
 * @param inputs Array ground truth and predicted boxes of each image labeled by class.
 * @param iouThreshold IOU threshold at which a predicted box is considered to be a true positive.
 * @returns mAP
 */
export function meanAveragePrecision(inputs: GroundTruthsAndPredictions[], iouThreshold: number) {

  const unique = (arr: number[]) => Array.from(new Set<number>(arr).values())

  const classLabels = unique(
    inputs
      .map(input =>
        input.groundTruth.map(gt => gt.label)
          .concat(input.predictions.map(pred => pred.label))
      )
      .reduce((flat, arr) => flat.concat(arr), [])
  )

  const classLabelFilter = (classLabel: number) => (boxes: LabeledBox[]) =>
    boxes.filter(box => box.label === classLabel)

  const inputsByClass = classLabels.map(classLabel => {

    const filterByClass = classLabelFilter(classLabel)

    return {
      classLabel,
      inputs: inputs.map(input => {
        return {
          groundTruth: filterByClass(input.groundTruth),
          predictions: filterByClass(input.predictions)
        }
      })
    }
  })

  const averagePrecisionsByClass = inputsByClass.map(({ classLabel, inputs }) => {
    return {
      classLabel,
      averagePrecision: averagePrecision(inputs, iouThreshold)
    }
  })

  return {
    meanAveragePrec: averagePrecisionsByClass
      .reduce((sum, { averagePrecision }) => sum + averagePrecision, 0) / classLabels.length,
    averagePrecisionsByClass
  }
}
