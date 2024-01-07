export class Player {
    x = 0;
    y = 0;
    room;

    constructor(playerData, socket) {
        this.username = playerData.username;
        this.id = playerData.id;
        this.socket = socket;
    }
}