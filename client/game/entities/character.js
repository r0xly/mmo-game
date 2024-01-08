import { gameObject } from "../../astro-engine/core/gameObject.js";
import { createSpriteAnimation } from "../../astro-engine/new-sprites/sprite-animation.js";
import { characterSprites } from "../sprites/character-sprites.js";

const idleAnimation = createSpriteAnimation({
    loop: true,
    playOnCreation: true,
    playbackSpeed: 0.2,
    timeLength:0.2,
    keyFrames: {
        [0]: characterSprites.idle0,
        [0.1]: characterSprites.idle3,
    }

})


export function createCharacter(x = 0, y = 0) {
    const character = gameObject({
        size: [200, 200],
        position: [x, y],
        render: characterSprites.idle0,
        components: []
    });

    idleAnimation.gameObjects.push(character);

    return character;
}