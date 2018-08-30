import { BoundingBox } from '../classes/BoundingBox';

export type GroundTruthsAndPredictions = {
  groundTruth: BoundingBox[]
  predictions: BoundingBox[]
}