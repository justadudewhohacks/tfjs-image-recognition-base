import { Dimensions } from '../classes/types';
import { getContext2dOrThrow } from './getContext2dOrThrow';
import { getMediaDimensions } from './getMediaDimensions';
import { isMediaLoaded } from './isMediaLoaded';

export function createCanvas({ width, height }: Dimensions): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

export function createCanvasFromMedia(media: HTMLImageElement | HTMLVideoElement, dims?: Dimensions): HTMLCanvasElement {
  if (!isMediaLoaded(media)) {
    throw new Error('createCanvasFromMedia - media has not finished loading yet')
  }

  const { width, height } = dims || getMediaDimensions(media)
  const canvas = createCanvas({ width, height })
  getContext2dOrThrow(canvas).drawImage(media, 0, 0, width, height)
  return canvas
}