var request = require('./request');
var retrieve = require('./retrieve');
var moment = require('moment');
require('moment-timezone');
module.exports = {
  request,
  retrieve,
  mhq: (a)=>moment(a).tz('America/Chicago'),
  mhqStr: (a)=>(a||moment().tz('America/Chicago')).format('YYYY-MM-DD'),
  gameID(year,month){
    let now = moment().tz('America/Chicago');
    let y = year!==undefined?year:now.year();
    let m = month!==undefined?month:now.month();
    return (y*12)+m-24158;
  }
}