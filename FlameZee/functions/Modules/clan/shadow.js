const { cors, functions, send, db } = require('../../Utils');

module.exports = [
  functions.https.onRequest(async (req, res) => {
    var startTime = process.hrtime();
    return cors(req, res, async () => {
      var params = {
        game_id: {
          type: "number",
          subtype: "gameId",
          required: true,
        },
        clan_id: {
          type: "number",
          subtype: "clanId",
          required: true,
        }
      }
      if (!req.query.game_id) {
        return send(params, req, res, startTime, 3, 'game_id')
      }
      if (!req.query.clan_id) {
        return send(params, req, res, startTime, 3, 'clan_id')
      }
      var data = await db.collection(`shadow_${req.query.game_id}`).doc((req.query.clan_id || "1349").toString()).get();
      data = data.data();
      console.log(req.query,data);
      delete data.archive_data;
      return send(params, req, res, startTime, 1, data)
    })
  })
];
