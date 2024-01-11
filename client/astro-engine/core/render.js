import { update } from "../astro.js";
import { gameObject, gameObjects } from "./gameObject.js";
import { Sprite } from "../sprites/sprite.js";
import { Vector } from "../util/vector.js";
import { camera } from "./camera.js";

export let canvasSize = new Vector();

update((deltaTime, canvas, ctx) => {
    const width = canvas.width;
    const height = canvas.height;


    const originX = -camera.position.x + width / 2;
    const originY = camera.position.y + height / 2;

    ctx.clearRect(0, 0, width, height)
    ctx.imageSmoothingEnabled = false;
    // zoom
    ctx.translate(width / 2, height / 2);
    ctx.scale(camera.zoom, camera.zoom);
    ctx.translate(-width / 2, -height / 2);

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


        const renderObject = object.renderOverride || object.render;

        if (renderObject === "rect")
            ctx.fillRect(
                originX - pivotOffsetX + object.position.x,
                originY - pivotOffsetY - object.position.y,
                objectWidth,
                objectHeight,
            )
        else if (renderObject instanceof Sprite) {
            const flip = renderObject.inverse || object.flipRender;
            const direction = flip ? -1 : 1;
            const asdfgjkl = (originX - pivotOffsetX + objectX) * direction;

            ctx.scale(direction, 1);
            ctx.drawImage(
                renderObject.image,
                renderObject.sx,
                renderObject.sy,
                renderObject.sWidth,
                renderObject.sHeight,
                asdfgjkl - (flip ? objectWidth : 0),
                originY - pivotOffsetY - object.position.y,
                objectWidth,
                objectHeight,
            );
        }
        ctx.restore();
    });
    ctx.setTransform(1, 0, 0, 1, 0, 0);

});