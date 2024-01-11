import "./game/controllers/chat-controller.js";
import { startEngine, update } from "./astro-engine/astro.js";
import { connect } from "./game/controllers/network-controller.js";
import { loadPlayer } from "./game/controllers/player-controller.js";
import "./astro-engine/core/render.js";
import "./astro-engine/core/input.js";
import "./game/controllers/replication-controller.js";
import "./game/controllers/character-controllerr.js";
import "./game/controllers/camera-controller.js";
import { gameObject } from "./astro-engine/core/gameObject.js";
import { Sprite } from "./astro-engine/sprites/sprite.js";

const canvas = document.getElementById("canvas");
//const serverUrl = "ws://omarsabry.net/mmosocket";
const serverUrl = "ws://localhost:54010";

connect(serverUrl);
startEngine(canvas);
loadPlayer();

const worldBorderSprite = new Sprite("./assets/world border.png");

gameObject({
    size: [928 * 3.2, 448 * 3.2],
    position: [0, 0],
    render: new Sprite("./assets/sample-map.png"),
    layer: -1,
})

gameObject({
    render: worldBorderSprite,
    layer: 10000,
    position: [0, 675],
    size: [928 * 3.2, 90],
    rotation: Math.PI,
})
gameObject({
    render: worldBorderSprite,
    layer: 10000,
    position: [0, -675],
    size: [928 * 3.2, 90],
})

gameObject({
    render: worldBorderSprite,
    layer: 10000,
    rotation: Math.PI / 2,
    position: [2969.6 / 2 - 90 / 2, 0],
    size: [928 * 3.2, 90],
})

gameObject({
    render: worldBorderSprite,
    layer: 10000,
    rotation: 3 * Math.PI / 2,
    position: [-(2969.6 / 2 - 90 / 2), 0],
    size: [928 * 3.2, 90],
})

window.onresize = event => {
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;
}


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
