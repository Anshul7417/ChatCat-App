const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

  // socket.io server is an instance of http server.it is listening to incoming events 
const users ={};

io.on('connection',socket =>{      // it runs when connection is made.it is an socket.io instance which is listening to socket connections.
    socket.on('new-user-joined',name =>{
        users[socket.id]=name;   // appending to array
        socket.broadcast.emit('user-joined',name);  // broadcast emit shares info to all except us
    })

    socket.on('send',message =>{  
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]});

    })

    socket.on('disconnect', message =>{    // this event is pre-defined it runs when connection demonishes
        socket.broadcast.emit('left', users [socket.id]);
        delete users [socket.id];   // delete the user
        });
})