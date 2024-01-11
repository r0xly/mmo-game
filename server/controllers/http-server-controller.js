import { authenticateConnection } from "../util/authenticate.js";
import { addPlayer } from "./player-controller.js";
import { WebSocketServer } from "ws";
import { createServer } from "http";
import { log } from "console";
import { parse } from "url";

function handleUpgrade(webSocketServer, request, socket, head) {
    const { token } = parse(request.url, true).query;
    const playerData = authenticateConnection(token);

    if (!playerData) {
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
        return;
    }

    webSocketServer.handleUpgrade(request, socket, head, websocket => {
        const player = addPlayer(playerData, websocket);
        log(`New connection from ${request.socket.remoteAddress}; Username: ${player.username} (${player.id}).`);

        webSocketServer.emit("connection", websocket, player);
    });
}

/**
 * @param {WebSocketServer} webSocketServer 
 * @param {number} port 
 * @returns 
 */
export function startHttpServer(webSocketServer, port) {
    const httpServer = createServer({});

    httpServer.on("listening", _ => 
        log("Server listenting...")
    );

    httpServer.on("upgrade", (request, socket, head) => {
        handleUpgrade(webSocketServer, request, socket, head);
    });

    httpServer.listen(port);

    return httpServer;
}