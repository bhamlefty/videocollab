
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path')

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', './index.html'));
});

const port = 8000;
const PORT = process.env.PORT || 5000;
server.listen(PORT);
console.log('listening on port ', PORT);

io.on('connection', (client) => {
    client.on('subscribeToTimer', (playState, playTime) => {
      console.log('Playstate:', playState+" PlayTime: "+playTime);
      // io.emit('playController', {curPlayState: playState, curPlayTime: playTime})
      if(playState==="Play"){
        io.emit('playController', {curPlayState: playState, curPlayTime: playTime})
      }
      if(playState==="Pause"){
        io.emit('playController', {curPlayState: playState, curPlayTime: playTime})
      }
    });
  });




  // app.listen(9000);

  