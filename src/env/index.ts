import { initializeEnvironment } from './initialize';
import { isNodejs } from './isNodejs';
import { Environment } from './types';

let environment: Environment | null

function initialize() {
  environment = initializeEnvironment()
}

function getEnv(): Environment {
  if (!environment) {
    throw new Error('getEnv - environment is not defined, check isNodejs() and isBrowser()')
  }
  return environment
}

function monkeyPatch(env: Partial<Environment>) {
  environment = environment || initializeEnvironment()

  if (!environment) {
    throw new Error('monkeyPatch - environment is not defined, check isNodejs() and isBrowser()')
  }

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
