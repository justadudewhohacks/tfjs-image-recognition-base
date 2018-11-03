import { env } from '../env';
export function isMediaLoaded(media) {
    var _a = env.getEnv(), Image = _a.Image, Video = _a.Video;
    return (media instanceof Image && media.complete)
        || (media instanceof Video && media.readyState >= 3);
}
//# sourceMappingURL=isMediaLoaded.js.map