import { Player } from "../entities/player.js";
import { addPlayerToRoom, defaultRoom, removePlayerFromRoom } from "./room-controller.js";

/**
 * A dictionary of player ids and players.
 * @type {{[playerId: string]: Player}}
 */
export const players = {};

/**
 * Adds a new player to the server and assigns them to a room.
 * @param {Object} playerData - Data for initializing the player.
 * @param {WebSocket} socket - The WebSocket connection associated with the player.
 * @returns {Player} - The player object.
 */
export function addPlayer(playerData, socket) {
    const player = new Player(playerData, socket);
    players[player.id] = player;

    addPlayerToRoom(player, defaultRoom);

    return player;
}

/**
 * Removes a player from the server and their room.
 * @param {Player} player - The player to be removed.
 * @param {string=} code - Closed connection code.
 */
export function removePlayer(player, code) {
    delete players[player.id];

    removePlayerFromRoom(player, player.room);
}

/**
 * Gets the data of a specific player or players.
 * @param {Player|Player[]} player - The player or players to retrieve data for.
 * @returns {Object|Player[]} - The player's data or an array of all players' data.
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