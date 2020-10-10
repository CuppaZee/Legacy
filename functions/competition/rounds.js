module.exports = {
  path: "competition/rounds",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db }) {
        return {
          status: "success",
          data: {
            rounds: []
          }
        };
      },
    },
    {
      version: 2,
      params: {},
      async function({ db }) {
        const collection = await db.collection('zeecret').get();
        return {
          status: "success",
          data: {
            rounds: collection.docs.map(i=>i.data()).map(i=>({
              result: i.result,
              pine: i.points ? i.points.pine : (i.base || i.max),
              pear: i.points ? i.points.pear : (i.base || i.max),
              start: i.start,
              end: i.end,
              id: i.round_id,
              max: i.max,
              base: i.base,
            })).sort((a,b) => a.id - b.id).filter(i=>i.start<=Date.now())
          }
        };
      },
    },
  ],
};


/*

{
  "result": "pine",
  "pine": 4324,
  "pear": 0,
  "start": 12345,
  "end": 12345
}

{
  "pine":{
    "healing": {
      "total": 15679,
      "captures": {
        "spyderbot": 23,
        "agentpear": 34,
        "agentpine": 84,
        "pear": 344,
        "pine": 574,
        "briefcase": 24,
        "nightvisiongoggles": 12,
        "laserpen": 65
      },
      "deploys": {
        "spyderbot": 31,
        "briefcase": 6
      }
    }
  }
}

*/