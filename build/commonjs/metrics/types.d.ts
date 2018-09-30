import { LabeledBox } from '../classes/LabeledBox';
import { PredictedBox } from '../classes/PredictedBox';
export declare type GroundTruthsAndPredictions = {
    groundTruth: LabeledBox[];
    predictions: PredictedBox[];
};
