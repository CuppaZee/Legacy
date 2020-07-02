var { request, retrieve } = require('../util');

var data = {
  87: {
    1349: [
      "purplecourgette",
      "maxi72",
      "sidcup",
      "cambridgehannons",
      "benandlou",
      "godzilla73",
      "lolbot",
      "chipperlarter"
    ],
    457: [
      "thegenie18",
      "moppett85",
      "boompa",
      "babydane",
      "writeandmane",
      "stacybuckwyk",
      "barrowman1"
    ],
    2042: [
      "sohcah",
      "gunnersteve",
      "iallyanne",
      "tecmjrb",
      "tzaruba",
      "franca",
      "pelicanrouge",
      "maattmoo"
    ],
    1441: [
      "shellie1210",
      "chameleon42",
      "ajb777",
      "armchair",
      "chuckysback",
      "chefmummyyummy",
      "reart",
      "vike91"
    ],
    1902: [
      "mankybadger",
      "j20",
      "ujio",
      "mlec",
      "iicydiamonds",
      "oldun",
      "oldlass",
      "tia67uk"
    ],
    1870: [
      "founditwherenext",
      "amyjoy",
      "fiwn",
      "boomgal8",
      "bingbonglong",
      "terryd",
      "beanieflump"
    ],
    "-1": [
      "mary",
      "unicornpink",
      "shaunem",
      "signal77"
    ]
  },
  88: {
    1349: [
      "purplecourgette",
      "sidcup",
      "stacybuckwyk",
      "boompa",
      "tecmjrb",
      "babydane",
      "maattmoo"
    ],
    457: [
      "benandlou",
      "maxi72",
      "writeandmane",
      "gunnersteve",
      "iallyanne",
      "sohcah",
      "thegenie18"
    ],
    2042: [
      "barrowman1",
      "cambridgehannons",
      "clair21",
      "tzaruba",
      "lolbot",
      "chipperlarter",
      "chefmummyyummy",
      "goldilox97",
      "Dorsetknob"
    ],
    1441: [
      "chameleon42",
      "pelicanrouge",
      "moppett85",
      "ajb777",
      "vike91",
      "armchair",
      "godzilla73",
      "reart"
    ],
    1902: [
      "mankybadger",
      "unicornpink",
      "mlec",
      "boomgal8",
      "bingbonglong",
      "amyjoy",
      "tia67uk"
    ],
    1870: [
      "chuckysback",
      "fiwn",
      "founditwherenext",
      "oldun",
      "oldlass",
      "j20"
    ],
    "-1": [
      "mary",
      "kcat",
      "ujio",
      "shellie1210",
      "woodlandsprite",
      "beanieflump",
      "terryd",
      "shaunem",
      "signal77",
      "iicydiamonds"
    ]
  }
}

module.exports = {
  path: "clan/shadow/generate",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db, params: { game_id, clan_id } }) {
        var token = await retrieve(db, {user_id:455935,teaken:false},60);
        var clandata = data[game_id][clan_id];
        var arr = [];
        for(var member of clandata) {
          arr.push(request('user',{username:member},token.access_token));
        }
        var userdata = await Promise.all(arr);
        var d = (await db.collection(`shadow_${game_id}`).doc((clan_id || "1349").toString()).get()).data();
        if(d) {
          await db.collection(`shadow_${game_id}`).doc((clan_id || "1349").toString()).update({
            _members: userdata.map(i=>({
              user_id: Number(i.user_id),
              username: i.username
            })),
            _updated_at: 0
          })
        } else {
          await db.collection(`shadow_${game_id}`).doc((clan_id || "1349").toString()).set({
            _members: userdata.map(i=>({
              user_id: Number(i.user_id),
              username: i.username
            })),
            _updated_at: 0
          })
        }
        return {
          status: "success",
          data: true
        }
      }
    }
  ]
}