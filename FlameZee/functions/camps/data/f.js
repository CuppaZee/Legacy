var weeks = {
  week1: require('./week1.json')
};

function g(d,c) {
  if(c) {
    return ((d||{}).cap||(d||{}).c||[])[c-1] || 0;
  } else {
    return (d||{}).p || 0
  }
}

module.exports = function f(user, week, capVal) {
  switch(week) {
    case 'overall':
      return (user.p||0);
    case 'week1':
      return g(weeks.week1[user.i],capVal);
    case 'week2':
      return (user.p||0) - g(weeks.week1[user.i],capVal);
    default:
      return (user.p||0)
  }
}