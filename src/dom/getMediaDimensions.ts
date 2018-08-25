import { Dimensions } from '../classes/types';

export function getMediaDimensions(input: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | Dimensions): Dimensions {
  if (input instanceof HTMLImageElement) {
    return { width: input.naturalWidth, height: input.naturalHeight }
  }
  if (input instanceof HTMLVideoElement) {
    return { width: input.videoWidth, height: input.videoHeight }
  }
  return input
}
