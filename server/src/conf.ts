import path from 'path'
import fs from 'fs'
const jsonConfig=path.resolve(__dirname,'../../config.json') 
const csv = require('csv-parser');


var ip = require("ip");
console.log ( "serverIP is ", ip.address());



export const  conf  = {
  path:{
    public:path.resolve(__dirname,'../../client/dist/'),
  },
  osc :{
    localPort:4444
  },
  ws:{
    serverPort:8088,
    serverIp:ip.address(),
    url:()=>{`${conf.ws.serverPort}:${conf.ws.serverPort}`}  
  },
  vid:{
    outPort:12345,
    outIp:"127.0.0.1",
    csvFile:path.resolve(__dirname,"../../tst.csv"),
    "averageColor/activate":0,
    potList:[]
  },
  light:{
    outPort:11000,
    outIp:"127.0.0.1",
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


conf.potList =[]
fs.createReadStream(conf.vid.csvFile)
.pipe(csv())
.on('data', (row:any) => {
  conf.potList.push(row[1])
  console.log(row);
})
.on('end', () => {
  // console.log('CSV file successfully processed');
  conf.potList = Array.from(new Set(conf.potList))
  console.log(conf.potList)

})
.on('error', (e:any) => {
  console.error('CSV error',e);
});









