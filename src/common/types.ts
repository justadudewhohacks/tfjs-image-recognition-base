import * as tf from '@tensorflow/tfjs-core';

export type ExtractWeightsFunction = (numWeights: number) => Float32Array

export type ParamMapping = {
  originalPath?: string
  paramPath: string
}