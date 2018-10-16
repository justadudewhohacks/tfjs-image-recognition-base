import { Box } from './Box';
import { Dimensions, IDimensions } from './Dimensions';
import { IRect } from './Rect';
export declare class ObjectDetection {
    private _score;
    private _classScore;
    private _className;
    private _box;
    private _imageDims;
    constructor(score: number, classScore: number, className: string, relativeBox: IRect, imageDims: IDimensions);
    readonly score: number;
    readonly classScore: number;
    readonly className: string;
    readonly box: Box;
    readonly imageDims: Dimensions;
    readonly imageWidth: number;
    readonly imageHeight: number;
    readonly relativeBox: Box;
    forSize(width: number, height: number): ObjectDetection;
}
