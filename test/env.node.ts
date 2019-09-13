import * as fs from 'fs';
import * as path from 'path';

import { env } from '../src';
import { TestEnv } from './Environment';

require('@tensorflow/tfjs-node')
const canvas = require('canvas')

const { Canvas, Image } = canvas
env.monkeyPatch({ Canvas, Image })

async function loadImageNode(uri: string): Promise<HTMLImageElement> {
  return canvas.loadImage(path.resolve(__dirname, '../', uri))
}

async function loadJsonNode<T>(uri: string): Promise<T> {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../', uri)).toString())
}

const nodeTestEnv: TestEnv = {
  loadImage: loadImageNode,
  loadJson: loadJsonNode
}

global['nodeTestEnv'] = nodeTestEnv