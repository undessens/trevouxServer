import express from 'express'
import {OSCSenderClass,logOSCMsg} from './OSCUtils'
const osc = require('osc')
import http from 'http'
import {conf} from './conf'
var history = require('connect-history-api-fallback');
const isPi = require('detect-rpi');
const { exec } = require('child_process');

const app = express()
app.use(history())
const server = new http.Server(app);
const WebSocket = require("ws");
let isAutoMode = true;
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
    const firstArg = msg.args? (msg.args[0] ?msg.args[0].value : undefined):undefined
    if(msg.address.startsWith('/auto')){
        isAutoMode = msg.args && !!firstArg
        if(isAutoMode){
            videoPlayerOSC.send0("/player/play")
            lightSender.sendSF("/sequencePlayer/goToStateNamed","autoOn",conf.light.fadeTimeAuto)
        }
        else{
            console.log('stoping')
            videoPlayerOSC.send0("/player/stop")   
            lightSender.sendSF("/sequencePlayer/goToStateNamed","autoOff",conf.light.fadeTimeManual)
        }
        // videoPlayerOSC.sendMsg(msg)
    }
    else if(msg.address.startsWith('/vid')){
        msg.address = msg.address.substring(4)
        console.log('transmit to vid',msg)
        videoPlayerOSC.sendMsg(msg)
    }
    else if(msg.address.startsWith('/system/')){
        const cmd = msg.address.substring(8)
        
        const eCommand = `shutdown ${cmd==="reboot"?"-r":""} now`
        console.log('systemCmd',eCommand)
        if(isPi()){

            exec(eCommand, function(error:any, stdout:any, stderr:any){ 
                if(error){
                    console.error("shutdown error",error)
                }
                if(stderr){
                    console.error("shutdown stderr",stderr)
                }
                if(stdout){
                    console.error("shutdown stdout",stdout)
                }
            })


        }

    }
    else if(msg.address==="/step"){
        console.log("sending step",firstArg)
        lightSender.sendSF("/sequencePlayer/goToStateNamed",firstArg,conf.light.fadeTimeManual)
    }
}

function processMsgFromVid(msg:any){
    const firstArg = msg.args? (msg.args[0] ?msg.args[0].value : undefined):undefined
    console.log('messageFromVid',firstArg)
    if(msg.address.startsWith('/light/memory')){

        const memName = firstArg;
        lightSender.sendSF("/sequencePlayer/goToStateNamed",memName,conf.light.fadeTimeAuto)
    }
}

