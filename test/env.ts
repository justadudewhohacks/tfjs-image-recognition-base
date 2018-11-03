import { env, fetchImage, fetchJson } from '../src';

export let fs: any, path: any, canvas: any

if (env.isNodejs()) {
  require('@tensorflow/tfjs-node')
  fs = require('fs')
  path = require('path')
  canvas = require('canvas')

  const { Canvas, Image } = canvas
  env.monkeyPatch({ Canvas, Image })
}

export async function loadImage(uri: string): Promise<HTMLImageElement> {
  if (!env.isNodejs()) {
    return fetchImage(`base${uri.startsWith('/') ? '' : '/'}${uri}`)
  }
  return canvas.loadImage(path.resolve(__dirname, '../', uri))
}

export async function loadJson<T>(uri: string): Promise<T> {
  if (!env.isNodejs()) {
    return fetchJson<T>(`base${uri.startsWith('/') ? '' : '/'}${uri}`)
  }
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../', uri)).toString())
}
