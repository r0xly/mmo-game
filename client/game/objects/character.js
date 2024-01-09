import { addComponent, gameObject } from "../../astro-engine/core/gameObject.js";
import { createSpriteAnimation, playSpriteAnimation } from "../../astro-engine/sprites/sprite-animation.js";
import { characterSprites } from "../sprites/character-sprites.js";

const idleAnimationData = {
    loop: true,
    playbackSpeed: 0.2,
    timeLength:0.2,
    keyFrames: {
        [0]: characterSprites.idle0,
        [0.1]: characterSprites.idle3,
    }
};

const walkAnimationData = {
    loop: true,
    timeLength: 0.6,
    playbackSpeed: 0.9,
    priority: 10,
    keyFrames: {
        [0]: characterSprites.walk0,
        [0.1]: characterSprites.walk1,
        [0.2]: characterSprites.walk2,
        [0.3]: characterSprites.walk3,
        [0.4]: characterSprites.walk4,
        [0.5]: characterSprites.walk5,
    }
};

class CharacterData {
    moving = false;
    flip = false;

    constructor(gameObject) {
        this.walkAnimation = createSpriteAnimation(walkAnimationData, gameObject);
        this.idleAnimation = createSpriteAnimation(idleAnimationData, gameObject);
    }
}

export function createCharacter(x = 0, y = 0) {
    const character = gameObject({
        size: [200, 200],
        position: [x, y],
        render: characterSprites.idle0
    });

    addComponent(character, new CharacterData(character));

    return character;
}