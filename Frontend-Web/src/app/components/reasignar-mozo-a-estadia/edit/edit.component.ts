import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../model/usuario/usuario.model';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MozoEstadiaService } from '../../../services/mozo-estadia/mozo-estadia';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  private usuarios: Usuario[];

  private idEstadia: number;
  private estadia: any;
  private newForm = {};
  private listaMesas: any[] =[];
  private listaNumerosMesa: any[]=[];
  date: 'dd/MM/yyyy hh:mm:ss';
 


  accionGet;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private mozoEstadiaServicio: MozoEstadiaService,
    private usuarioservicio: UsuarioService
  ) {
    this.form = new FormGroup({
      'cantPersonas': new FormControl({ value: '', disabled: true }),
      'mesa': new FormControl({ value: '', disabled: true }),      
      'fechaYHoraInicioEstadia': new FormControl({ value: '', disabled: true }),
      'mozoEstadia': new FormControl('', Validators.required)  
    });

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.accionGet = params.accion;
      this.idEstadia = params.id;
      
        this.traerEstadia();
      
    });
  }

  ngOnInit() {    
  }


  traerEstadia() {
   
      this.mozoEstadiaServicio.getEstadia(this.idEstadia)
        .then((data: any) => { // Llamo a un Observer
          if (data != null) {
            this.estadia = data.data;
            console.log(this.estadia);
            console.log("estas son las mesas",this.estadia.detalleestadiamesas);
            this.listaMesas = this.estadia['detalleestadiamesas'];
            var length = this.listaMesas.length;
            for (let i = 0; i < length; i++) {
              console.log(this.estadia['detalleestadiamesas'][i].mesa.nroMesa);
              this.listaNumerosMesa.push(this.estadia['detalleestadiamesas'][i].mesa.nroMesa)
            }
            console.log(this.listaNumerosMesa);
            this.newForm = {
              cantPersonas: this.estadia['cantPersonas'],                           
              mesa: this.listaNumerosMesa.join(),
              fechaYHoraInicioEstadia: this.date = this.estadia['fechaYHoraInicioEstadia'], 
              mozoEstadia: this.estadia['mozoestadium'].usuario.idUsuario
            }

            this.form.setValue(this.newForm);
            console.log("FORM", this.form);
          }
        });
    
  }

  reemplazarEstadia(): any {
    console.log("Funcion 'reemplazarEstadia()', ejecutada");
    let us = null;
    if (this.estadia && this.estadia.idEstadia) {
      console.log("SETEO DE ID :")
      us = this.estadia.idEstadia;
    }     
      let rempCaja: any = {
        idCaja: us,       
        idEstadoCaja: 2,
        idUsuario: localStorage.getItem("idUsuario"),
        descripcionCajaEstado: this.form.value['descripcionCajaEstado'],
        montoAperturaCajaEstado: this.form.value['montoAperturaCajaEstado']


      }
      //console.log(rempCaja);
      return rempCaja;

    

  }

  guardar() {
    //console.log(this.form);

    //Variables para mensajes//
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea reasignar el mozo seleccionado?`;
   
 

            
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
            action: function () {
              let estadia = _this.reemplazarEstadia(); 
             
             
              if(estadia != null ){
              
                _this.mozoEstadiaServicio.updateEstadia(estadia)
                  .then((response) => {
                    console.log("ACTUALIZADO", response);

                    const titulo = "Éxito";
                    const mensaje = "Se ha abierto la caja de forma exitosa";

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
                          action: function () {

                            //ACCION
                            _this.router.navigate(['/abrircaja/']);


                          }
                        }
                      }
                    });


                  })
              
                }else{

                 

                    const titulo = "Error";
                    const mensaje = "No coincide el monto de apertura con el monto de cierre del dia anterior";

                    ($ as any).confirm({
                      title: titulo,
                      content: mensaje,
                      type: 'red',
                      typeAnimated: true,
                      theme: 'material',
                      buttons: {
                        aceptar: {
                          text: 'Aceptar',
                          btnClass: 'btn-green',
                          action: function () {

                            //ACCION
                          
                          }
                        }
                      }
                    });


                  

                  
                }

            }
          },
          cerrar: {
            text: 'Cerrar',
            action: function () {
              console.log("Edición Cancelada");
            }
          }
        }
      });



    
    
  }

}
