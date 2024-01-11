import { update } from "../../astro-engine/astro.js";
import { camera } from "../../astro-engine/core/camera.js"
import { gameObject } from "../../astro-engine/core/gameObject.js";
import { keyDown } from "../../astro-engine/core/input.js"
import { character } from "./player-controller.js";

/** 
window.onwheel = function(event) {
    console.log(event.deltaY)
} 
*/
const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

const moveTolerance = 100;

keyDown(key => {
    if (key === "i") {
        camera.zoom *= 1.5;
    } else if (key === "o") {
        camera.zoom /= 1.5;
    }
})



update(delatTime => {
    if (character) {
        const leftBound = camera.position.x - moveTolerance;
        const rightBound = camera.position.x + moveTolerance;
        const topBound = camera.position.y + moveTolerance;
        const bottomBound = camera.position.y - moveTolerance;

        let x = camera.position.x;

        if (character.position.x > rightBound) 
            x = character.position.x - moveTolerance; 
        else if (character.position.x < leftBound)
            x = character.position.x + moveTolerance; 

        camera.position.x = x;

        if (character.position.y > topBound)
            camera.position.y = character.position.y - moveTolerance;
        else if (character.position.y < bottomBound)
            camera.position.y = character.position.y + moveTolerance;
    }
});