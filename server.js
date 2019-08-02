const io = require('socket.io')();

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




  
  const port = 8000;
  io.listen(port);
  console.log('listening on port ', port);
  