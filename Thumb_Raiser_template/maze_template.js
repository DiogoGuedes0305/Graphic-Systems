import * as THREE from "three";
import Ground from "./ground_template.js";
import Wall from "./wall_template.js";

/*
 * parameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 */

export default class Maze {
    constructor(parameters) {
        function onLoad(maze, description) {
            // Store the maze's map and size
            maze.map = description.map;
            maze.size = description.size;

            // Store the player's initial position and direction
            maze.initialPosition = maze.cellToCartesian(description.initialPosition);
            maze.initialDirection = description.initialDirection;

            // Store the maze's exit location
            maze.exitLocation = maze.cellToCartesian(description.exitLocation);

            // Create a group of objects
            maze.object = new THREE.Group();

            // Create the ground
            maze.ground = new Ground({ textureUrl: description.groundTextureUrl, size: description.size });
            maze.object.add(maze.ground.object);

            // Create a wall
            maze.wall = new Wall({ textureUrl: description.wallTextureUrl });

            // Build the maze
            let wallObject;
            for (let i = 0; i <= description.size.width; i++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
                for (let j = 0; j <= description.size.height; j++) { // In order to represent the southmost walls, the map height is one row greater than the actual maze height
                    /*
                     *  description.map[][] | North wall | West wall
                     * --------------------+------------+-----------
                     *          0          |     No     |     No
                     *          1          |     No     |    Yes
                     *          2          |    Yes     |     No
                     *          3          |    Yes     |    Yes
                     */
                    /* To-do #5 - Create the north walls
                        - cell coordinates: i (column) and j (row)
                        - map: description.map[][]
                        - maze width: description.size.width
                        - maze height: description.size.height*/
                    if (description.map[j][i] == 2 || description.map[j][i] == 3) {
                        wallObject = maze.wall.object.clone();
                        wallObject.position.set(i - description.size.width/2 + 0.5, 0.5, j - description.size.height/2);
                        maze.object.add(wallObject);
                    }
                    /* To-do #6 - Create the west walls
                        - cell coordinates: i (column), j (row)
                        - map: description.map[][]
                        - maze width: description.size.width
                        - maze height: description.size.height*/
                    if (description.map[j][i] == 1 || description.map[j][i] == 3) {
                        wallObject = maze.wall.object.clone();
                        wallObject.position.set(i - description.size.width/2, 0.5, j - description.size.height/2+0.5);
                        wallObject.rotateY(Math.PI/2);
                        maze.object.add(wallObject);
                    }
                }
            }

            maze.object.scale.set(maze.scale.x, maze.scale.y, maze.scale.z);
            maze.loaded = true;
        }

        function onProgress(url, xhr) {
            console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
        }

        function onError(url, error) {
            console.error("Error loading resource " + url + " (" + error + ").");
        }

        for (const [key, value] of Object.entries(parameters)) {
            Object.defineProperty(this, key, { value: value, writable: true, configurable: true, enumerable: true });
        }
        this.loaded = false;

        // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
        THREE.Cache.enabled = true;

        // Create a resource file loader
        const loader = new THREE.FileLoader();

        // Set the response type: the resource file will be parsed with JSON.parse()
        loader.setResponseType("json");

        // Load a maze description resource file
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            description => onLoad(this, description),

            // onProgress callback
            xhr => onProgress(this.url, xhr),

            // onError callback
            error => onError(this.url, error)
        );
    }

    // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
    cellToCartesian(position) {
        return new THREE.Vector3((position[1] - this.size.height / 2.0 + 0.5) * this.scale.x, 0.0, (position[0] - this.size.width / 2.0 + 0.5) * this.scale.z)
    }

    // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
    cartesianToCell(position) {
        return [Math.floor(position.z / this.scale.z + this.size.width / 2.0), Math.floor(position.x / this.scale.x + this.size.height / 2.0)];
    }

    /* To-do #23 - Measure the player’s distance to the walls
        - player position: position*/
    distanceToWestWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToEastWall(position) {
        const indices = this.cartesianToCell(position);
        indices[1]++;
        if (this.map[indices[0]][indices[1]] == 0 || this.map[indices[0]][indices[1]] == 2) {
            return position.x + this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToNorthWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3) {
            return position.z + this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    distanceToSouthWall(position) {
        const indices = this.cartesianToCell(position);
        indices[0]++;
        if (this.map[indices[0]][indices[1]] == 0 || this.map[indices[0]][indices[1]] == 1) {
            return position.z + this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    } 

    foundExit(position) {
        return false;
        /* To-do #42 - Check if the player found the exit
            - assume that the exit is found if the distance between the player position and the exit location is less than (0.5 * maze scale) in both the X- and Z-dimensions
            - player position: position
            - exit location: this.exitLocation
            - maze scale: this.scale
            - remove the previous instruction and replace it with the following one (after completing it)*/
        //return (this.exitLocation.x - this.position.x < 0.5 * this.scale) && (this.exitLocation.z - this.position.z < 0.5 * this.scale);
    };
}