export interface IDimensions {
    width: number;
    height: number;
}
export declare class Dimensions implements IDimensions {
    private _width;
    private _height;
    constructor(width: number, height: number);
    readonly width: number;
    readonly height: number;
    reverse(): Dimensions;
}
