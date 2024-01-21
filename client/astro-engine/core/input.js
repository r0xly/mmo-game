import { createEvent } from "../util/event.js";

export let keysDown = {};

export const [keyUp, emitKeyUp] = createEvent();
export const [keyDown, emitKeyDown] = createEvent();
export const [mouseUp, emitMouseUp] = createEvent();
export const [mouseDown, emitMouseDown] = createEvent();

window.onmousedown = event => {
    emitMouseDown();
}

window.onmouseup = event => {
    emitMouseUp();
}

window.onkeyup = event => {
    const key = event.key.toLocaleLowerCase();

    emitKeyUp(key);

    delete keysDown[key];
}

window.onkeydown = event => {
    const key = event.key.toLocaleLowerCase();

    if (event.target.nodeName === "INPUT")
        return;

    emitKeyDown(key);

    keysDown[key] = true;
}

window.onblur = () => {
    for (const key in keysDown)
        emitKeyUp(key);

    keysDown = {};
}

window.addEventListener("visibilitychange", () => {
    for (const key in keysDown)
        emitKeyUp(key);

    keysDown = {};
});