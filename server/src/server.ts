import express from 'express'
import {OSCSenderClass,logOSCMsg} from './OSCUtils'
const osc = require('osc')
import http from 'http'
import {conf} from './conf'


const app = express()
const server = new http.Server(app);
const WebSocket = require("ws");

console.log(`serving ${conf.path.public}`)


const expressOpts  = {} as any
if(process.env.NODE_ENV!=="production"){expressOpts.maxAge = '10'}
    app.use(express.static(conf.path.public, expressOpts));

const port = conf.ws.serverPort
server.listen(port,function () {
  console.log(`Example app running on http://${conf.ws.serverIp}:${port} !`)
})


var wss = new WebSocket.Server({
    server: server
});


const videoPlayerOSC = new OSCSenderClass(
    conf.vid.outIp,
    conf.vid.outPort,
    conf.osc.localPort,
    {
        msg:processMsgFromVid,
        connected:sendConfToVidPlayer,
    })


function sendConfToVidPlayer(){


    for(const [k,v] of Object.entries(conf.vid)){
        if(!(k.startsWith('outPort') || k.startsWith('outIp'))){
            videoPlayerOSC.send1Auto('/'+k,v)
        }
    }
}


const fakeLocalPort = 111111
const lightSender = new OSCSenderClass(
  conf.light.outIp,
  conf.light.outPort,
  fakeLocalPort,
  {}

  )

wss.on("connection", function (socket:any) {
    var socketPort = new osc.WebSocketPort({
        socket: socket,
        metadata: true
    });

    socketPort.on("message", function (msg:any) {
        processWSMessage(msg)
        
    });
});


function processWSMessage(msg:any){
    if(msg.address.startsWith('/auto')){
        if(msg.args && msg.args[0]){
            videoPlayerOSC.send0("/player/play")
        }
        else{
            videoPlayerOSC.send0("/player/stop")   
        }
        // videoPlayerOSC.sendMsg(msg)
    }
}

function processMsgFromVid(msg:any){
    if(msg.address.startsWith('/light/memory')){
        msg.args[0]
    }
}

