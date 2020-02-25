export const oscConf ={
    outPort:9999,
    outIp:"127.0.0.1"
}


var ip = require("ip");
console.log ( "serverIP is ", ip.address());

export const wsConf={
  serverPort:8088,
  serverIp:ip.address()
}


