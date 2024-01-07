import { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers } from "obscenity";
import { messageReciever, sendMessage } from "../controllers/message-controller.js";
import { log } from "../util/log.js";
import sanitize from "sanitize-html";

const asteriskStrategy = (ctx) => '*'.repeat(ctx.matchLength);

const textCensor = new TextCensor()
    .setStrategy(asteriskStrategy);

const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
});

function filterText(contnet) {
    return sanitize(textCensor.applyTo(contnet.trim(), matcher.getAllMatches(contnet)));
}

messageReciever.on("ChatMessage", (player, room, content) => {
    if (content.length === 0)
        return;

    content = filterText(content)

    sendMessage("ChatMessage", {
        content: content,
        username: player.username
    }, room.players);
});