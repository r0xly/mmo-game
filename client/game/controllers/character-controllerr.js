import { update } from "../../astro-engine/astro.js";
import { queryObjects } from "../../astro-engine/core/gameObject.js";
import { playSpriteAnimation, stopSpriteAnimation } from "../../astro-engine/new-sprites/sprite-animation.js";

update(deltaTime => {
    queryObjects("CharacterData").forEach(([gameObject, characterData]) => {
        if (characterData.moving) {
            playSpriteAnimation(characterData.walkAnimation);
            stopSpriteAnimation(characterData.idleAnimation);
        } else {
            stopSpriteAnimation(characterData.walkAnimation);
            playSpriteAnimation(characterData.idleAnimation);
        }

        gameObject.flipRender = characterData.flip;
    });
});