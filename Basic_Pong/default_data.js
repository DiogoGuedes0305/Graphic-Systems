import * as THREE from "three";

export const gameData = {
    color: 0xffffff,
    position: new THREE.Vector2(0.0, 0.0),
    scale: 1.0,
    end: 10,
    keyCodes: { start: "Space", pause: "Space" } // Start and pause/resume keys
}

export const tableData = {
    color: 0xffffff,
    size: new THREE.Vector2(1.9, 1.4),
    dashes: 16 // Net (a dashed line segment)
}

export const playerData = {
    color: 0xffffff,
    side: undefined, // Left side: "left"; right side: "right"; automatically set by Pong()
    size: new THREE.Vector2(0.05, 0.2),
    speed: 1.0,
    baseline: 0.95, // % of (table.size.x / 2.0)
    keyCodes: { down: "ArrowDown", up: "ArrowUp" } // Arrow keys; MUST BE REDEFINED when creating an instance of Pong() so that each player is assigned a different set of keys
}

export const ballData = {
    color: 0xffffff,
    radius: 0.025,
    // speed: 1.125,
    speed: 0.8,
    directionMax: Math.PI / 3.0 // 60.0 degrees
}