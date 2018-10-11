import { IBoundingBox } from './BoundingBox';
import { Box } from './Box';
import { IRect } from './Rect';

export class BoxWithText extends Box<BoxWithText> {

  private _text: string

  constructor(box: IRect | IBoundingBox, text: string) {
    super(box)
    this._text = text
  }

  public get text(): string { return this._text }
}