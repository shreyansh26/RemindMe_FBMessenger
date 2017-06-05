'use strict';

const Agenda = require('agenda');
const {MONGO_URI} = require('../config');

const agenda = new Agenda({
  db: {
    address: MONGO_URI
  }
});

const createReminder = require('./createReminder');
const showReminders = require('./showReminders');

module.exports = (f) => {
  // Define Agenda jobs

  // Display a reminder
  agenda.define('reminder', job => {
    const {fbid, first_name, task} = job.attrs.data;
    f.txt(fbid, `Hey ${first_name}. Reminding you to ${task}!`);
  });
  // Create a reminder
  createReminder(agenda, f);

  // Show reminders
  showReminders(agenda, f);
  
  return agenda;
};
