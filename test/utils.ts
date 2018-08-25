import * as tf from '@tensorflow/tfjs-core';

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
