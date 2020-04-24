const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const moment = require('moment');
require('moment-timezone');
const MunzeeAPI = require('./API');
const config = require('./Config.json');
const __clan = require('./Clan');
const FlameAPI = new MunzeeAPI(config.Auth1);
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const cors = require('cors')({
  origin: true,
});
const crypto = require("crypto");
const POLYfromEntries = require('object.fromentries');

function send(params, req, res, startTime, status, data = null, error = null) {
  var x;
  if (status === 1) {
    x = {
      "data": data,
      "status_code": 200,
      "status_text": "OK",
      "error": null,
      "executed_in": 0
    }
  } else if (status === 2) {
    x = {
      "data": null,
      "status_code": 500,
      "status_text": "error",
      "error": data,
      "executed_in": 0
    }
  } else if (status === 3) {
    x = {
      "data": null,
      "status_code": 400,
      "status_text": "error",
      "error": `Missing ${data} Parameter`,
      "executed_in": 0
    }
  } else {
    x = {
      "data": data,
      "status_code": status,
      "status_text": data,
      "error": error,
      "executed_in": 0
    };
  }
  let pt = process.hrtime(startTime);
  x.executed_in = pt[0] * 1e9 + pt[1];
  x.parameters = params;
  return res.status(x.status_code).type('json').send(x);
}

async function FlameRequest(page, inputdata = {}, user_id = config.default_user_id, cryptoken) {
  try {
    var token, document;
    if (!cryptoken) {
      document = await db.collection('authToken').doc(user_id.toString()).get()
      token = document.data().token;
    } else {
      document = (await db.collection('authToken').where('cryptokens', 'array-contains', user_id.toString()).limit(1).get()).docs[0]
      token = document.data().token;
    }
    if (token.expires * 1000 < Date.now() + 60000) {
    // if (token.expires >= Date.now() - 60000) {
        console.log('Refresh',token);
        token = await FlameAPI.refreshToken(token);
        await document.ref.update({ token: token });
    }
    return await FlameAPI.request(token, page, inputdata);
  } catch (e) {
    console.log(e)
    return { data: null }
  }
}

function validateCode(code) {
  if(config.codes[code] && config.codes[code][0]<=Date.now() && config.codes[code][1]>=Date.now()) {
    return true;
  } else {
    return false;
  }
}

const mdbmunzees = yaml.safeLoad(fs.readFileSync(path.join(__dirname,'db/Munzees.yaml'), 'utf8'));
mdbmunzees.get = function(x) {
  var y = this.find(x);
  if(y) {
    return this.find(i=>i.id===(y.redirect||y.id));
  } else {
    return undefined;
  }
}

module.exports = {
  time: {
    now: (a) => moment(a).tz('America/Chicago'),
    day: (a) => moment(a).tz('America/Chicago').format('YYYY-MM-DD'),
  },
  currentGameID(){
    return 85;
  },
  validateCode,
  moment,
  send,
  functions,
  config,
  cors,
  db,
  crypto,
  firebase: admin,
  Flame: {
    API: FlameAPI,
    Request: FlameRequest,
  },
  poly: {
    fromEntries: POLYfromEntries
  },
  utils: {
    clan: __clan,
  },
  mdb: {
    Munzees: mdbmunzees
  }
}