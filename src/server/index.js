const path = require('path')
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT = process.env.PORT || 8000;
let latencyObj={}
let latencyAryEmit=[]
app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', function(req, res) {
  res.sendFile(__dirname, + './index.html');

});

let test = (latencyAry) => {
  latencyAryEmit=[]
  latencyAryEmit = latencyAry
}

let addDataToLatencyObj = (clientID, latency) => {
  if(clientID in latencyObj){ 
    latencyObj[clientID]= latency
    //console.log("Updated Existing Latency ",latencyObj )
  }else{
    latencyObj[clientID]= latency
    //console.log("Added New Latency to latencyObj", latencyObj)
  }
  //console.log(latencyObj)
}


// const port = 8000;
io.on('connection', (client) => {
  latencyObj={}
  // let latencyAry= []
    client.on('timer', (clientTime, clientId) => {
      let serverTime= new Date().getTime()
      let dif = serverTime-clientTime
      let latency = dif/4
      let numClients=io.engine.clientsCount/4;
      // console.log("numberClientsConnected: ", numClients)

      addDataToLatencyObj(clientId, latency)

      // console.log("serverTime: ", serverTime, "clientTime: ", clientTime, "latency:  ", latency, "clientId:  ", clientId)
      //console.log(latenitcyAry)
    })

    client.on('changeVid', (src) => {
      console.log(src)
      console.log("made it")
      io.emit('setVid', {videosrc: src})
    })


    client.on('subscribeToTimer', (playState, playTime) => {
      console.log('Playstate:', playState+" PlayTime: "+playTime);
     
      // io.emit('playController', {curPlayState: playState, curPlayTime: playTime})
      if(playState==="Play"){
        io.emit('playController', {curPlayState: playState, curPlayTime: playTime, latencyObj: latencyObj})
        // console.log("this is ary ", latencyObj)
      }
      if(playState==="Pause"){
        io.emit('playController', {curPlayState: playState, curPlayTime: playTime, latencyObj: latencyObj})
      }
      if(playState==="Intial"){
        io.emit('playController', {curPlayState: "Pause", curPlayTime: 0, latencyObj: latencyObj})
      }
    });
  });


  server.listen(PORT, ()=>{
    
console.log('listening on port ', PORT);
  });



  // app.listen(9000);
