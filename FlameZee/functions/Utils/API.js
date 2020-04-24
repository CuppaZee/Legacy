// const axios = require('axios');
// const querystring = require('querystring');
// const FormData = require('form-data');
// const superagent = require('superagent');
// const bent = require('bent')
// const post = bent('https://api.munzee.com/', 'POST', 'json', 200);
const needle = require('needle');
// var fue = require('form-urlencoded').default;
// var fue = i=>i;

class MunzeeAPI {
    constructor({client_id,client_secret,redirect_uri}){
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.redirect_uri = redirect_uri;
    }
    
    authURL (state='') {
        return `https://api.munzee.com/oauth?response_type=code&client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&scope=read&state=${encodeURIComponent(state)}`
    }

    async getBearerToken (code) {
        var {body: data} = await needle('post','https://api.munzee.com/oauth/login', {
                client_id: this.client_id,
                client_secret: this.client_secret,
                grant_type:'authorization_code',
                code:code,
                redirect_uri:this.redirect_uri
            }, { multipart: true })
        // var data = await post('oauth/login',fue({
        //     client_id: this.client_id,
        //     client_secret: this.client_secret,
        //     grant_type:'authorization_code',
        //     code:code,
        //     redirect_uri:this.redirect_uri
        // }))
        // var {text} = await superagent.post('https://api.munzee.com/oauth/login')
        //     .type('form')
        //     .accept('json')
        //     .send({
        //         client_id: this.client_id,
        //         client_secret: this.client_secret,
        //         grant_type:'authorization_code',
        //         code:code,
        //         redirect_uri:this.redirect_uri
        //     })
        // var data = JSON.parse(text);
        // var data = await axios({
        //     method:'post',
        //     url:'https://api.munzee.com/oauth/login',
        //     data:querystring.stringify({
        //         client_id: this.client_id,
        //         client_secret: this.client_secret,
        //         grant_type:'authorization_code',
        //         code:code,
        //         redirect_uri:this.redirect_uri
        //     }),
        //     json: true
        // })
        if(data && data.data && data.data.token && data.data.token.access_token) {
            return data.data;
        } else {
            throw Error(JSON.stringify(data))
        }
    }

    async refreshToken (token, force) {
        if(!token) throw Error('Missing Token');
        var useToken = token;
        if(token && token.refresh_token) useToken = token.refresh_token;
        var {body: data} = await needle('post','https://api.munzee.com/oauth/login', {
                client_id: this.client_id,
                client_secret: this.client_secret,
                grant_type:'refresh_token',
                refresh_token:useToken
            }, { multipart: true })
        // var data = await post('oauth/login',fue({
        //     client_id: this.client_id,
        //     client_secret: this.client_secret,
        //     grant_type:'refresh_token',
        //     refresh_token:useToken
        // }))
        // var {text} = await superagent.post('https://api.munzee.com/oauth/login')
        //     .type('form')
        //     .accept('json')
        //     .send({
        //         client_id: this.client_id,
        //         client_secret: this.client_secret,
        //         grant_type:'refresh_token',
        //         refresh_token:useToken
        //     })
        // var data = JSON.parse(text);
        // var data = await axios({
        //     method:'post',
        //     url:'https://api.munzee.com/oauth/login',
        //     data:querystring.stringify({
        //         client_id: this.client_id,
        //         client_secret: this.client_secret,
        //         grant_type:'refresh_token',
        //         refresh_token:useToken
        //     }),
        //     json: true
        // })
        if(data && data.data && data.data.token && data.data.token.access_token) {
            return Object.assign({},data.data.token,{refresh_token:useToken});
        } else {
            throw Error(data)
        }
    }

    async request (token, endpoint, inputdata = {}) {
        if(!endpoint) throw Error('Missing Endpoint');
        if(!token) throw Error('Missing Token');
        var useToken = token.access_token||token;
        
        var data = await needle('post',`https://api.munzee.com/${endpoint}`, {data:JSON.stringify(inputdata)}, { multipart: true, headers: {Authorization:`Bearer ${useToken}`} })
        // var data = await post(endpoint,fue({data:JSON.stringify(inputdata)}),{Authorization:`Bearer ${useToken}`})
        // var {text} = await superagent.post(`https://api.munzee.com/${endpoint}`)
        //     .set({Authorization:`Bearer ${useToken}`})
        //     .type('form')
        //     .accept('json')
        //     .field('data',JSON.stringify(inputdata));
        // var data = JSON.parse(text);
        // var data = await axios({
        //     method:'post',
        //     url:`https://api.munzee.com/${endpoint}`,
        //     headers: {
        //         Authorization:`Bearer ${useToken}`,
        //     },
        //     data:querystring.stringify({data:JSON.stringify(inputdata)}),
        //     json: true
        // })
        return data.body;
    }
}

module.exports = MunzeeAPI;