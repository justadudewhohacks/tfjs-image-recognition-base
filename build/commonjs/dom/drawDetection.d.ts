import { BoxWithText } from '../classes/BoxWithText';
import { ObjectDetection } from '../classes/ObjectDetection';
import { PredictedBox } from '../classes/PredictedBox';
import { Rect } from '../classes/Rect';
import { DrawDetectionOptions } from './types';
export declare function drawDetection(canvasArg: string | HTMLCanvasElement, detection: Rect | PredictedBox | ObjectDetection | BoxWithText | Array<Rect | PredictedBox | ObjectDetection | BoxWithText>, options?: DrawDetectionOptions): void;
