import { update } from "../astro.js";
import { gameObjects } from "./gameObject.js";
import { Sprite } from "../sprites/sprite.js";

export const trash = 0;

update((deltaTime, canvas, ctx) => {
    const width = canvas.width;
    const height = canvas.height;

    const originX = width / 2;
    const originY = height / 2;

    ctx.clearRect(0, 0, width, height)
    ctx.imageSmoothingEnabled = false;

    gameObjects.forEach(object => {
        const objectX = object.position.x;
        const objectY = object.position.y;
        const objectWidth = object.size.x;
        const objectHeight = object.size.y;
        const pivotOffsetX = object.positionPivot.x * objectWidth;
        const pivotOffsetY = object.positionPivot.y * objectHeight;

        ctx.save();
        // rotation
        ctx.translate(originX + objectX,originY - objectY)
        ctx.rotate(-object.rotation);
        ctx.translate(-(originX + objectX), -(originY - objectY))


        const renderObject = object.render;

        if (renderObject === "rect")
            ctx.fillRect(
                originX - pivotOffsetX + object.position.x,
                originY - pivotOffsetY - object.position.y,
                objectWidth,
                objectHeight,
            )
        else if (renderObject instanceof Sprite) {
            const direction = renderObject.inverse ? -1 : 1;
            const asdfgjkl = (originX - pivotOffsetX + objectX) * direction;

            ctx.scale(direction, 1);
            ctx.drawImage(
                renderObject.image,
                renderObject.sx,
                renderObject.sy,
                renderObject.sWidth,
                renderObject.sHeight,
                asdfgjkl - (renderObject.inverse ? objectWidth : 0),
                originY - pivotOffsetY - object.position.y,
                objectWidth,
                objectHeight,
            );
        }
        ctx.restore();
    });

});