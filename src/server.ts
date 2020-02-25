import express from 'express'
import {OSCSender} from './OSCUtils'
import socketio from 'socket.io'
import http from 'http'
import {wsConf} from './conf'

const app = express()
const server = new http.Server(app);
const io = socketio(server);


// app.use('/conf.js',(req)=>{
//   console.log('req',req)
//   req.json(wsConf);

// })
app.use(express.static('public'));

server.listen(wsConf.serverPort,function () {
  console.log('Example app listening on port 8088!')
})


io.on('connection', function (socket) {
  
  socket.on('/web', function (data) {
    console.log(data);
    parseMessage(data);
  });
});


function parseMessage(d:any){
  const argNames = Object.keys(d);
  if(!argNames){console.error('emptyObject');debugger;return;}
  if(argNames.includes("step")){
    OSCSender.sendI("/step",d.step)
  }
  if(argNames.includes("auto")){
    OSCSender.sendB("/auto",d.auto)
  }

}