import { LabeledBox } from '../classes/LabeledBox';
import { PredictedBox } from '../classes/PredictedBox';

export type GroundTruthsAndPredictions = {
  groundTruth: LabeledBox[]
  predictions: PredictedBox[]
}