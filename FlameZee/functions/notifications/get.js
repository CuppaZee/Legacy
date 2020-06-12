var { Expo } = require('expo-server-sdk');

module.exports = {
  path: "notifications/get",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ params: { token }, db }) {
        if (!Expo.isExpoPushToken(token)) {
          console.error(`Push token ${token} is not a valid Expo push token`);
          return {
            status: "error",
            data: "Invalid Token"
          }
        }
        var d = (await db.collection('push').doc(token).get()).data();
        return {
          status: "success",
          data: d
        };
      },
    },
  ],
};
