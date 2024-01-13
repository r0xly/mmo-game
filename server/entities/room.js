import { sendMessage } from "../controllers/message-controller.js";

export class Room {
    players = {};

    constructor(roomId, roomData) {
        this.id = roomId;
        this.data = roomData;
    }
}