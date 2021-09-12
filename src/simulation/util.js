import * as THREE from 'three';

/**
 * Piecewise linear interpolation of the y value at x, given x and y
 * coordinates defining points on the piecewise line
 * @param {number} x x coordinate to interpolate y value
 * @param {Array} xp x coordinates
 * @param {Array} yp y coordinates
 * @returns {number}
 */
export function interp(x, xp, yp) {
    if (Array.isArray(x)) return x.map(value => interp(value, xp, yp));
    if (x < xp[0]) return yp[0];
    let a = 0, b = 1;
    for (; a < xp.length - 1; a++, b++) {
        if (xp[a + 1] > x) {
            return (yp[a] * (xp[b] - x) + yp[b] * (x - xp[a])) / (xp[b] - xp[a]);
        }
    }
    return yp[yp.length - 1];
}

export function vec3(x, y, z) {
    return new THREE.Vector3(x, y, z);
}

export function mat3(a1, a2, a3, b1, b2, b3, c1, c2, c3) {
    return new THREE.Matrix3().set(a1, a2, a3, b1, b2, b3, c1, c2, c3);
}