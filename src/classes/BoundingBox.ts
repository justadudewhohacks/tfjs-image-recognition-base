import { Box } from './Box';

export interface IBoundingBox {
  left: number
  top: number
  right: number
  bottom: number
}

export class BoundingBox extends Box<BoundingBox> implements IBoundingBox {
  constructor(left: number, top: number, right: number, bottom: number) {
    super({ left, top, right, bottom })
  }

  public padAtBorders(imageHeight: number, imageWidth: number) {
    const w = this.width + 1
    const h = this.height + 1

    let dx = 1
    let dy = 1
    let edx = w
    let edy = h

    let x = this.left
    let y = this.top
    let ex = this.right
    let ey = this.bottom

    if (ex > imageWidth) {
      edx = -ex + imageWidth + w
      ex = imageWidth
    }
    if (ey > imageHeight) {
      edy = -ey + imageHeight + h
      ey = imageHeight
    }
    if (x < 1) {
      edy = 2 - x
      x = 1
    }
    if (y < 1) {
      edy = 2 - y
      y = 1
    }

    return { dy, edy, dx, edx, y, ey, x, ex, w, h }
  }

  public calibrate(region: BoundingBox) {
    return new BoundingBox(
      this.left + (region.left * this.width),
      this.top + (region.top * this.height),
      this.right + (region.right * this.width),
      this.bottom + (region.bottom * this.height)
    ).toSquare().round()
  }
}