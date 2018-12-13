import { createBrowserEnv } from './createBrowserEnv';
import { createFileSystem } from './createFileSystem';
import { createNodejsEnv } from './createNodejsEnv';
import { isBrowser } from './isBrowser';
import { isNodejs } from './isNodejs';
import { Environment } from './types';
export declare const env: {
    getEnv: () => Environment;
    setEnv: (env: Environment) => void;
    initialize: () => void;
    createBrowserEnv: typeof createBrowserEnv;
    createFileSystem: typeof createFileSystem;
    createNodejsEnv: typeof createNodejsEnv;
    monkeyPatch: (env: Partial<Environment>) => void;
    isBrowser: typeof isBrowser;
    isNodejs: typeof isNodejs;
};
export * from './types';
