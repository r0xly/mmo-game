import { deleteObject, gameObject } from "../../astro-engine/core/gameObject.js";
import { TextLabel } from "../../astro-engine/core/text-label.js";
import { Sprite } from "../../astro-engine/sprites/sprite.js";
import { Vector } from "../../astro-engine/util/vector.js";
import { createCharacter } from "../objects/character.js";
import { messageRecieved } from "./network-controller.js";

const characters = {};

const usernameIdMap = {};

function clearRoom() {
    for (const character of Object.values(characters)) 
        deleteObject(character);
}

function addPlayer(player) {
    const character = createCharacter(player.x, player.y);
    
    gameObject({
        size: [500, 25],
        position: [0, -90],
        alpha: 0.5,
        render: new TextLabel(player.username, "bold 20px monospace", "black", "center"),
        parent: character
    })

    character.chat = new TextLabel("", "20px monospace", "white", "center");

    gameObject({
        size: [300, 50],
        positionPivot: [0.5, 1],
        position: [0, 15],
        render: character.chat,
        parent: character
    })

    usernameIdMap[player.username] = player.id;
    characters[player.id] = character;
}

function removePlayer(player) {
    deleteObject(characters[player.id]);

    delete characters[player.id];
}

messageRecieved("RoomData", ({ roomId, roomData, players }) =>  {
    clearRoom();

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
        size: [448* 3.2, 90],
    })

    gameObject({
        render: worldBorderSprite,
        layer: 10000,
        rotation: 3 * Math.PI / 2,
        position: [-(2969.6 / 2 - 90 / 2), 0],
        size: [448 * 3.2, 90],
    })
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
});

messageRecieved("ChatMessage", ({ username, content }) => {
    let id = usernameIdMap[username];

    if (characters[id]) {
        characters[id].chat.content = content;


        setTimeout(() => {
            if (characters[id].chat.content === content)
                characters[id].chat.content = " ";
        }, 5000)
    }
});

messageRecieved("PlayerJoinedRoom", addPlayer);
messageRecieved("PlayerLeftRoom", removePlayer);