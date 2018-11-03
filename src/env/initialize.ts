import { isNodejs } from './isNodejs';
import { Environment } from './types';

export function initializeEnvironment(): Environment {
  return isNodejs()
    ? initializeNodejsEnv()
    : initializeBrowserEnv()
}

function initializeNodejsEnv(): Environment {

  const Canvas = global['Canvas'] || global['HTMLCanvasElement']
  const Image = global['Image'] || global['HTMLImageElement']

  const createCanvasElement = function() {
    if (Canvas) {
      return new Canvas()
    }
    throw new Error('createCanvasElement - missing Canvas implementation for nodejs environment')
  }

  const createImageElement = function() {
    if (Image) {
      return new Image()
    }
    throw new Error('createImageElement - missing Image implementation for nodejs environment')
  }

  const fetch = global['fetch'] || function() {
    throw new Error('fetch - missing fetch implementation for nodejs environment')
  }

  let fs: any = null, requireFsError = ''
  try {
    fs = require('fs')
  } catch (err) {
    requireFsError = err.toString()
  }

  const readFile = fs
    ? function(filePath: string) {
      return new Promise<Buffer>((res, rej) => {
        fs.readFile(filePath, function(err: any, buffer: Buffer) {
          return err ? rej(err) : res(buffer)
        })
      })
    }
    : function() {
      throw new Error(`readFile - failed to require fs in nodejs environment with error: ${requireFsError}`)
    }

  return {
    Canvas: Canvas || class {},
    Image: Image || class {},
    ImageData: global['ImageData'] || class {},
    Video: global['HTMLVideoElement'] || class {},
    createCanvasElement,
    createImageElement,
    fetch,
    readFile
  }
}

function initializeBrowserEnv(): Environment {

  const fetch = window['fetch'] || function() {
    throw new Error('fetch - missing fetch implementation for browser environment')
  }

  const readFile = function() {
    throw new Error('readFile - filesystem not available for browser environment')
  }

  return {
    Canvas: HTMLCanvasElement,
    Image: HTMLImageElement,
    ImageData: ImageData,
    Video: HTMLVideoElement,
    createCanvasElement: () => document.createElement('canvas'),
    createImageElement: () => document.createElement('img'),
    fetch,
    readFile
  }
}