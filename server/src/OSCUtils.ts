const osc = require("osc");// avoid typescript issues as no types exists for osc lib

export function logOSCMsg (oscMsg:any, timeTag:any, info:any) {
  console.log("An OSC message just arrived!", oscMsg);
  console.log("Remote info is: ", info);
}

export class OSCSenderClass{
  public udpPort:any;

  constructor(public remoteIp:string,
    public remotePort:number,
    public localPort:number,
    cbs:{err?:(e:any)=>void,msg?:(oscMsg: any, timeTag?: any, info?: any)=>void,connected?:(e:any)=>void}){
    // Create an osc.js UDP Port listening on port 57121.
    this.udpPort = new osc.UDPPort({
      localAddress:'127.0.0.1' ,
      localPort,
      metadata: true
    });
    
    
    if(cbs.connected){
      // this.connected =  cbs.connected
      this.udpPort.on("ready",cbs.connected);
    }
    if(cbs.err){
      // this.err = cbs.err  
      this.udpPort.on("error",cbs.err);
    }
    if(cbs.msg){
      // this.msg = cbs.msg
      this.udpPort.on("message",cbs.msg);
    }
    

    
    
    
    
    
    // Open the socket.
    this.udpPort.open();

  }

  sendMsg(msg:any){
    this.udpPort.send(msg,this.remoteIp,this.remotePort)
  }
  send1Auto(address:string,v:any){
   const  type = typeof(v)==="string"?"s":
    (!isNaN(v)?"f":undefined)
    if(type===undefined){console.error("can't infer type on ",v);return;}
    this.send1(address,type,v);

  }
  send1(address:string,type:string,value:any){
    this.sendMsg({address,args:[{type,value}]});
  }
  send2(address:string,type:string,value:any,t2:string,v2:any){
    this.sendMsg({address,args:[{type,value},{type:t2,value:v2}]});
  }
  send3(address:string,type:string,value:any,t2:string,v2:any,t3:string,v3:any){
    this.sendMsg({address,args:[{type,value},{type:t2,value:v2},{type:t3,value:v3}]});
  }

  sendI(address:string,i:number){
    this.send1(address,"i",i);
  }

  sendF(address:string,f:number){
    this.send1(address,"f",f);
  }
  sendS(address:string,s:number){
    this.send1(address,"s",s);
  }
  
  

}






