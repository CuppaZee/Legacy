var weeks = {
  week1: require('./week1.json'),
  week2: require('./week2.json'),
  week3: require('./week3.json'),
  week4: require('./week4.json')
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
      return g(weeks.week3[user.i],capVal) - g(weeks.week2[user.i],capVal);
    case 'week4':
      return g(weeks.week4[user.i],capVal) - g(weeks.week3[user.i],capVal);
    default:
      return (user.p||0)
  }
}