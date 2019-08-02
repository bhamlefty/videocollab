import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');
function subscribeToTimer(cb) {
  socket.on('playController', playFunc => cb(playFunc));
  // socket.emit('subscribeToTimer', "Inital", "Hello")
}


export { subscribeToTimer};