import { isMediaLoaded } from './isMediaLoaded';
export function awaitMediaLoaded(media) {
    return new Promise(function (resolve, reject) {
        if (media instanceof HTMLCanvasElement || isMediaLoaded(media)) {
            return resolve();
        }
        function onLoad(e) {
            if (!e.currentTarget)
                return;
            e.currentTarget.removeEventListener('load', onLoad);
            e.currentTarget.removeEventListener('error', onError);
            resolve(e);
        }
        function onError(e) {
            if (!e.currentTarget)
                return;
            e.currentTarget.removeEventListener('load', onLoad);
            e.currentTarget.removeEventListener('error', onError);
            reject(e);
        }
        media.addEventListener('load', onLoad);
        media.addEventListener('error', onError);
    });
}
//# sourceMappingURL=awaitMediaLoaded.js.map