import { Sprite } from "./sprite.js";

export class SpriteAnimation {
    /**
     * A property that returns true when the SpriteAnimation is playing.
     * @type {boolean}
     */
    playing = false;

    /**
     * A read-only property that returns the length of the SpriteAnimation in seconds.
     * @type {number}
     * @readonly
     */
    timeLength = 0;

    /**
     * Shows the progress in seconds of the SpriteAnimation object.
     * @type {number}
     */
    timePosition = 0;

    /**
     * A read-only property that stores all the key frames in the SpriteAnimation object.
     * @type {{[time: number]: Sprite}}
     * @readonly
     */
    keyFrames = {};

    /**
     * A read-only proprety that stores all the timestamps indicating when key frames occer in the animation.
     * @type {number[]}
     */
    timestamps = [];

    /**
     * Determines the speed at which a SpriteAnimation will play.
     * @type {number}
     */
    playbackSpeed = 1;

    /**
     * Sets wether the animation will repeat after finishing.
     * @type {boolean} 
     */
    loop = false;

    /**
     * @param {{[time: number]: Sprite}} keyFrames The key frames in the SpriteAnimation object.
     * @param {number} timeLength The length of the SpriteAnimation in seconds.
     * @param {boolean} loop Sets wether the animation will repeat after finishing (false by default).
     */
    constructor(keyFrames, timeLength, loop = false) {
        this.keyFrames = keyFrames;
        this.timeLength = timeLength;
        this.loop = loop;

        for (const timestamp in keyFrames) 
            this.timestamps.push(timestamp);
    }

    flip() {
        const keyFrames = {};

        for (const timestamp in this.keyFrames)
            keyFrames[timestamp] = keyFrames[timestamp].i

    }

    stop() {
        this.playing = false;
    }

    play() {
        this.playing = true;
    }
}