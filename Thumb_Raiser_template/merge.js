import { Vector2, Vector3, Vector4, Color } from "three";

// Shallow / deep merge objects and arrays (with the exception of Vector2, Vector3, Vector4 and Color objects)
export default function merge(deep, ...sources) {
    let target = {};
    for (let i = 0; i < sources.length; i++) {
        let source = sources[i];
        if (deep) {
            for (let key in source) {
                const value = source[key];
                if (Array.isArray(value)) {
                    if (target[key] === undefined) {
                        target[key] = [];
                    }
                    target[key] = target[key].concat(value);
                }
                else if (value instanceof Object && !(value instanceof Vector2) && !(value instanceof Vector3) && !(value instanceof Vector4) && !(value instanceof Color)) {
                    target[key] = merge(true, target[key], value);
                }
                else {
                    target[key] = value;
                }
            }
        }
        else {
            target = Object.assign(target, source);
        }
    }
    return target;
}