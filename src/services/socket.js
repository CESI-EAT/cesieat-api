const configureSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('a new socket client is connected');

    socket.on('auth');
  });
};

module.exports = {
  configureSocket,
};
