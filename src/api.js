import openSocket from 'socket.io-client';
const  socket = openSocket('https://shielded-sea-84002.herokuapp.com');
function subscribeToTimer(cb) {
  socket.on('playController', playFunc => cb(playFunc));
  // socket.emit('subscribeToTimer', "Inital", "Hello")
}


export { subscribeToTimer};