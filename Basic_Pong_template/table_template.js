import * as THREE from "three";

/*
 * parameters = {
 *  color: Integer,
 *  size: Vector2,
 *  dashes: Integer
 * }
 */

export default class Table extends THREE.Group {
    constructor(parameters) {
        super();

        for (const [key, value] of Object.entries(parameters)) {
            Object.defineProperty(this, key, { value: value, writable: true, configurable: true, enumerable: true });
        }
        this.halfSize = this.size.clone().divideScalar(2.0);

        // Create the table (a bottom line, a top line and the net)

        // Create the bottom line and the top line (two line segments)
        let points = [
            new THREE.Vector2(-this.halfSize.x, -this.halfSize.y),
            new THREE.Vector2(this.halfSize.x, -this.halfSize.y),
            new THREE.Vector2(-this.halfSize.x, this.halfSize.y),
            new THREE.Vector2(this.halfSize.x, this.halfSize.y),
        ];
        let geometry = new THREE.BufferGeometry().setFromPoints(points);
        let material = new THREE.LineBasicMaterial({ color: this.color });
        let lines = new THREE.LineSegments(geometry, material);
        this.add(lines);

        /* To-do #1 - Create the net (a dashed line segment) with properties defined by the following parameters:
            - end points coordinates: (0.0, -this.halfSize.y) and (0.0, this.halfSize.y)
            - color: this.color
            - dashSize and gapSize: this.size.y / (2.0 * this.dashes - 1.0)

            - follow the instructions in this example to create the dashed line: https://threejs.org/examples/webgl_lines_dashed.html
        */
        geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector2(0.0, -this.halfSize.y),new THREE.Vector2(0.0, this.halfSize.y)]);
        material = new THREE.LineDashedMaterial({
            color: this.color,
            dashSize: this.size.y / (2.0 * this.dashes - 1.0),
            gapSize: this.size.y / (2.0 * this.dashes - 1.0)
        });
        lines = new THREE.LineSegments(geometry,material);
        lines.computeLineDistances();
        this.add(lines);
    }
}