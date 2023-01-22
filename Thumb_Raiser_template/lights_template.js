import * as THREE from "three";

/*
 * parameters = {
 *  ambientLight: { color: Integer, intensity: Float },
 *  pointLight1: { color: Integer, intensity: Float, distance: Float, position: Vector3 },
 *  pointLight2: { color: Integer, intensity: Float, distance: Float, position: Vector3 },
 *  spotLight: { color: Integer, intensity: Float, distance: Float, angle: Float, penumbra: Float, position: Vector3, direction: Float }
 * }
 */

export default class Lights {
    constructor(parameters) {
        for (const [key, value] of Object.entries(parameters)) {
            Object.defineProperty(this, key, { value: value, writable: true, configurable: true, enumerable: true });
        }

        // Create a group of objects
        this.object = new THREE.Group();

        // Create the ambient light
        this.object.ambientLight = new THREE.AmbientLight(this.ambientLight.color, this.ambientLight.intensity);

        this.object.add(this.object.ambientLight);

        /* To-do #26 - Create the first point light and set its position in the scene
            - light color: this.pointLight1.color
            - light intensity: this.pointLight1.intensity
            - light distance: this.pointLight1.distance
            - light position: this.pointLight1.position.x, this.pointLight1.position.y, this.pointLight1.position.z*/
            this.object.pointLight1 = new THREE.PointLight(this.pointLight1.color, this.pointLight1.intensity, this.pointLight1.distance);
            this.object.pointLight1.position.set(this.pointLight1.position.x, this.pointLight1.position.y, this.pointLight1.position.z);

        /* To-do #31 - Turn on shadows for this light and set its properties:
            - shadow map width: 512
            - shadow map height: 512
            - shadow camera near plane: 5.0
            - shadow camera far plane: 15.0*/

        this.object.pointLight1.castShadow = true;

        // Set up shadow properties for this light
        this.object.pointLight1.shadow.mapSize.width = 512;
        this.object.pointLight1.shadow.mapSize.height = 512;
        this.object.pointLight1.shadow.camera.near = 0.5;
        this.object.pointLight1.shadow.camera.far = 15.0;
        /* To-do #28 - Add this light to the scene*/
        this.object.add(this.object.pointLight1);

        /* To-do #27 - Create the second point light and set its position in the scene
            - light color: this.pointLight2.color
            - light intensity: this.pointLight2.intensity
            - light distance: this.pointLight2.distance
            - light position: this.pointLight2.position.x, this.pointLight2.position.y, this.pointLight2.position.z*/
            this.object.pointLight2 = new THREE.PointLight(this.pointLight2.color, this.pointLight2.intensity, this.pointLight2.distance);
            this.object.pointLight2.position.set(this.pointLight2.position.x, this.pointLight2.position.y, this.pointLight2.position.z);

        /* To-do #32 - Turn on shadows for this light and set its properties:
            - shadow map width: 512
            - shadow map height: 512
            - shadow camera near plane: 5.0
            - shadow camera far plane: 15.0*/

        this.object.pointLight2.castShadow = true;

        // Set up shadow properties for this light
        this.object.pointLight2.shadow.mapSize.width = 512;
        this.object.pointLight2.shadow.mapSize.height = 512;
        this.object.pointLight2.shadow.camera.near = 0.5;
        this.object.pointLight2.shadow.camera.far = 15.0;
        /* To-do #29 - Add this light to the scene*/
        this.object.add(this.object.pointLight2);
    }
}