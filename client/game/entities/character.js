import { gameObject } from "../../astro-engine/core/gameObject.js";
import { characterIdleAnimation, characterWalkAnimation } from "../animations/character-animation.js";
import { characterSprites } from "../sprites/character-sprites.js";

export function createCharacter(x = 0, y = 0) {
    return gameObject({
        size: [200, 200],
        position: [x, y],
        render: characterSprites.idle0,
        components: [
            characterWalkAnimation,
        ]
    });
}