import { __spreadArrays } from "tslib";
import * as tf from '@tensorflow/tfjs-core';
export function normalize(x, meanRgb) {
    return tf.tidy(function () {
        var r = meanRgb[0], g = meanRgb[1], b = meanRgb[2];
        var avg_r = tf.fill(__spreadArrays(x.shape.slice(0, 3), [1]), r);
        var avg_g = tf.fill(__spreadArrays(x.shape.slice(0, 3), [1]), g);
        var avg_b = tf.fill(__spreadArrays(x.shape.slice(0, 3), [1]), b);
        var avg_rgb = tf.concat([avg_r, avg_g, avg_b], 3);
        return tf.sub(x, avg_rgb);
    });
}
//# sourceMappingURL=normalize.js.map