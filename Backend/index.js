// node server which will handle socket io connections
var port =  process.env.port ||8000
const io = require("socket.io")(`${port}`);
io.origins('*:*')
io.set('origins', 'https://eager-goldstine-b11445.netlify.app/');
const users = {};

 io.on('connection', socket=>{
     socket.on('new-user-joined', name=>{
         console.log("New user", name);
         users[socket.id] = name;
         socket.broadcast.emit('user-joined', name);
     });

     socket.on('send', message=>{
         socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
     });

     socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
 })
