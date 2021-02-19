var email_input = document.getElementById("email");
var nick_input = document.getElementById("nick2");
var ingresar_button = document.getElementById("ingresar");
var pantalla_registro = document.getElementById("registro");

// Evento que detecta cuando una tecla es soltada.
document.addEventListener("keyup", function(event) {
        validar(email_input.value, nick_input.value);
  });

  //   Este proceso valida los campos para habilitar el botón "Ingresar".
  function validar(email, nick) {

    let arroba=false;
    let punto=false;
    let completo=false;

    for (var i=0; i<email.length;i++) {
        if(email.charAt(i) == "@") arroba=true;
        if (email.charAt(i)== ".") punto=true;
    }

    if (nick!= "") completo=true;
    else completo=false;

    if (arroba && punto && completo) {
        ingresar_button.disabled = false;
        ingresar_button.className = "ingresar activado";
    } else {
        ingresar_button.disabled = true;
        ingresar_button.className = "ingresar desactivado";
    }

    // console.log("[ "+ arroba + ", " + punto + ", " + completo + "]"); // Método de comprobación
  }