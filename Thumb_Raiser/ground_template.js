import * as THREE from "three";

/*
 * parameters = {
 *  textureUrl: String,
 *  size: Vector2
 * }
 */

export default class Ground {
    constructor(parameters) {
        for (const [key, value] of Object.entries(parameters)) {
            Object.defineProperty(this, key, { value: value, writable: true, configurable: true, enumerable: true });
        }

        // Create a texture
        /* To-do #1 - Load the ground texture image
            - image location: this.textureUrl*/
        const texture = new THREE.TextureLoader().load(this.textureUrl);
        /* To-do #2 - Set the texture wrapping modes:
            - horizontally (S): repeat this.size.width times
            - vertically (T): repeat this.size.height times*/
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(this.size.width, this.size.height);
        /* To-do #3 - Configure the magnification and minification filters:
            - magnification filter: linear
            - minification filter: mipmapping and trilinear*/
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipMapLinearFilter; 

        // Create a ground box that receives shadows but does not cast them
        const geometry = new THREE.PlaneGeometry(this.size.width, this.size.height);
        /* To-do #4 - Assign the texture to the material's color map:
            - map: texture */
        const material = new THREE.MeshPhongMaterial({ color: 0xffffff, map:texture});
        // Ou -> material.map = texture;
        this.object = new THREE.Mesh(geometry, material);
        this.object.rotation.x = -Math.PI / 2.0;
        /* To-do #33 - Set the ground box to receive shadows but not cast them*/
        this.object.castShadow = false;
        this.object.receiveShadow = true; 
    }
}