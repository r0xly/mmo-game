import { update } from "../astro.js";
import { queryObjects } from "../core/gameObject.js";

class SpriteAnimationMetaData {
    static MetaData = new Map();

    static get(gameObject, animation) {
        let metaData = this.MetaData.get(gameObject);

        if (!metaData) {
            metaData = new SpriteAnimationMetaData();
            metaData.originalSprite = gameObject.render;
            metaData.nextKeyFrameTime = animation.timestamps[0];
            metaData.gameObject = gameObject;
            metaData.currentFrameIndex = -1;

            this.MetaData.set(gameObject, metaData);
        }
        
        return metaData;
    }

    delete() {
        SpriteAnimationMetaData.MetaData.delete(this.gameObject);
    }
}

function endAnimation(animation, metaData)  {
    metaData.gameObject.render = metaData.originalSprite;
    animation.timePosition = 0;
    metaData.delete();
}

function updateAnimationFrame(animation, metaData) {
    metaData.currentFrameIndex++;
    metaData.nextKeyFrameTime = animation.timestamps[metaData.currentFrameIndex + 1];
    metaData.gameObject.render = animation.keyFrames[animation.timestamps[metaData.currentFrameIndex]];
}

function updateAnimation(gameObject, animation, deltaTime) {
    let metaData = SpriteAnimationMetaData.get(gameObject, animation);
    
    animation.timePosition += deltaTime * animation.playbackSpeed;
    
    // checks if animation should loop or just end when the animation is over
    if (animation.timePosition > animation.timeLength) {
        endAnimation(animation, metaData);

        if (animation.loop)
            animation.play();
    }
    else if (animation.timePosition >= metaData.nextKeyFrameTime)
        updateAnimationFrame(animation, metaData);
}

update(deltaTime => {
    for (const [object, animation] of queryObjects("SpriteAnimation")) {
        if (animation.playing)
            updateAnimation(object, animation, deltaTime)
    }
});

export {};