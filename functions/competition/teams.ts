module.exports = function (db) {
  let teams = [];

  let hasData = false;

  let waiting = [];

  db.collection('data').where('team','==',true)
    .onSnapshot(querySnapshot => {
      teams = querySnapshot.docs.map(i=>i.data());
      hasData = true;
      waiting.forEach(i=>i());
      waiting = [];
    });

  return function () {
    return new Promise((resolve, reject) => {
      if(hasData) {
        resolve(teams);
        return;
      } else {
        waiting.push(()=>resolve(teams));
      }
    })
  };
}