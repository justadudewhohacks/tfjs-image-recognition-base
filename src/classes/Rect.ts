import { Box } from './Box';

export interface IRect {
  x: number
  y: number
  width: number
  height: number
}

export class Rect extends Box<Rect> implements IRect {
  constructor(x: number, y: number, width: number, height: number) {
    super({ x, y, width, height })
  }
}