import * as THREE from "three";

/*
 * parameters = {
 *  enabled: Boolean,
 *  color: Integer,
 *  near: Float,
 *  far: Float
 * }
 */

export default class Fog {
    constructor(parameters) {
        for (const [key, value] of Object.entries(parameters)) {
            Object.defineProperty(this, key, { value: value, writable: true, configurable: true, enumerable: true });
        }

        /* To-do #38 - Create the fog
            - fog color: this.color
            - near: this.near (the minimum distance to start applying fog)
            - far: this.far (the maximum distance at which fog stops being calculated and applied)*/
        this.object = new THREE.Fog(this.color, this.near, this.far);
    }
}