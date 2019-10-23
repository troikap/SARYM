import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CajaService } from '../../../services/caja/caja.service';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-generar-movimiento-caja-usuario',
  templateUrl: './crud-generar-movimiento-caja.component.html',
  styleUrls: ['./crud-generar-movimiento-caja.component.scss']
})
export class CrudGenerarMovimientoCajaComponent implements OnInit {
  
  form: FormGroup;   
  cajaEncontrada: boolean; 
  idCaja: string = "";  
  caja: any;
  tipoMovimientoCaja: any[];
  newForm = {};
  newDate = new Date();

  accionGet;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private cajaServicio: CajaService,       
    private usuarioservicio: UsuarioService
   
  ) {
    this.form = new FormGroup({              
      'idTipoMovimientoCaja': new FormControl('', Validators.required),      
      'montoMovimientoCaja': new FormControl('', Validators.required),
      'descripcionMovimientoCaja':  new FormControl('', Validators.required)
      
    });
    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.accionGet = params.accion;
      this.idCaja = params.id;    
             
    });

    
  }

  ngOnInit() {
    this.traerTipoMovimientoCaja();           
  }

  traerCaja() {
    if (this.idCaja !== "0" && this.idCaja !== "") {
      this.cajaServicio.getCaja(this.idCaja)
        .subscribe((data: any) => { // Llamo a un Observer
          console.log(data);
          if (data != null) {
            console.log("RESULT ----------------->", data);
          
            this.caja = data;
            console.log(this.caja['cajaestados'][0]);
    
            this.newForm = {
              nroCaja:  this.caja['nroCaja'],              
              idUsuario: 1
            }
  
            this.form.setValue(this.newForm);
            console.log("FORM" , this.form);
          }
      });
    }
  }

  reemplazarCaja(): any {
    console.log("Funcion 'reemplazarCaja()', ejecutada");
    let us = null;
    if( this.caja && this.caja.idCaja) {
      console.log("SETEO DE ID :", )
      us = this.caja.idCaja;
    } 
    let rempCaja: any = {      
      idCaja:  this.idCaja,   
      idUsuario: 1,
      idTipoMovimientoCaja: this.form.value['idTipoMovimientoCaja'], 
      fechaYHoraMovimientoCaja: null,    
      montoMovimientoCaja: this.form.value['montoMovimientoCaja'],
      descripcionMovimientoCaja: this.form.value['descripcionMovimientoCaja']
      
    }
    return rempCaja;
  }

  guardar() {
    console.log(this.form);

    //Variables para mensajes//
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea crear el elemento seleccionado?`;
    ///////////////////////////
    
   
      
      
      
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
                  
                  
                  let caja = _this.reemplazarCaja();
                  _this.cajaServicio.createMovimientoCaja( caja )
                  .then( (response) => {
                    console.log("ACTUALIZADO", response);
            
                    const titulo = "Éxito";
                    const mensaje = "Se ha creado el registro de Movimiento Caja de forma exitrosa";
                    
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
            
                                //ACCION
                                _this.router.navigate( [`/generarmovimientocaja/${_this.idCaja}`]);
            
            
                              }
                          }
                      }
                    });
            
            
                  })



                }
            },
            cerrar: {
              text: 'Cerrar',
              action: function(){
                console.log("Edición Cancelada");
              }
          }
        }
      });



    
    
  }
  traerTipoMovimientoCaja() {
    this.cajaServicio.getTipoMovimientoCajas()
      .then((response) => {
        this.tipoMovimientoCaja = response['data'];
        console.log("Esto se le asigna a tipoMovimientoCaja",this.tipoMovimientoCaja);
      })
  }
 
    
  
}
