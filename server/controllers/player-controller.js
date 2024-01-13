import { Player } from "../entities/player.js";
import { sendMessage } from "./message-controller.js";
import { addPlayerToRoom, defaultRoom, removePlayerFromRoom } from "./room-controller.js";

/**
 * @type {{[playerId: string]: Player}}
 */
export const players = {};

/**
 * @param {Object} playerData 
 * @param {WebSocket} socket 
 * @returns {Player} 
 */
export function addPlayer(playerData, socket) {
    const player = new Player(playerData, socket);
    players[player.id] = player;

    sendMessage("ConnectionData", {
        playerData: getPlayerData(player)
    }, player);
    addPlayerToRoom(player, defaultRoom);

    return player;
}

/**
 * Removes a player from the server and their room.
 * @param {Player} player 
 * @param {string=} code - Closed connection code.
 */
export function removePlayer(player, code) {
    delete players[player.id];

    removePlayerFromRoom(player, player.room);
}

/**
 * @param {Player|Player[]} player - The player or players to retrieve data for.
 * @returns {Object|Player[]} - The player's data or an array of the specified players' data.
 */
export function getPlayerData(player) {
    const getData = player => { 
        return {
            username: player.username,
            id: player.id,
            x: player.x,
            y: player.y
        }
    }

    if (player instanceof Player)
        return getData(player);
    else
        return Object.values(player).map(player => getData(player));
}