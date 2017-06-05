'use strict';

const endConversation = require('./endConversation');
const create = require('./createReminder');

module.exports = (session, f, agenda) => {
  let createReminder = create(session, agenda);
  const actions = {
    send(request, response) {
      const {sessionId, context, entities} = request;
      const {text} = response;
      return new Promise((resolve, reject) => {
        let {fbid} = session.get(sessionId);
        f.txt(fbid, text);
        return resolve();
      });
    },
    createReminder,
    endConversation
  }

  return actions;
}
