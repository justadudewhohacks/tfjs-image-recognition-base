import { Dimensions, IDimensions } from '../classes/Dimensions';

export function getMediaDimensions(input: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | IDimensions): Dimensions {
  if (input instanceof HTMLImageElement) {
    return new Dimensions(input.naturalWidth, input.naturalHeight)
  }
  if (input instanceof HTMLVideoElement) {
    return new Dimensions(input.videoWidth, input.videoHeight)
  }
  return new Dimensions(input.width, input.height)
}
