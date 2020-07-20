import socketio from 'socket.io-client';
import devradar from '../config/devradar';

const socket = socketio(devradar.apiURL, {
  autoConnect: false,
});

function subscribeToNewDevs(subscribeFunction) {
  socket.on('newDev', subscribeFunction);
}

function subscribeToDeletedDevs(subscribeFunction) {
  socket.on('deletedDev', subscribeFunction);
}

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs,
  };

  socket.connect();
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export { connect, disconnect, subscribeToNewDevs, subscribeToDeletedDevs };
