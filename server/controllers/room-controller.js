import { Room } from "../entities/room.js";
import { messageReciever, sendMessage } from "./message-controller.js";
import { getPlayerData, players } from "./player-controller.js";

const roomA = new Room("a");
const roomB = new Room("b");

export const defaultRoom = roomA;

export function getRoom(roomId) {
    if (roomId === "a")
        return roomA; 
    else if (roomId === "b")
        return roomB;
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
        roomData: room.data,
        roomId: room.id,
    }, player);

    room.players[player.id] = player;
}

messageReciever.on("JoinRoomRequest", (player, roomId) => {
    const targetRoom = getRoom(roomId);

    if (targetRoom) 
        addPlayerToRoom(player, targetRoom);
});