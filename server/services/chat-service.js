import { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers } from "obscenity";
import { messageReciever, sendMessage } from "../controllers/message-controller.js";
import { log } from "../util/log.js";
import sanitize from "sanitize-html";
import { getPlayerData } from "../controllers/player-controller.js";

const asteriskStrategy = (ctx) => '*'.repeat(ctx.matchLength);

const textCensor = new TextCensor()
    .setStrategy(asteriskStrategy);

const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
});

const filterText = (contnet) => sanitize(textCensor.applyTo(contnet.trim(), matcher.getAllMatches(contnet)));

messageReciever.on("ChatMessage", (player, room, content) => {
    content = filterText(content)

    if (content.length === 0)
        return;

    sendMessage("ChatMessage", {
        content: content,
        player: getPlayerData(player)
    }, room.players);
});