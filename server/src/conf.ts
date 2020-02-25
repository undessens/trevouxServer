import path from 'path'
import fs from 'fs'
const jsonConfig=path.resolve(__dirname,'../../config.json') 



var ip = require("ip");
console.log ( "serverIP is ", ip.address());



export const  conf  = {
  path:{
    public:path.resolve(__dirname,'../../client/dist/'),
  },
  osc :{
    outPort:9999,
    outIp:"127.0.0.1",
    localPort:3333
  },
  ws:{
    serverPort:8088,
    serverIp:ip.address(),
    url:()=>{`${conf.ws.serverPort}:${conf.ws.serverPort}`}  
  },
  vid:{

  }
  
} as any


let confObj = {} as any
try{
 confObj = fs.readFileSync(jsonConfig)
 
for(const modk of Object.keys(confObj)){
  if(Object.keys(conf).includes(modk) ){
    for(const k of Object.keys(confObj[modk])){
      if(Object.keys(conf[modk]).includes(k)){
        conf[modk][k] = confObj[modk][k]
      }
    }
  }
}
}
catch(e){
  console.error(`can't read conf at ${jsonConfig}`,e)
}











