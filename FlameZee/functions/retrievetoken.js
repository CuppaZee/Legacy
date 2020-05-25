var fetch = require("node-fetch");
var { URLSearchParams } = require("url");
var config = require('./config.json');
module.exports = async function (db, {user_id,teaken}, time) {
  try {
    var doc = db.collection('auth').doc(user_id.toString());
    var data = (await doc.get()).data();
    if(teaken===false||data.teakens.includes(teaken)) {
      var token = data.token;
      if(time && token.expires*1000 > (Date.now()+(time*1000))) return ((i)=>{delete i.refresh_token;return i})(token);
      var formData = new URLSearchParams();
      formData.append('client_id', config.client_id)
      formData.append('client_secret', config.client_secret)
      formData.append('grant_type', 'refresh_token')
      formData.append('refresh_token', token.refresh_token)
      var n = await fetch('https://api.munzee.com/oauth/login', {
        method: 'POST',
        body: formData
      })
      var ne = await n.json()
      doc.update({
        token: Object.assign({},token,ne.data.token)
      });
      return ne.data.token;
    } else {
      return null;
    }
  } catch(e) {
    return null;
  }
}