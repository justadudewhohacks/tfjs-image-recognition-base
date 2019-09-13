import { fetchImage, fetchJson } from '../src';
import { TestEnv } from './Environment';

async function loadImageBrowser(uri: string): Promise<HTMLImageElement> {
  return fetchImage(`base${uri.startsWith('/') ? '' : '/'}${uri}`)
}

async function loadJsonBrowser<T>(uri: string): Promise<T> {
  return fetchJson<T>(`base${uri.startsWith('/') ? '' : '/'}${uri}`)
}

const browserTestEnv: TestEnv = {
  loadImage: loadImageBrowser,
  loadJson: loadJsonBrowser
}

export function getTestEnv(): TestEnv {
  return global['nodeTestEnv'] || browserTestEnv
}
