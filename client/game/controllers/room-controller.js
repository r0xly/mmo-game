import { deleteObject, gameObject } from "../../astro-engine/core/gameObject.js";
import { Sprite } from "../../astro-engine/sprites/sprite.js";
import { HitBox } from "../../astro-engine/core/hit-box.js";
import { createCharacter } from "../objects/character.js";
import { disableLoadingScreen, enableLoadingScreen } from "./loading-controller.js";
import { messageRecieved, sendMessage } from "./network-controller.js";
import { character, loadPlayer } from "./player-controller.js";
import { setBackgroundColor } from "../../astro-engine/core/render.js";



export let players = {};
export let characters = {};

let roomObjects = [];

const createRoomObject = (data) => roomObjects.push(gameObject(data));

function clearRoom() {
    Object.values(players).forEach(removePlayer);
    roomObjects.forEach(deleteObject);
    roomObjects = [];
}

function addPlayer(player) {
    players[player.id] = player;
    characters[player.id] = createCharacter(player);
}

function removePlayer({ id }) {
    deleteObject(characters[id]);
    delete characters[id];
    delete players[id];
}

function loadRoom({ roomId, data, players }) {
    enableLoadingScreen("loading room...");
    clearRoom();
    
    setBackgroundColor(data.backgroundColor);
    const backgroundSprite = new Sprite(data.backgroundUrl);

    createRoomObject({
        size: [data.size.x, data.size.y],
        render: backgroundSprite,
        layer: -1,
    });

    
    if (roomId === "spawn")
        createRoomObject({
            size: [120, 70],
            alpha: 0,
            position: [0, 530],
            components: [new HitBox((hit) => {
                console.log(hit);
                if (hit == character) {
                    sendMessage("JoinRoomRequest", "main")
                }
            })],
        })
    if (roomId === "cave")
        createRoomObject({
            size: [120, 70],
            position: [322, 171],
            alpha: 0,
            components: [new HitBox((hit) => {
                console.log(hit);
                if (hit == character) {
                    sendMessage("JoinRoomRequest", "main")
                }
            })],
        })
    if (roomId === "main")
        createRoomObject({
            size: [120, 70],
            position: [677, 400],
            alpha: 0,
            components: [new HitBox((hit) => {
                console.log(hit);
                if (hit == character) {
                    sendMessage("JoinRoomRequest", "cave")
                }
            })],
        })
    if (roomId === "main")
        createRoomObject({
            size: [120, 70],
            position: [-657, 580],
            alpha: 0,
            components: [new HitBox((hit) => {
                console.log(hit);
                if (hit == character) {
                    sendMessage("JoinRoomRequest", "spawn")
                }
            })],
        })
    players.forEach(addPlayer);
    loadPlayer();
    setTimeout(disableLoadingScreen, 200);
}

messageRecieved("PlayerJoinedRoom", addPlayer);
messageRecieved("PlayerLeftRoom", removePlayer);
messageRecieved("RoomData", loadRoom);