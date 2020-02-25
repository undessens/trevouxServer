const osc = require("osc");// avoid typescript issues as no types exists for osc lib
import {oscConf}  from './conf'
// Create an osc.js UDP Port listening on port 57121.
var udpPort = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 9090,
  metadata: true
});

// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg:any, timeTag:any, info:any) {
  console.log("An OSC message just arrived!", oscMsg);
  console.log("Remote info is: ", info);
});

// Open the socket.
udpPort.open();


// When the port is read, send an OSC message to, say, SuperCollider
udpPort.on("ready", function () {
    // udpPort.send({
    //     address: "/s_new",
    //     args: [
    //         {
    //             type: "s",
    //             value: "default"
    //         },
    //         {
    //             type: "i",
    //             value: 100
    //         }
    //     ]
    // }, "127.0.0.1", 57110);
  });


export sendI(address:string,i:number){
    udpPort.send({address,[{type:"i",value:i}]},oscConf.outIp,oscConf.outPort)
}
export function sendF(address:string,f:number){
    udpPort.send({address,[{type:"f",value:f}]},oscConf.outIp,oscConf.outPort)
}
export sendS(address:string,s:number){
    udpPort.send({address,[{type:"s",value:s}]},oscConf.outIp,oscConf.outPort)
}
export function sendB(address:string,b:number){
    udpPort.send({address,[{type:"b",value:!!b}]},oscConf.outIp,oscConf.outPort)
}




