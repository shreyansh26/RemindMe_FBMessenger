'use strict';

const findById = (fbid, sessionStore) => {
  for(let [key, value] of sessionStore) {
    if(value.fbid === fbid) {
      return key;
    }
  }
}

module.exports = {
  findById
};
