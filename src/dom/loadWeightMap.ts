import * as tf from '@tensorflow/tfjs-core';

import { getModelUris } from '../common/getModelUris';

export async function loadWeightMap(
  uri: string | undefined,
  defaultModelName: string
): Promise<any> {

  const { manifestUri, modelBaseUri } = getModelUris(uri, defaultModelName)

  const manifest = await (await fetch(manifestUri)).json()

  return tf.io.loadWeights(manifest, modelBaseUri)
}