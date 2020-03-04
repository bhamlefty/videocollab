import openSocket from 'socket.io-client';
const  socket = openSocket('https://syncprototype.herokuapp.com/');
// const  socket = openSocket('http://localhost:8000');
function subscribeToTimer(cb) {
  socket.on('playController', playFunc => cb(playFunc));
  // socket.emit('subscribeToTimer', "Inital", "Hello")
}

function changeVid(cb) {
  socket.on('setVid', changeFunc => cb(changeFunc));
  // socket.emit('subscribeToTimer', "Inital", "Hello")
}

function timer(cb) {
  socket.on('setTimer', timerFunc => cb(timerFunc));
  // socket.emit('subscribeToTimer', "Inital", 0)
}


export {subscribeToTimer, timer, changeVid};