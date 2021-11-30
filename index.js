const path = require('path');
const express = require('express');
//inicializando, app tandre todas las configuracion dels ervidor
const app = express();

var users = 0;
//seting, local
app.set('port', process.env.PORT || 3000);

//static files
//console.log(__dirname + 'public'); //ruta
/* se esta enviando a la carpeta public desde el navegador*/
app.use(express.static(path.join(__dirname, 'public')));

// start the server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));//concatenando el puerto y texto
});

const SocketIO = require('socket.io');
const io = SocketIO(server);


var numClients = 0;
//WEB SOCKETS
io.on('connection', (socket) => {
    console.log('nueva coneccion', socket.id);

    socket.on('chat:typing', (data) =>{
        socket.broadcast.emit('chat:typing', data);
        //console.log(data);
    })

    socket.on('chat:message', (data) => {
        //console.log(data);
        io.sockets.emit('chat:message', data);
    });

    socket.on('nuevo:usuario', (data) =>{
        console.log('correo ' + data.correo +' usuario: ' + data.usuario);
        socket.broadcast.emit('nuevo:usuario', data);
    })

});




