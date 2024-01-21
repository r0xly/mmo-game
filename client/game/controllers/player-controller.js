import { update } from "../../astro-engine/astro.js";
import { camera } from "../../astro-engine/core/camera.js";
import { addPosition, deleteObject, gameObject } from "../../astro-engine/core/gameObject.js";
import { keyDown, keyUp } from "../../astro-engine/core/input.js";
import { playSpriteAnimation, stopSpriteAnimation } from "../../astro-engine/sprites/sprite-animation.js";
import { Vector } from "../../astro-engine/util/vector.js";
import { createCharacter } from "../objects/character.js";
import { messageRecieved, sendMessage } from "./network-controller.js";

export let walkSpeed = 300;
export let moveDirection = Vector.Zero;
export let character;
export let playerData;

export function loadPlayer() {
    console.log(playerData);
    if (character)
        deleteObject(character);

    character = createCharacter(playerData);
}


keyDown(key => {
    moveDirection.x = key === "a" ? -1 : key === "d" ? 1 : moveDirection.x;
    moveDirection.y = key === "w" ? 1 : key === "s" ? -1 : moveDirection.y;
});

keyUp(key => {
    moveDirection.x = (key === "a" || key === "d") ? 0 : moveDirection.x;
    moveDirection.y = (key === "w" || key === "s") ? 0 : moveDirection.y;
});

update(deltaTime => {
    if (!character)
        return;

    const characterData = character.components["CharacterState"];
    (characterData.moving ? playSpriteAnimation : stopSpriteAnimation)(characterData.walkAnimation);

    sendMessage("CharacterState", {
        flip: characterData.flip,
        moving: characterData.moving
    });

    if (moveDirection.magnitude === 0)
        return characterData.moving = false;
    
    characterData.moving = true;
    characterData.flip = moveDirection.x < 0;
    character.flipHorizontally = characterData.flip;
    
    addPosition(character, moveDirection.unit.mul(walkSpeed * deltaTime));
    sendMessage("Move", { 
        x: character.position.x, 
        y: character.position.y 
    });
});

messageRecieved("ConnectionData", data  => {
    playerData = data.playerData;
});