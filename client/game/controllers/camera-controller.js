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

        if (character.position.x > rightBound) 
            camera.position.x = character.position.x - moveTolerance; 
        else if (character.position.x < leftBound)
            camera.position.x = character.position.x + moveTolerance; 

        if (character.position.y > topBound)
            camera.position.y = character.position.y - moveTolerance;
        else if (character.position.y < bottomBound)
            camera.position.y = character.position.y + moveTolerance;
    }
});