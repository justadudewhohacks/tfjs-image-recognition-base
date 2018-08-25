export function isMediaLoaded(media: HTMLImageElement | HTMLVideoElement) : boolean {
  return (media instanceof HTMLImageElement && media.complete)
    || (media instanceof HTMLVideoElement && media.readyState >= 3)
}
