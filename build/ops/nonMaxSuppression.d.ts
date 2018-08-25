import { BoundingBox } from '../classes/BoundingBox';
export declare function nonMaxSuppression(boxes: BoundingBox[], scores: number[], iouThreshold: number, isIOU?: boolean): number[];
