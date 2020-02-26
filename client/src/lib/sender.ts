

const osc = require( 'osc'); // avoid untyped ts lib

const serverAddress = window.location.hostname;
const serverPort = process.env.NODE_ENV ==="production" ?window.location.port:8088;

const wsUrl = `ws://${serverAddress}:${serverPort}`
console.log(wsUrl)

const oscPort = new osc.WebSocketPort({
  url:wsUrl , // URL to your Web Socket server.
  metadata: true
});
let ready = false;




const connectFunction = ()=>{
  try{
    ready = false;
    oscPort.open();
    console.log(`ws connected to ${wsUrl}`)
  }
  catch (e ){
    console.error("error connecting ws" ,e)
    setTimeout(connectFunction,1000)
    return
  }
  
}


oscPort.on("error",function(){
  ready=false;
  setTimeout(connectFunction,1000)
})

oscPort.on("ready", function () {
  console.log(`ws ready on ${wsUrl}`)
  ready=true
});

connectFunction();

export function sendRaw(address: string,args: {type: string;value: any}[]){
  if(ready){
    oscPort.send({address,args})
  }
  else{
    console.error('port not ready')
  }
}

export function sendOneTyped(address: string,type: "f"|"i"|"s",value: any){
  sendRaw(address,[{type,value}])
}

export function send0(address:string){
  sendRaw(address,[]);
}
export function sendI(address: string,v: number){
  sendOneTyped(address,'i',v)
}
export function sendF(address: string,v: number){
  sendOneTyped(address,'f',v)
}
export function sendS(address: string,v: string){
  sendOneTyped(address,'s',v)
}
// oscPort.on("message", function (oscMsg) {console.log("An OSC message just arrived!", oscMsg);});



/////////////////
/////////////// api
/////////////////////


export function sendAuto(m: boolean){sendI("/auto",m?1:0)}

export function sendStep(step: string){sendS("/step",step)}

export function sendPlay(m: boolean){sendI("/play",m?1:0)}

export function sendPlayPauseVid(m: boolean){send0("/vid/player/"+(m?"play":"pause"))}
export function sendPlayStopVid(m: boolean){send0("/vid/player/"+(m?"play":"stop"))}
export function sendToggleShowError(){send0("/vid/error/show")}
export function sendShutdown(reboot:boolean){send0("/system/"+(reboot?"reboot":"shutdown"));}
