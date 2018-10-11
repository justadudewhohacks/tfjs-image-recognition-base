import { fetchJson } from '../../src/dom/fetchJson';

describe('fetchJson', () => {

  it('fetches json', async () => {
    const url = 'base/test/boxes.json'
    expect(async () => await fetchJson(url)).not.toThrow()
  })

})
