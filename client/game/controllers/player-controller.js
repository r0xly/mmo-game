import { update } from "../../astro-engine/astro.js";
import { addPosition, deleteObject } from "../../astro-engine/core/gameObject.js";
import { keyDown, keyUp } from "../../astro-engine/core/input.js";
import { Vector } from "../../astro-engine/util/vector.js";
import { createCharacter } from "../objects/character.js";
import { sendMessage } from "./network-controller.js";

const PLAYER_LAYER = 2;

export let walkSpeed = 300;
export let moveDirection = Vector.Zero;
export let character;

export function loadPlayer() {
    if (character)
        deleteObject(character);

    character = createCharacter();
    character.layer = PLAYER_LAYER;
}

// player movement

keyDown(key => {
    moveDirection.x = key === "a" ? -1 : key === "d" ? 1 : moveDirection.x;
    moveDirection.y = key === "w" ? 1 : key === "s" ? -1 : moveDirection.y;
});

keyUp(key => {
    moveDirection.x = (key === "a" || key === "d") ? 0 : moveDirection.x;
    moveDirection.y = (key === "w" || key === "s") ? 0 : moveDirection.y;
});

update(deltaTime => {
    const characterData = character.components["CharacterData"];

    sendMessage("CharacterState", {
        flip: characterData.flip,
        moving: characterData.moving
    });

    if (!character || moveDirection.magnitude === 0)
        return characterData.moving = false;

    characterData.moving = true;
    characterData.flip = moveDirection.x < 0;
    
    addPosition(character, moveDirection.unit.mul(walkSpeed * deltaTime));
    sendMessage("Move", { 
        x: character.position.x, 
        y: character.position.y 
    });
});