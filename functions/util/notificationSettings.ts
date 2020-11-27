module.exports = function (db) {
  let devices = [];

  let hasData = false;

  let waiting = [];

  db.collection('push')
    .onSnapshot(querySnapshot => {
      devices = querySnapshot.docs.map(i=>i.data());
      hasData = true;
      waiting.forEach(i=>i());
      waiting = [];
    });

  return function () {
    return new Promise((resolve, reject) => {
      if(hasData) {
        resolve(devices);
        return;
      } else {
        waiting.push(()=>resolve(devices));
      }
    })
  };
}