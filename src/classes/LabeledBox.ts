import { IBoundingBox } from './BoundingBox';
import { Box } from './Box';
import { IRect } from './Rect';

export class LabeledBox extends Box<LabeledBox> {

  private _label: number

  constructor(box: IBoundingBox | IRect | any, label: number) {
    super(box)
    this._label = label
  }

  public get label(): number {
    return this._label
  }

}