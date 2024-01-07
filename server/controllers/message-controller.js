import { error } from "../util/log.js";
import { EventEmitter } from "node:events";
import { players } from "./player-controller.js";
import { Player } from "../entities/player.js";

function parseMessage(data) {
    const message = JSON.parse(data.toString());

    if (message["id"] && message["data"])
        return message;

    throw new Error("Malformed message.");
}

/**
 * Handles broadcasting message data. 
 * @type {EventEmitter}
 */
export const messageReciever = new EventEmitter();

/**
 * Sends a message to one or multiple players.
 * @param {string} id - The identifier for the message.
 * @param {any} data - The data to be sent in the message.
 * @param {Player|Object} players - The player or players to receive the message.
 * @param {Player=} exclude - The player to exclude from the player list.
 */
export function sendMessage(id, data, players, exclude) {
    const message = JSON.stringify({
        id: id,
        data: data
    });

    if (players instanceof Player)
        players.socket.send(message);
    else 
        for (const player of Object.values(players)) 
            if (player !== exclude)
                player.socket.send(message);
}
/**
 * Broadcasts a message to all players except the specified one.
 * @param {string} id - The identifier for the message.
 * @param {any} data - The data to be sent in the message.
 * @param {Player=} exclude - The player to exclude from the broadcast.
 */
export function broadcastMessage(id, data, exclude) {
    const message = JSON.stringify({
        id: id,
        data: data
    });

    for (const player of Object.values(players)) 
        if (player !== exclude)
            player.socket.send(message)
}

/**
 * Handles incoming messages from a player.
 * @param {any} player - The player who sent the message.
 * @param {any} data - The raw data of the incoming message.
 */
export function handleMessage(player, data) {
    try {
        const message = parseMessage(data);
        messageReciever.emit(message.id, player, player.room, message.data);
    } catch(errorMessage) {
        error(errorMessage);
    }
}