import * as tf from '@tensorflow/tfjs-core';

// TODO: remove this once PR is merged and published

const DTYPE_VALUE_SIZE_MAP: {[dtype: string]: number} = {
  'float32': 4,
  'int32': 4,
  'uint16': 2,
  'uint8': 1,
  'bool': 1,
};

export function weightsLoaderFactory(
  fetchWeightsFunction: (fetchUrls: string[]) => Promise<ArrayBuffer[]>
): (
  manifest: tf.io.WeightsManifestConfig,
  filePathPrefix?: string,
  weightNames?: string[]
) => Promise<tf.NamedTensorMap> {

  return async (
    manifest: tf.io.WeightsManifestConfig,
    filePathPrefix = '',
    weightNames?: string[]
  ): Promise<tf.NamedTensorMap> => {

    // Collect all the groups, weights, and their relative offsets to be
    // fetched.
    const groupIndicesToFetchMap = manifest.map(() => false);
    const groupWeightsToFetch: {
      [group: number]: Array<{
        manifestEntry: tf.io.WeightsManifestEntry; groupOffset: number;
        sizeBytes: number;
      }>
    } = {};
    const weightsFound = weightNames != null
      ? weightNames.map(() => false)
      : [];
    const allManifestWeightNames: string[] = [];
    manifest.forEach((manifestGroupConfig, groupIndex) => {
      let groupOffset = 0;
      manifestGroupConfig.weights.forEach(weightsEntry => {
        const rawDtype = (weightsEntry.quantization) ?
            weightsEntry.quantization.dtype :
            weightsEntry.dtype;

        const weightsBytes = DTYPE_VALUE_SIZE_MAP[rawDtype] *
          tf.util.sizeFromShape(weightsEntry.shape);

        const enqueueWeightsForFetchingFn = () => {
          groupIndicesToFetchMap[groupIndex] = true;
          if (groupWeightsToFetch[groupIndex] == null) {
            groupWeightsToFetch[groupIndex] = [];
          }

          groupWeightsToFetch[groupIndex].push({
            manifestEntry: weightsEntry,
            groupOffset,
            sizeBytes: weightsBytes
          });
        };

        if (weightNames != null) {
          weightNames.forEach((weightName, weightIndex) => {
            if (weightName === weightsEntry.name) {
              enqueueWeightsForFetchingFn();
              weightsFound[weightIndex] = true;
            }
          });
        } else {
          enqueueWeightsForFetchingFn();
        }

        allManifestWeightNames.push(weightsEntry.name);
        groupOffset += weightsBytes;
      });
    });

    if (!weightsFound.every(found => found) && weightNames) {
      const weightsNotFound = weightNames.filter((_, i) => !weightsFound[i]);
      throw new Error(
          `Could not find weights in manifest with names: ` +
          `${weightsNotFound.join(', ')}. \n` +
          `Manifest JSON has weights with names: ` +
          `${allManifestWeightNames.join(', ')}.`);
    }

    // Convert the one-hot boolean groupId => shouldFetch map to a list of group
    // IDs.
    const groupIndicesToFetch =
        groupIndicesToFetchMap.reduce((accumulator: number[], shouldFetch, i) => {
          if (shouldFetch) {
            accumulator.push(i);
          }
          return accumulator;
        }, []);

    const fetchUrls: string[] = [];
    groupIndicesToFetch.forEach(i => {
      manifest[i].paths.forEach(filepath => {
        const fetchUrl = filePathPrefix +
            (!filePathPrefix.endsWith('/') ? '/' : '') + filepath;
        fetchUrls.push(fetchUrl);
      });
    });
    const buffers = await fetchWeightsFunction(fetchUrls);

    const weightsTensorMap: tf.NamedTensorMap = {};
    let bufferIndexOffset = 0;
    groupIndicesToFetch.forEach(i => {
      const numBuffers = manifest[i].paths.length;

      let groupBytes = 0;
      for (let i = 0; i < numBuffers; i++) {
        groupBytes += buffers[bufferIndexOffset + i].byteLength;
      }

      // Create a buffer for the whole group.
      const groupBuffer = new ArrayBuffer(groupBytes);
      const groupByteBuffer = new Uint8Array(groupBuffer);
      let groupBufferOffset = 0;
      for (let i = 0; i < numBuffers; i++) {
        const buffer = new Uint8Array(buffers[bufferIndexOffset + i]);
        groupByteBuffer.set(buffer, groupBufferOffset);
        groupBufferOffset += buffer.byteLength;
      }

      const weightsEntries = groupWeightsToFetch[i];
      weightsEntries.forEach(weightsEntry => {
        const byteBuffer = groupBuffer.slice(
            weightsEntry.groupOffset,
            weightsEntry.groupOffset + weightsEntry.sizeBytes);
        const nameToTensorMap =
            tf.io.decodeWeights(byteBuffer, [weightsEntry.manifestEntry]);
        for (const name in nameToTensorMap) {
          weightsTensorMap[name] = nameToTensorMap[name];
        }
      });

      bufferIndexOffset += numBuffers;
    });

    return weightsTensorMap;
  };
}