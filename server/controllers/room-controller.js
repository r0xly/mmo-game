import { Room } from "../entities/room.js";
import { messageReciever, sendMessage } from "./message-controller.js";
import { getPlayerData, players } from "./player-controller.js";


const spawn = new Room("spawn", {
    backgroundUrl: "https://www.omarsabry.net/mmo-game/assets/spawn.png",
    size: { x: 3840 / 1.75 , y: 3840 / 1.75 }
});

const main = new Room("main", {
    backgroundUrl: "https://www.omarsabry.net/mmo-game/assets/main.png",
    size: { x: 4800 / 1.75, y: 2880 / 1.75 }
})

const cave = new Room("cave", {
    backgroundUrl: "https://www.omarsabry.net/mmo-game/assets/cave.png",
    size: { x: 2400 / 1.5, y: 1920 / 1.5 }
})

export const defaultRoom = spawn;

export function getRoom(roomId) {
    if (roomId === "spawn")
        return spawn; 
    else if (roomId === "main")
        return main;
    else if (roomId === "cave")
        return cave;
}

export function removePlayerFromRoom(player, room) {
    delete room.players[player.id];

    sendMessage("PlayerLeftRoom", getPlayerData(player), room.players);
}

export function addPlayerToRoom(player, room) {
    if (player.room)
        removePlayerFromRoom(player, player.room) 

    player.room = room;

    sendMessage("PlayerJoinedRoom", getPlayerData(player), room.players);
    sendMessage("RoomData", {
        players: getPlayerData(room.players),
        data: room.data,
        roomId: room.id,
    }, player);

    room.players[player.id] = player;
}

messageReciever.on("JoinRoomRequest", (player, room, roomId) => {
    const targetRoom = getRoom(roomId);

    if (targetRoom) 
        addPlayerToRoom(player, targetRoom);
});