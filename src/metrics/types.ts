import { Box } from '../classes/Box';
import { LabeledBox } from '../classes/LabeledBox';

export type GroundTruthsAndPredictions = {
  groundTruth: LabeledBox[]
  predictions: LabeledBox[]
}

export type GroundTruthAndPredictionBoxes = {
  groundTruth: Box[]
  predictions: Box[]
}