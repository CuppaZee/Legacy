var weeks = {
  week1: require('./week1.json'),
  week2: require('./week2.json')
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
      return g(weeks.week2[user.i],capVal) - g(weeks.week1[user.i],capVal);
    case 'week3':
      return (user.p||0) - g(weeks.week2[user.i],capVal);
    default:
      return (user.p||0)
  }
}