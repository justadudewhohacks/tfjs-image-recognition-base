import * as tf from '@tensorflow/tfjs-core';
export declare function weightsLoaderFactory(fetchWeightsFunction: (fetchUrls: string[]) => Promise<ArrayBuffer[]>): (manifest: tf.io.WeightsManifestConfig, filePathPrefix?: string, weightNames?: string[]) => Promise<tf.NamedTensorMap>;
