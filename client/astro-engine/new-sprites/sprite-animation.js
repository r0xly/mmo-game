/**
 * @typedef {Object} SpriteAnimationData
 * @property {[timePositin: number] : Sprite } keyFrames
 * @property {boolean} playOnCreation
 * @property {number} timeLength
 * @property {number} priority
 */


class SpriteAnimation {
    constructor(animationData, gameObjects) {
        this.animationData = animationData;
        this.gameObjects = gameObjects;
    }
    
    play() {

    }

    stop() {

    }
}

/**
 * @param {SpriteAnimation} animationData 
 * @param  {...import("../core/gameObject").GameObject} gameObjects 
 * @returns 
 */
export function createSpriteAnimation(animationData, ...gameObjects) {
    const animation = new SpriteAnimation(animationData, gameObjects);

    return animation;
}
