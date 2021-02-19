const url = window.location.search;
const url_parametros = new URLSearchParams(url);
var email= url_parametros.get('email');
var nick= url_parametros.get('nick2');

const socket = io()

var mensaje_input = document.getElementById("mensaje");
var enviar_boton = document.getElementById("enviar");
var triangulo=document.getElementById("triangulo");

var chat = document.getElementById("chat");
var barra_superior = document.getElementById("superior");
var seccion_mensajes= document.getElementById("mensajes");
var barra_inferior= document.getElementById("inferior");

const bubble = document.getElementById("burbuja");
const bubble2 = document.getElementById("burbuja2");

var primer_mensaje = true;

var sonido = new Audio("./assets/sounds/notification.mp3");

function getHora() {
    let fullDate= new Date();
    let hours= fullDate.getHours();
    let minutes=fullDate.getMinutes();
    console.log(hours.lenght);
    if (minutes.toString().length == 1) minutes="0"+minutes;
    if (hours.toString().length == 1) hours="0"+hours;
    let date=hours+":"+minutes;

    return date; 
}

function enviar() {
    socket.emit('send', {
        nick: nick,
        message: mensaje_input.textContent,
        time: getHora()
    })
}

socket.on('send:server', (data) => {

    // Aquí actualizamos las burbujas
    if (data.nick === nick) {
        addUserBubble(data)
    } else {
        addOtherBubble(data)
        notificar()
    }
})

function addUserBubble(data){
    
    // Clonación
    let burbuja=bubble.cloneNode(true);

    // Usuario
    burbuja.children[0].innerText = data.nick;

    // Obtenemos la hora
    burbuja.children[1].innerText = data.time;

    // Mensaje
    burbuja.children[2].innerText = data.message;

    // Cambio de estilos
    burbuja.style.display = "grid"; 

    seccion_mensajes.appendChild(burbuja);  
}

function addOtherBubble (data) {

    let burbuja=bubble2.cloneNode(true);

    burbuja.children[0].innerText = data.nick;

    burbuja.children[1].innerText = data.time;

    burbuja.children[2].innerText = data.message;

    // Cambio de estilos
    burbuja.style.display = "grid"; 

    seccion_mensajes.appendChild(burbuja);
}

function notificar() {

    if (chat.classList.contains("chat-minimizado")) {
        sonido.play();
        barra_superior.classList.add("barra-superior-notificacion"); 
    }
}

function minimizar() {
    barra_superior.classList.remove("barra-superior-notificacion");
    seccion_mensajes.classList.toggle("ocultar");
    barra_inferior.classList.toggle("ocultar");
    chat.classList.toggle("chat-minimizado");
    triangulo.classList.toggle("acciones__triangulo-arriba");
}