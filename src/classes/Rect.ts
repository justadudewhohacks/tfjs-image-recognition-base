import { Box } from './Box';

export interface IRect {
  x: number
  y: number
  width: number
  height: number
}

export class Rect extends Box<Rect> implements IRect {
  public x: number
  public y: number
  public width: number
  public height: number

  constructor(x: number, y: number, width: number, height: number) {
    super({ x, y, width, height })
  }
}