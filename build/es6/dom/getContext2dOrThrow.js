import { env } from '../env';
import { resolveInput } from './resolveInput';
export function getContext2dOrThrow(canvasArg) {
    var _a = env.getEnv(), Canvas = _a.Canvas, CanvasRenderingContext2D = _a.CanvasRenderingContext2D;
    if (canvasArg instanceof CanvasRenderingContext2D) {
        return canvasArg;
    }
    var canvas = resolveInput(canvasArg);
    if (!(canvas instanceof Canvas)) {
        throw new Error('resolveContext2d - expected canvas to be of instance of Canvas');
    }
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('resolveContext2d - canvas 2d context is null');
    }
    return ctx;
}
//# sourceMappingURL=getContext2dOrThrow.js.map