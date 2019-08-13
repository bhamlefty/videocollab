import openSocket from 'socket.io-client';
// const  socket = openSocket('https://limitless-lake-54723.herokuapp.com');
const  socket = openSocket('http://localhost:8000');
function subscribeToTimer(cb) {
  socket.on('playController', playFunc => cb(playFunc));
  // socket.emit('subscribeToTimer', "Inital", "Hello")
}

function timer(cb) {
  socket.on('setTimer', timerFunc => cb(timerFunc));
  // socket.emit('subscribeToTimer', "Inital", 0)
}


export {subscribeToTimer, timer};