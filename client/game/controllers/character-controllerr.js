import { playSpriteAnimation, stopSpriteAnimation } from "../../astro-engine/sprites/sprite-animation.js";
import { messageRecieved } from "./network-controller.js";
import { characters } from "./room-controller.js";

messageRecieved("Move", ({ id, x, y }) => {
    if (!characters[id])
        return;

    characters[id].position.x = x;
    characters[id].position.y = y; 
});

messageRecieved("CharacterState", ({ id, flip, moving }) => {
    const character = characters[id];

    if (!character)
        return;

    const characterState = character.components["CharacterState"];

    playSpriteAnimation(moving ? characterState.walkAnimation : characterState.idleAnimation);
    stopSpriteAnimation(moving ? characterState.idleAnimation : characterState.walkAnimation);
    character.flipHorizontally = flip;

});