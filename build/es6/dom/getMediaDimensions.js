import { Dimensions } from '../classes/Dimensions';
import { env } from '../env';
export function getMediaDimensions(input) {
    var _a = env.getEnv(), Image = _a.Image, Video = _a.Video;
    if (input instanceof Image) {
        return new Dimensions(input.naturalWidth, input.naturalHeight);
    }
    if (input instanceof Video) {
        return new Dimensions(input.videoWidth, input.videoHeight);
    }
    return new Dimensions(input.width, input.height);
}
//# sourceMappingURL=getMediaDimensions.js.map