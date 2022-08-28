const token = "5756657212:AAHjw_BsWXwoej56gApZNWS1bOpqD7lIJuI";

import TelegramApi from "node-telegram-bot-api";
import ranks from "./ranks.js";

import { addMsgNum, getNumMsgsByCommand, findRank } from "./utils.js";

const bot = new TelegramApi(token, { polling: true });

let users = [];

bot.setMyCommands([
  { command: "/about", description: "О боте" },
  { command: "/myRank", description: "Мой ранг" },
]);

bot.on("message", async (msg) => {
  const userId = msg.from.id;

  // ----- here we check if the user is in the users array -----
  let numCoincidence = 0;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === userId) {
      numCoincidence++;
      addMsgNum(i, users);
    }
  }

  if (!numCoincidence) {
    users.push({
      id: userId,
      name: msg.from.first_name,
      numMsgs: 1,
    });
  }
  // ----- -----

  if (msg.text === "/about") {
    bot.sendMessage(
      id,
      "Привет! Я — бот, который считает, сколько сообщений ты отправил в этом чате. Если ты набрал N количество сообщений, ты можешь получить звание."
    );
  }

  if (msg.text === "/myRank") {
    const numMsgsOfUser = getNumMsgsByCommand(userId, users);
    const rankUser = findRank(numMsgsOfUser, ranks);
    const nextRank = ranks.indexOf(rankUser) + 1;
    const msgsLeft = ranks[nextRank].record - numMsgsOfUser;

    bot.sendMessage(
      msg.chat.id,
      `Твой ранг: ${rankUser.name}, до нового ранга осталось ${
        msgsLeft + 1
      } сообщений`
    );
  }
});
