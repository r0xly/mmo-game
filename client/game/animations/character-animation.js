import { SpriteAnimation } from "../../astro-engine/sprites/spriteAnimation.js";
import { characterSprites } from "../sprites/character-sprites.js";

export const characterIdleAnimation = new SpriteAnimation({
    [0]: characterSprites.idle0,
    [1]: characterSprites.idle1,
    [2]: characterSprites.idle2,
    [3]: characterSprites.idle3,
    [4]: characterSprites.idle4,
    [5]: characterSprites.idle5,
    [6]: characterSprites.idle4,
    [7]: characterSprites.idle3,
    [8]: characterSprites.idle2,
    [9]: characterSprites.idle1,
}, 10, true);

export const characterWalkAnimation = new SpriteAnimation({
    [0]: characterSprites.walk0,
    [0.1]: characterSprites.walk1,
    [0.2]: characterSprites.walk2,
    [0.3]: characterSprites.walk3,
    [0.4]: characterSprites.walk4,
    [0.5]: characterSprites.walk5,
}, 0.6, true);



characterWalkAnimation.play()