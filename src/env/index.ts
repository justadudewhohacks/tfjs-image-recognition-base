import { initializeEnvironment } from './initialize';
import { isNodejs } from './isNodejs';
import { Environment } from './types';

let environment: Environment

function initialize() {
  environment = initializeEnvironment()
}

function getEnv(): Environment {
  return environment
}

function monkeyPatch(env: Partial<Environment>) {
  environment = environment || initializeEnvironment()

  const { Canvas = environment.Canvas, Image = environment.Image } = env
  environment.Canvas = Canvas
  environment.Image = Image
  environment.createCanvasElement = env.createCanvasElement || (() => new Canvas())
  environment.createImageElement = env.createImageElement || (() => new Image())

  environment.ImageData = env.ImageData || environment.ImageData
  environment.Video = env.Video || environment.Video
  environment.fetch = env.fetch || environment.fetch
  environment.readFile = env.readFile || environment.readFile
}

export const env = {
  getEnv,
  initialize,
  monkeyPatch,
  isNodejs
}

initialize()

export * from './types'
