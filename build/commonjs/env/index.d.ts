import { isNodejs } from './isNodejs';
import { Environment } from './types';
export declare const env: {
    getEnv: () => Environment;
    initialize: () => void;
    monkeyPatch: (env: Partial<Environment>) => void;
    isNodejs: typeof isNodejs;
};
export * from './types';
