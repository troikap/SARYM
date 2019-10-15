/* https://craftpip.github.io/jquery-confirm/ */

//Manejo de Mensajes en Frontend-Web

let titulo= "Titulo";
let mensaje= "Contenido";

//////////////MENSAJE CONFIRMACION NORMAL////////////////////
($ as any).confirm({
  title: titulo,
  content: mensaje,
  type: 'blue',
  typeAnimated: true,
  theme: 'material',
  buttons: {
      aceptar: {
          text: 'Aceptar',
          btnClass: 'btn-blue',
          action: function(){
            alert("SI");
          }
      },
      cerrar: {
        text: 'Cerrar',
        action: function(){
          alert("NO");
        }
    }
  }
});
/////////////////////////////////////////////////////////////

//////////////MENSAJE CONFIRMACION ERROR////////////////////
  ($ as any).confirm({
    title: titulo,
    content: mensaje,
    type: 'red',
    typeAnimated: true,
    theme: 'material',
    buttons: {
        aceptar: {
            text: 'Aceptar',
            btnClass: 'btn-red',
            action: function(){
              alert("SI");
            }
        },
        cerrar: {
          text: 'Cerrar',
          action: function(){
            alert("NO");
          }
      }
    }
  });
/////////////////////////////////////////////////////////////

//////////////MENSAJE CONFIRMACION SUCCESS////////////////////
  ($ as any).confirm({
    title: titulo,
    content: mensaje,
    type: 'green',
    typeAnimated: true,
    theme: 'material',
    buttons: {
        aceptar: {
            text: 'Aceptar',
            btnClass: 'btn-green',
            action: function(){
              alert("SI");
            }
        },
        cerrar: {
          text: 'Cerrar',
          action: function(){
            alert("NO");
          }
      }
    }
  });
  /////////////////////////////////////////////////////////////

  //////////////MENSAJE CONFIRMACION WARNING////////////////////
  ($ as any).confirm({
    title: titulo,
    content: mensaje,
    type: 'orange',
    typeAnimated: true,
    theme: 'material',
    buttons: {
        aceptar: {
            text: 'Aceptar',
            btnClass: 'btn-orange',
            action: function(){
              alert("SI");
            }
        },
        cerrar: {
          text: 'Cerrar',
          action: function(){
            alert("NO");
          }
      }
    }
  });
  /////////////////////////////////////////////////////////////

  //////////////MENSAJE ACEPTAR NORMAL////////////////////
  ($ as any).confirm({
    title: titulo,
    content: mensaje,
    type: 'blue',
    typeAnimated: true,
    theme: 'material',
    buttons: {
        aceptar: {
            text: 'Aceptar',
            btnClass: 'btn-blue',
            action: function(){
              alert("SI");
            }
        }
    }
  });
  /////////////////////////////////////////////////////////////

  //////////////MENSAJE ACEPTAR ERROR////////////////////
  ($ as any).confirm({
    title: titulo,
    content: mensaje,
    type: 'red',
    typeAnimated: true,
    theme: 'material',
    buttons: {
        aceptar: {
            text: 'Aceptar',
            btnClass: 'btn-red',
            action: function(){
              alert("SI");
            }
        }
    }
  });
  /////////////////////////////////////////////////////////////

  //////////////MENSAJE ACEPTAR WARNING////////////////////
  ($ as any).confirm({
    title: titulo,
    content: mensaje,
    type: 'orange',
    typeAnimated: true,
    theme: 'material',
    buttons: {
        aceptar: {
            text: 'Aceptar',
            btnClass: 'btn-orange',
            action: function(){
              alert("SI");
            }
        }
    }
  });
  /////////////////////////////////////////////////////////////