var munzee = require('./Munzee');

module.exports = class Activity {
    constructor(activityEvent) {
        this.munzee = new munzee(activityEvent.pin||activityEvent.pin_icon,activityEvent.capture_type_id);
    }
}