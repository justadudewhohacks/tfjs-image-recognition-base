import { initializeBrowserEnv, initializeNodejsEnv } from './initialize';
import { isBrowser } from './isBrowser';
import { isNodejs } from './isNodejs';
import { Environment } from './types';
export declare const env: {
    getEnv: () => Environment;
    initialize: () => void;
    initializeBrowserEnv: typeof initializeBrowserEnv;
    initializeNodejsEnv: typeof initializeNodejsEnv;
    monkeyPatch: (env: Partial<Environment>) => void;
    isBrowser: typeof isBrowser;
    isNodejs: typeof isNodejs;
};
export * from './types';
