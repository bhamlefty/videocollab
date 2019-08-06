const path = require('path')
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', function(req, res) {
  res.sendFile(__dirname, + './index.html');
});

// const port = 8000;



io.on('connection', (client) => {
    client.on('subscribeToTimer', (playState, playTime) => {
      console.log('Playstate:', playState+" PlayTime: "+playTime);
      // io.emit('playController', {curPlayState: playState, curPlayTime: playTime})
      if(playState==="Play"){
        io.emit('playController', {curPlayState: playState, curPlayTime: playTime})
        // console.log("happy")
      }
      if(playState==="Pause"){
        io.emit('playController', {curPlayState: playState, curPlayTime: playTime})
      }
      if(playState==="Intial"){
        io.emit('playController', {curPlayState: "Play", curPlayTime: 0})
      }
    });
  });


  server.listen(PORT, ()=>{
    
console.log('listening on port ', PORT);
  });



  // app.listen(9000);

  