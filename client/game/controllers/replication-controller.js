import { deleteObject } from "../../astro-engine/core/gameObject.js";
import { Vector } from "../../astro-engine/util/vector.js";
import { createCharacter } from "../objects/character.js";
import { messageRecieved } from "./network-controller.js";

const characters = {};

function clearRoom() {
    for (const character of Object.values(characters)) 
        deleteObject(character);
}

function addPlayer(player) {
    characters[player.id] = createCharacter(player.x, player.y);
}

function removePlayer(player) {
    deleteObject(characters[player.id]);

    delete characters[player.id];
}

messageRecieved("RoomData", ({ roomId, roomData, players }) =>  {
    clearRoom();
    console.log(players);

    players.forEach(player => addPlayer(player))
});

messageRecieved("Move", ({ id, x, y }) => {
    if (characters[id])
        characters[id].position = new Vector(x, y);
});

messageRecieved("CharacterState", ({ id, flip, moving }) => {
    if (characters[id]) {
        characters[id].components["CharacterData"].flip = flip;
        characters[id].components["CharacterData"].moving = moving;

    }

    console.log(flip);
});

messageRecieved("PlayerJoinedRoom", addPlayer);
messageRecieved("PlayerLeftRoom", removePlayer);