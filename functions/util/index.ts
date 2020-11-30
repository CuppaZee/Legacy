
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'request'.
var request = require('./request');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'retrieve'.
var retrieve = require('./retrieve');
var moment = require('moment');
require('moment-timezone');
module.exports = {
  request,
  retrieve,
  mhq: (a: any) => moment(a).tz('America/Chicago'),
  mhqStr: (a: any) => (a||moment().tz('America/Chicago')).format('YYYY-MM-DD'),
  gameID(year: any,month: any){
    let now = moment().tz('America/Chicago');
    let y = year!==undefined?year:now.year();
    let m = month!==undefined?month:now.month();
    return (y*12)+m-24158;
  }
}