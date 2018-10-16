import { IBoundingBox } from './BoundingBox';
import { Box } from './Box';
import { IRect } from './Rect';
export declare class BoxWithText extends Box<BoxWithText> {
    private _text;
    constructor(box: IRect | IBoundingBox, text: string);
    readonly text: string;
}
