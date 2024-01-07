import { createEvent } from "../../astro-engine/util/event.js";
import { announceChatMessage } from "./chat-controller.js";

let websocket;
let messageRecievedListeners = {};

export function messageRecieved(id, callback) {
    if (messageRecievedListeners[id])
        return messageRecievedListeners[id].subscribe(callback);

    const [subscribe, emit] = createEvent();
    
    messageRecievedListeners[id] = {
        subscribe: subscribe,
        emit: emit,
    };

    return subscribe(callback);
}

export function connect(url) {
    websocket = new WebSocket(url);

    websocket.addEventListener("message", message => {
        const data = JSON.parse(message.data);

        const listener = messageRecievedListeners[data.id]; 

        if (listener)
            listener.emit(data.data);
    });

    websocket.addEventListener("open", () => {
        announceChatMessage("Connection open.")
    });

    websocket.addEventListener("close", () => {
        announceChatMessage("Connection closed.")
    });
}

export function sendMessage(id, data) {
    if (!websocket || websocket.readyState !== 1)
        return;

    try {
        const message = JSON.stringify({
            id: id,
            data: data
        });

        websocket.send(message);
    } catch(error) {
        console.error(error);
    }
}
