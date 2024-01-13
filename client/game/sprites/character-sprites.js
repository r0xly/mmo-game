import { SpriteSheet } from "../../astro-engine/sprites/spriteSheet.js";

export const characterSpriteSheet = new SpriteSheet("https://www.omarsabry.net/mmo-game/assets/player.png", 48, 48);

export const characterSprites = {
    idle0: characterSpriteSheet.getSprite(0, 1),
    idle1: characterSpriteSheet.getSprite(1, 1),
    idle2: characterSpriteSheet.getSprite(2, 1),
    idle3: characterSpriteSheet.getSprite(3, 1),
    idle4: characterSpriteSheet.getSprite(4, 1),
    idle5: characterSpriteSheet.getSprite(5, 1),

    walk0: characterSpriteSheet.getSprite(0, 4),
    walk1: characterSpriteSheet.getSprite(1, 4),
    walk2: characterSpriteSheet.getSprite(2, 4),
    walk3: characterSpriteSheet.getSprite(3, 4),
    walk4: characterSpriteSheet.getSprite(4, 4),
    walk5: characterSpriteSheet.getSprite(5, 4),

    swing0: characterSpriteSheet.getSprite(0, 7),
    swing1: characterSpriteSheet.getSprite(1, 7),
    swing2: characterSpriteSheet.getSprite(2, 7),
    swing3: characterSpriteSheet.getSprite(3, 7)
}