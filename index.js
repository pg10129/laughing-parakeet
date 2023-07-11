// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static('public'));

// Chatroom
// ...

var messages = [];
var users = {};

// Function to check and remove expired messages

// Check for expired messages every second



// ...



var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'

    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
      
    });
    
  });
  
  // when the logs
  socket.on('log', function (data) {
    socket.broadcast.emit('log', data)
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    socket.username = username;
    if (addedUser) return;

    // we store the username in the socket session for this client
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
  
  // when the admin the mutes the user
  socket.on('mute', function (data) {
    socket.broadcast.emit('mute', data)
  });
  socket.on('unmute', function (data) {
    socket.broadcast.emit('unmute', data)
  });
  
  // when the
  socket.on('changed nick', function (data) {
    socket.broadcast.emit('changed nick', data)
  });
  
  // when..?
  socket.on('admin', function (data) {
    if (data.key === process.env.adminkey) {
      var newdata = data
      newdata.key = '';
      console.log(newdata)
      socket.broadcast.emit('admin redeem', newdata)
    }
  });
});


