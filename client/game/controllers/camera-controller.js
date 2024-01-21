import { update } from "../../astro-engine/astro.js";
import { camera } from "../../astro-engine/core/camera.js"
import { gameObject } from "../../astro-engine/core/gameObject.js";
import { keyDown } from "../../astro-engine/core/input.js"
import { character } from "./player-controller.js";

window.onwheel = function(event) {
    if (event.deltaY > 0)
        camera.zoom /= 1.25;
    else 
        camera.zoom *= 1.25;

} 


const cameraMoveTolerance = 100;

keyDown(key => {
    if (key === "i") {
        camera.zoom *= 1.5;
    } else if (key === "o") {
        camera.zoom /= 1.5;
    }
})



update(delatTime => {
    if (!character)
        return;

    
    /** looks weird because camera if off center
    (reimplement when character sprite updated)
    const directionFromCenter = character.position.sub(camera.position).unit;
    const distanceFromCenter = Math.floor(character.position.sub(camera.position).magnitude);

    if (distanceFromCenter > cameraMoveTolerance) {
        camera.position.x = character.position.x - (directionFromCenter.x * cameraMoveTolerance)
        camera.position.y = character.position.y - (directionFromCenter.y * cameraMoveTolerance)
    }
    */

    const leftBound = camera.position.x - cameraMoveTolerance;
    const rightBound = camera.position.x + cameraMoveTolerance;
    const topBound = camera.position.y + cameraMoveTolerance;
    const bottomBound = camera.position.y - cameraMoveTolerance;

    let x = camera.position.x;

    if (character.position.x > rightBound)
        x = character.position.x - cameraMoveTolerance;
    else if (character.position.x < leftBound)
        x = character.position.x + cameraMoveTolerance;

    camera.position.x = x;

    if (character.position.y > topBound)
        camera.position.y = character.position.y - cameraMoveTolerance;
    else if (character.position.y < bottomBound)
        camera.position.y = character.position.y + cameraMoveTolerance;

});