import { fetchNetWeights } from '../../src/dom/fetchNetWeights';

describe('fetchNetWeights', () => {

  it('fetches .weights file', async () => {
    const url = 'base/test/dummy.weights'
    const weights = await fetchNetWeights(url)
    expect(weights instanceof Float32Array).toBe(true)
  })

})
