import { messageRecieved, sendMessage } from "./network-controller.js";

const ANNOUCNEMNT_COLOR = "#8e6c32";
const USERNAME_COLOR = "#356678";

const chat = document.getElementById("chat");
const chatInput = document.getElementById("chat-input");

export function announceChatMessage(content) {
    const annoucement = document.createElement("span");
    annoucement.innerHTML = content;
    //annoucement.style.fontWeight = "bold";
    annoucement.style.color = ANNOUCNEMNT_COLOR;

    chat.prepend(annoucement);
}


let previousSender; 

export function sendChatMessage({ content, player }) {
    const usernameElement = document.createElement("span");
    usernameElement.style.color = USERNAME_COLOR;
    usernameElement.innerHTML = player.username + ": ";
    usernameElement.style.fontWeight = "bold";

    const message = document.createElement("p");
    message.innerHTML = content;
    
    chat.prepend(message);
    
    if (previousSender !== player.username)
        message.prepend(usernameElement);

    previousSender = player.username;
}

chatInput.onkeydown = event => {
    if (event.key !== "Enter") 
        return;

    const content = chatInput.value || " ";
    chatInput.value = "";

    sendMessage("ChatMessage", content);
}

messageRecieved("ChatMessage", sendChatMessage);