export type FileSystem = {
  readFile: (filePath: string) => Promise<Buffer>
}

export type Environment = FileSystem & {
  Canvas: typeof HTMLCanvasElement
  Image: typeof HTMLImageElement
  ImageData: typeof ImageData
  Video: typeof HTMLVideoElement
  createCanvasElement: () => HTMLCanvasElement
  createImageElement: () => HTMLImageElement
  fetch: (url: string, init?: RequestInit) => Promise<Response>
}
