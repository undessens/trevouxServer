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
    conf.osc.outIp,
    conf.osc.outPort,
    conf.osc.localPort,
    {
        msg:logOSCMsg,
        connected:sendConfToVidPlayer,
    }
    )
function sendConfToVidPlayer(){
    for(const [k,v] of Object.entries(conf.vid)){
        videoPlayerOSC.send1Auto('/'+k,v)
    }
}



wss.on("connection", function (socket:any) {
    var socketPort = new osc.WebSocketPort({
        socket: socket,
        metadata: true
    });

    socketPort.on("message", function (msg:any) {
        if(msg.address.startsWith('/server')){
            processServerMesage(msg)
        }
        else{
            console.log("osc websocket recvd", msg);
            videoPlayerOSC.sendMsg(msg)
        }
    });
});


function processServerMesage(msg:any){

}

