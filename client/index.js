import "./game/controllers/chat-controller.js";
import { startEngine, update } from "./astro-engine/astro.js";
import { connect } from "./game/controllers/network-controller.js";
import { loadPlayer } from "./game/controllers/player-controller.js";
import "./astro-engine/core/render.js";
import "./astro-engine/core/input.js";
import "./game/controllers/replication-controller.js"
import { gameObject } from "./astro-engine/core/gameObject.js";
import { Sprite } from "./astro-engine/sprites/sprite.js";

const canvas = document.getElementById("canvas");
const serverUrl = "ws://127.0.0.1:1001";

/** 
connect(serverUrl);
*/
startEngine(canvas);
loadPlayer();


window.onresize = event => {
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight - 3;
}


canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 3;
