//io('http://midominion.com')
const socket = io()

//DOm elements

let message = document.getElementById('message')
let username = document.getElementById('username')
let btn = document.getElementById('send')
let output = document.getElementById('output')
let actions = document.getElementById('actions')
let tiempo = document.getElementById('tiempo')
let userline = document.getElementById('userline')
let btn2 = document.getElementById('send2')

function obteneruser(){
    var username1 = document.getElementById('usuario').value;

    console.log(username1);
    username.value=username1;
    var x = document.getElementById("registro");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

btn.addEventListener('click', function() {  
    socket.emit('chat:message', {
        message: message.value,
        username: username.value,
        time:
          new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    });
    //console.log(username.value, message.value);
});

btn2.addEventListener('click', function() {  
    socket.emit('nuevo:usuario', {
        correo: correo.value, 
        usuario: usuario.value,
    });
    console.log(usuario.value);
    
    
});


message.addEventListener('keypress', function() {
    console.log(username.value);
    socket.emit('chat:typing', username.value);
});

socket.on('chat:message', function (data){
    
    //console.log(data);
    actions.innerHTML = '';
    output.innerHTML += `<div style="background: white;" class="mt-2 p-3 rounded text-break ">
    <strong>${data.username} </strong>: ${data.message} &nbsp;&nbsp; ${data.time} 
    </div>`
    document.querySelector('#chat-window').scrollTop = document.querySelector('#chat-window').scrollHeight

});

socket.on('chat:typing', function(data){
    actions.innerHTML = `<p> <em>✍️ ${data} is typing a message... </em></p>`
});


socket.on('nuevo:usuario', function(data){
    alert("nuevo suaurio conectado" + data.usuario)
    userline.innerHTML += `<div style="background: white;" class="mt-2 p-3 rounded text-break ">
    <strong>${data.usuario} </strong>: ${data.correo} &nbsp;&nbsp;  
    </div>`
});
