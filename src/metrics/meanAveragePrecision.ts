import { LabeledBox } from '../classes/LabeledBox';
import { PredictedBox } from '../classes/PredictedBox';
import { averagePrecision } from './averagePrecision';
import { GroundTruthsAndPredictions } from './types';

/**
 * Calculates the mean average precision (mAP) over all classes.
 *
 * @param inputs Array ground truth and predicted boxes of each image labeled by class.
 * @param iouThreshold IOU threshold at which a predicted box is considered to be a true positive.
 * @returns mAP
 */
export function meanAveragePrecision(
  inputs: GroundTruthsAndPredictions[],
  iouThreshold: number = 0.5,
  classScoreThreshold: number = 0.5
) {

  inputs.forEach(input => {
    input.groundTruth.forEach(box => {
      if (!(box instanceof LabeledBox)) {
        throw new Error('meanAveragePrecision - expected ground truth boxes to be instanceof LabeledBox')
      }
    })
    input.predictions.forEach(box => {
      if (!(box instanceof PredictedBox)) {
        throw new Error('meanAveragePrecision - expected predicted boxes to be instanceof PredictedBox')
      }
    })
  })

  const unique = (arr: number[]) => Array.from(new Set<number>(arr).values())

  const classLabels = unique(
    inputs
      .map(input =>
        input.groundTruth.map(gt => gt.label)
          .concat(input.predictions.map(pred => pred.label))
      )
      .reduce((flat, arr) => flat.concat(arr), [])
  )

  const classLabelFilter = (classLabel: number) => <T extends LabeledBox>(boxes: T[]) =>
    boxes.filter(box => box.label === classLabel)

  const filterByClassConfidence = (boxes: PredictedBox[]) =>
    boxes.filter(box => box.classScore >= classScoreThreshold)

  const inputsByClass = classLabels.map(classLabel => {

    const filterByClassLabel = classLabelFilter(classLabel)
    classScoreThreshold
    return {
      classLabel,
      inputs: inputs.map(input => {
        return {
          groundTruth: filterByClassLabel(input.groundTruth),
          predictions: filterByClassConfidence(filterByClassLabel(input.predictions))
        }
      })
    }
  })

  const averagePrecisionsByClass = inputsByClass.map(({ classLabel, inputs }) => {
    return {
      classLabel,
      ...averagePrecision(inputs, iouThreshold)
    }
  })

  return {
    meanAveragePrec: averagePrecisionsByClass
      .reduce((sum, { averagePrec }) => sum + averagePrec, 0) / classLabels.length,
    averagePrecisionsByClass
  }
}
