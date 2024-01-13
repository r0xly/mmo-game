import { deleteObject, gameObject } from "../../astro-engine/core/gameObject.js";
import { Sprite } from "../../astro-engine/sprites/sprite.js";
import { createCharacter } from "../objects/character.js";
import { messageRecieved } from "./network-controller.js";
import { loadPlayer } from "./player-controller.js";

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
    clearRoom();

    const backgroundSprite = new Sprite(data.backgroundUrl);

    backgroundSprite.image.onload = () =>
        createRoomObject({
            size: [data.size.x, data.size.y],
            render: backgroundSprite,
            layer: -1,
        });

    players.forEach(addPlayer);
    loadPlayer();
        let xx = gameObject({
            size: [data.size.x, data.size.y],
            render: backgroundSprite,
            layer: -1,
        });

        console.log(xx.render)
}

messageRecieved("PlayerJoinedRoom", addPlayer);
messageRecieved("PlayerLeftRoom", removePlayer);
messageRecieved("RoomData", loadRoom);