const { Expo } = require('expo-server-sdk');

// Create a new Expo SDK client
let expo = new Expo();

module.exports = async function (db, messages) {
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }

  return await db.collection('notifications').add({
    tickets,
    sent_at: Date.now()
  });
}