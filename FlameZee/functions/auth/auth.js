var fetch = require("node-fetch");
var crypto = require("crypto");
var { URLSearchParams } = require("url");
var config = require('../config.json');
var firebase = require("firebase-admin");

module.exports = {
  path: "auth/auth",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {
        user_id: {
          type: "userid",
        },
      },
      async function({ params: { code, state }, res, db }) {
        var state_data = JSON.parse(state || "{}");
        var d = await fetch("https://api.munzee.com/oauth/login", {
          method: "POST",
          body: new URLSearchParams({
            client_id: config.client_id,
            client_secret: config.client_secret,
            grant_type: "authorization_code",
            code,
            redirect_uri: config.redirect_uri,
          }),
        });
        var data = await d.json();
        var teaken = crypto.randomBytes(20).toString("hex");
        var user_d = await fetch("https://api.munzee.com/user", {
          method: "POST",
          body: new URLSearchParams({
            access_token: data.data.token.access_token,
            data: JSON.stringify({
              user_id: data.data.user_id
            })
          }),
        });
        var user_data = await user_d.json();
        var { username, user_id } = user_data.data;
        
        var doc = db.collection('auth').doc(user_id.toString())
        var doc_data = (await doc.get()).data();

        await doc.set({
          token: data.data.token,
          user_id,
          teakens: [
            ...(doc_data?(doc_data.teakens||[]):[]),
            teaken
          ]
        })

        res.redirect(
          `${state_data.redirect}?teaken=${encodeURIComponent(
            teaken
          )}&username=${username}&user_id=${user_id}&state=${encodeURIComponent(state)}`
        );


        var platform = {
          android: "🤖",
          ios: "🍎",
          web: "🌐"
        }[state_data.platform]||`[${state_data.platform}] `;
        var {list} = (await db.collection('data').doc('user_list').get()).data();
        if(list.includes(username)){
            discordmessage = `${platform}🔁 ${username} | ${list.length} Users`
        } else {
            discordmessage = `${platform}🆕 ${username} | User #${list.length+1}`;
            db.collection('data').doc('user_list').update({
                list: firebase.firestore.FieldValue.arrayUnion(username)
            })
        }
        await fetch(
          config.discord.authorization,
          {
            method: "POST",
            body: new URLSearchParams({
              content: discordmessage
            })
          }
        )
        return {
          norespond: true,
        };
      },
    },
  ],
};
