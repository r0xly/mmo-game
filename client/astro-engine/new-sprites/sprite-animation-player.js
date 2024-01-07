import { update } from "../astro.js";
import { gameObject } from "../core/gameObject";

export const activeSpriteAnimation = [];

function isHighestPriority(aniamtion, gameObject) {
    return true;
}

function updateAnimationFrame(animation) {

}

function resetAnimation(animation) {
    animation.playing = animation.loop;
}

function updateAnimation(animation, deltaTime) {
    if (!animation.playing)
        return;
    else if (animation.timePosition > animation.timeLength) 
        return resetAnimation(animation);

    animation.timePosition += deltaTime * animation.playbackSpeed;
}


update(deltaTime =>
    activeSpriteAnimation.forEach(animaton => updateAnimation(animaton, deltaTime))
);