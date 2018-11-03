import { env } from '../env';
export function isMediaElement(input) {
    var _a = env.getEnv(), Image = _a.Image, Canvas = _a.Canvas, Video = _a.Video;
    return input instanceof Image
        || input instanceof Canvas
        || input instanceof Video;
}
//# sourceMappingURL=isMediaElement.js.map