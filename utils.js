export const addMsgNum = (idx, users) => {
  users[idx].numMsgs++;
};
export const getNumMsgsByCommand = (userID, users) => {
  for (let i = 0; i < users.length; i++) {
    if (userID === users[i].id) {
      return users[i].numMsgs;
    }
  }
};

export const findRank = (numMsgs, ranks) => {
  const firstLevel = ranks[0];
  const lastLevel = ranks[ranks.length - 1];

  for (let i = 0; i < ranks.length; i++) {
    if (numMsgs < firstLevel.record) {
      return firstLevel;
    } else if (numMsgs >= ranks[i].record && numMsgs <= ranks[i + 1].record) {
      return ranks[i];
    } else if (numMsgs >= lastLevel.record) {
      return ranks[ranks.length - 1];
    }
  }
};
