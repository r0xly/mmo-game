import { WebSocketServer } from "ws";
import { error } from "./util/log.js";
import { startHttpServer } from "./controllers/http-server-controller.js";
import { handleMessage } from "./controllers/message-controller.js";
import { removePlayer } from "./controllers/player-controller.js";
import "./services/chat-service.js";
import "./services/movement-service.js"

const serverPort = 1001;
const webSocketServer = new WebSocketServer({ noServer: true });

webSocketServer.on("connection", (socket, player) => {
    socket.on("error", error);
    socket.on("close", code => removePlayer(player, code));
    socket.on("message", data => handleMessage(player, data));
});

startHttpServer(webSocketServer, serverPort);