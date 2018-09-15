import * as tf from '@tensorflow/tfjs-core';

import { LabeledBox } from '../src/classes/LabeledBox';
import { PredictedBox } from '../src/classes/PredictedBox';

export async function expectAllTensorsReleased(fn: () => any) {
  const numTensorsBefore = tf.memory().numTensors
  await fn()
  expect(tf.memory().numTensors - numTensorsBefore).toEqual(0)
}

export function fakeTensor3d() {
  return tf.tensor3d([[[0]]])
}

export function zeros(length: number): Float32Array {
  return new Float32Array(length)
}

export function ones(length: number): Float32Array {
  return new Float32Array(length).fill(1)
}

export function createLabeledBox(
  x: number,
  y: number,
  width: number,
  height: number,
  classLabel: number = 0
): LabeledBox {
  return new LabeledBox({ x, y, width, height }, classLabel)
}

export function createPredictedBox(
  x: number,
  y: number,
  width: number,
  height: number,
  classLabel: number = 0,
  score: number = 1.0,
  classScore: number = 1.0
): PredictedBox {
  return new PredictedBox({ x, y, width, height }, classLabel, score, classScore)
}
