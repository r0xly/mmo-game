import "./game/controllers/chat-controller.js";
import { startEngine, update } from "./astro-engine/astro.js";
import { connect } from "./game/controllers/network-controller.js";
import { character, loadPlayer } from "./game/controllers/player-controller.js";
import "./astro-engine/core/render.js";
import "./astro-engine/core/input.js";
import "./game/controllers/character-controller.js";
import "./game/controllers/camera-controller.js";
import { gameObject } from "./astro-engine/core/gameObject.js";
import { Sprite } from "./astro-engine/sprites/sprite.js";
import { TextLabel } from "./astro-engine/core/text-label.js";
import "./game/controllers/room-controller.js"
import { enableLoadingScreen } from "./game/controllers/transition-controller.js";


const canvas = document.getElementById("canvas");
const serverUrl = "wss://omarsabry.net/mmosocket";
//const serverUrl = "ws://localhost:54010";

connect(serverUrl);
startEngine(canvas);
enableLoadingScreen("connecting...")


window.onresize = event => {
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
