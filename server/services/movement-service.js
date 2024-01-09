import { broadcastMessage, messageReciever, sendMessage } from "../controllers/message-controller.js";

messageReciever.on("Move", (player, room, { x, y }) => {
    player.x = x;
    player.y = y;

    sendMessage("Move", {
        id: player.id,
        x: x,
        y: y,
    }, room.players, player);
});

messageReciever.on("CharacterState", ((player, room, { flip, moving }) => {
    sendMessage("CharacterState", {
        id: player.id,
        flip: flip,
        moving: moving
    }, room.players, player);
}));