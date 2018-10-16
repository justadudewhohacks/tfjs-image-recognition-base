import { IDimensions } from '../classes/Dimensions';
export declare function createCanvas({ width, height }: IDimensions): HTMLCanvasElement;
export declare function createCanvasFromMedia(media: HTMLImageElement | HTMLVideoElement, dims?: IDimensions): HTMLCanvasElement;
