/* https://craftpip.github.io/jquery-confirm/ */

// NOTA: si al utilizar cualquiera de estas funciones, da error, verificar que NO se debe importar la siguiente línea:
// import * as $ from 'jquery'
// Al importar esa linea, el código lanza error.

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

   //////////////MENSAJE ACEPTAR SUCESS////////////////////
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
  //////////////PROMP PARA INGRESO DE DATOS////////////////////
  
  ($ as any).confirm({
    title: titulo,
    content: '' +
    '<form action="" class="formName">' +
    '<div class="form-group">' +
    '<label>Ingrese Datos</label>' +
    '<input type="text" placeholder="Tus Datos" class="name form-control" required />' +
    '</div>' +
    '</form>',
    buttons: {
        formSubmit: {
            text: 'Aceptar',
            btnClass: 'btn-blue',
            action: function () {
                var name = this.$content.find('.name').val();
                if(!name){
                  ($ as any).alert('provide a valid name');
                    return false;
                }
                ($ as any).alert('Your name is ' + name);
            }
        },
        cancelar: function () {
            //close
        },
    },
    onContentReady: function () {
        // bind to events
        var jc = this;
        this.$content.find('form').on('submit', function (e) {
            // if the user submits the form by pressing enter in the field.
            e.preventDefault();
            jc.$$formSubmit.trigger('click'); // reference the button and click it
        });
    }
});