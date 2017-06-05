'use strict';

module.exports = (agenda, f) => {
  return agenda.define('showReminders', job => {
    let {fbid} = job.attrs.data;
    agenda.jobs({
      name: 'reminder',
      'data.fbid': fbid,
      'nextRunAt': {
        $exists: true,
        $ne: null
      }
    }, (error, data) => {
      if(data.length === 0) {
        f.txt(fbid, "You've got no reminders set! Yay! :)");
      } else {
        data.forEach(item => {
          // Loop over and display each reminder
          //console.log(item);
          let {_id, nextRunAt} = item.attrs;
          let {task} = item.attrs.data;
          f.txt(fbid, task);
        });
      }
    });
  });
}
