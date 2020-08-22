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
      "vike91",
      "stacybuckwyk",
      "cambridgehannons",
      "boompa",
      "tecmjrb",
      "babydane",
      "maattmoo",
      "Dorsetknob"
    ],
    457: [
      "benandlou",
      "maxi72",
      "pelicanrouge",
      "writeandmane",
      "gunnersteve",
      "iallyanne",
      "sohcah",
      "goldilox97",
      "franca",
      "thegenie18"
    ],
    2042: [
      "barrowman1",
      "fiwn",
      "founditwherenext",
      "clair21",
      "tzaruba",
      "boomgal8",
      "lolbot",
      "unicornpink"
    ],
    1441: [
      "chameleon42",
      "moppett85",
      "armchair",
      "godzilla73",
      "reart",
      "chipperlarter"
    ],
    1902: [
      "mankybadger",
      "mlec",
      "bingbonglong",
      "ujio",
      "ajb777",
      "amyjoy",
      "terryd",
      "tia67uk",
      "shellie1210"
    ],
    1870: [
      "chuckysback",
      "oldun",
      "oldlass",
      "mary",
      "iicydiamonds",
      "woodlandsprite",
      "j20",
      "chefmummyyummy"
    ],
    "-1": [
      "kcat", //Level 1
      "beanieflump", //Level 2
      "shaunem", //Level 1?
      "signal77" //Level 1
    ]
  },
  89: {
    1349: [
      "sohcah",
      "goldilox97",
      "barrowman1",
      "boompa",
      "tecmjrb",
      "maxi72",
      "vike91",
      "pelicanrouge",
      "stacybuckwyk",
    ],
    457: [
      "purplecourgette",
      "writeandmane",
      "maattmoo",
      "moppett85",
      "clair21",
      "franca",
      "thegenie18",
    ],
    2042: [
      "cambridgehannons",
      "sidcup",
      "chipperlarter",
      "lolbot",
      "gunnersteve",
      "iallyanne",
      "godzilla73",
      "benandlou",
    ],
    1441: [
      "chameleon42",
      "bingbonglong",
      "dorsetknob",
      "ajb777",
      "j20",
      "founditwherenext",
      "chefmummyyummy",
      "chuckysback",
      "armchair",
      "boomgal8",
    ],
    1902: [
      "mankybadger",
      "iicydiamonds",
      "ujio",
      "mary",
      "geoboy0201",
      "geoturtlelover",
      "kcat",
      "tia67uk",
      "unicornpink",
      "hufflewand",
    ],
    1870: [
      "shellie1210",
      "amyjoy",
      "reart",
      "signal77",
      "fiwn",
      "mlec",
      "beanieflump",
      "woodlandsprite",
      "oldun",
      "oldlass",
    ],
    "-1": [
      "terryd",
      "tzaruba",
      "majk666",
      "shaunem",
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