var sharp = require('sharp');
var path = require('path');
var axios = require('axios');
var fs = require('fs');

function g(icon) {
  var x = icon.replace(/[^a-zA-Z0-9]/g,'');
  if(x!=="munzee"&&x.endsWith('munzee')) return x.replace(/munzee$/,'')
  return x;
}

async function downloadIcon (icon,size) {
  const url = `https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(icon)}.png`
  const savePath = path.resolve(__dirname, '../FlameZee/public/pins/'+size, `${g(icon)}.png`)
  if(fs.existsSync(savePath)) return new Promise((resolve, reject)=>{
    resolve(true);
  });
  const writer = fs.createWriteStream(savePath)
  const resizer = sharp().resize(null,size).png();

  var response = null;
  if(fs.existsSync(path.resolve(__dirname, 'icons/', `${g(icon)}.png`))) {
    response = fs.createReadStream(path.resolve(__dirname, 'icons/', `${g(icon)}.png`))
  } else {
    response = (await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })).data
  }
  

  response
    .pipe(resizer)
    .pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}
var types = require('./output/types.min.json');
(async function() {
  var arr = [];
  for(let type of types.filter(i=>!i.missingicon)) {
    await downloadIcon(type.icon,64).then(()=>{
      console.log(type.icon,64)
    })
  }
  for(let type of types.filter(i=>!i.missingicon)) {
    await downloadIcon(type.icon,128).then(()=>{
      console.log(type.icon,128)
    })
  }
  // await Promise.all(arr);
  console.log('DONE')
})();