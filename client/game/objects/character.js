import { addComponent, gameObject } from "../../astro-engine/core/gameObject.js";
import { keyDown, mouseDown } from "../../astro-engine/core/input.js";
import { TextLabel } from "../../astro-engine/core/text-label.js";
import { createSpriteAnimation, playSpriteAnimation } from "../../astro-engine/sprites/sprite-animation.js";
import { characterSprites } from "../sprites/character-sprites.js";

const idleAnimationData = {
    loop: true,
    playOnCreation: true,
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

const swingAnimationData = {
    timeLength: 0.4,
    priority: 100,
    keyFrames: {
        [0]: characterSprites.swing0,
        [0.1]: characterSprites.swing1,
        [0.2]: characterSprites.swing2,
        [0.3]: characterSprites.swing3
    }
}

class CharacterState {
    moving = false;
    flip = false;

    constructor(gameObject) {
        this.walkAnimation = createSpriteAnimation(walkAnimationData, gameObject);
        this.swingAnimation = createSpriteAnimation(swingAnimationData, gameObject);
    }
}

export function createCharacter({ x, y, username }) {
    const character = gameObject({
        size: [200, 200],
        position: [x, y],
        render: characterSprites.idle0
    });

    gameObject({
        size: [500, 25],
        position: [0, -90],
        alpha: 0.5,
        render: new TextLabel(username, "bold 20px monospace", "black", "center"),
        parent: character
    })

    addComponent(character, new CharacterState(character));
createSpriteAnimation(idleAnimationData, character);
    const swing = createSpriteAnimation(swingAnimationData, character);

    mouseDown(() => {
        playSpriteAnimation(swing);
    })

    return character;
}