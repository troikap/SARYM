import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CajaService } from '../../../services/caja/caja.service';
import { CajaEdit, CajaCreate } from 'src/app/model/caja/caja.model';
import { EstadoCaja } from 'src/app/model/estadoCaja/estadoCaja.model';
import { Usuario } from '../../../model/usuario/usuario.model';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { summaryFileName } from '@angular/compiler/src/aot/util';


@Component({
  selector: 'app-edit-cerrar-caja-usuario',
  templateUrl: './edit-cerrar-caja.component.html',
  styleUrls: ['./edit-cerrar-caja.component.scss']
})
export class EditCerrarCajaComponent implements OnInit {

  form: FormGroup;
  private usuarios: Usuario[];
  private estadosCaja: EstadoCaja[];
  private cajaEncontrada: boolean;
  private idCaja: string;
  private caja: any;
  private newForm = {};
  montoCierreCaja: any;
  idEstadoform: any;
  listaMovimientoCaja: any[];
  fechaYHoraCajaEstado: Date;
  private ingresos:number =0;
  private egresos:number=0;
  private total:number=0;
  private montoDeAperturaAnterior:number=0;



  accionGet;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private cajaServicio: CajaService,
    private usuarioservicio: UsuarioService
  ) {
    this.form = new FormGroup({
      'idCaja': new FormControl({ value: '', disabled: true }),                
      'descripcionCajaEstado': new FormControl('', Validators.required),
      'montoCierreCajaEstado': new FormControl('', [Validators.required, Validators.pattern(/^([0-9]+([.][0-9]{1,2})|[0-9]+)$/)] ), 
    });

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.accionGet = params.accion;
      this.idCaja = params.id;
      if (this.accionGet !== "crear") {
        console.log("editar")
        this.cajaEncontrada = true;
        this.buscarMovimientosCaja();  
       
              
      }
      else {
        this.cajaEncontrada = false;
      }
    });
    
  }

  ngOnInit() {    
  }

  reemplazarCaja(): any {
    console.log("Funcion 'reemplazarCaja()', ejecutada");
    let us = null;
    if (this.caja && this.caja.idCaja) {
      console.log("SETEO DE ID :")
      us = this.caja.idCaja;
    }

    this.idEstadoform = this.form.value['idEstadoCaja'];
    console.log("nuevo estado caja",this.idEstadoform);
     
      let rempCaja: any = {
        idCaja: us,       
        idEstadoCaja: 3,
        idUsuario:  localStorage.getItem("idUsuario"),
        descripcionCajaEstado: this.form.value['descripcionCajaEstado'],
        montoCierreCajaEstado: this.form.value['montoCierreCajaEstado']


      }
      //console.log(rempCaja);
      return rempCaja;

    

  }

  guardar() {
    //console.log(this.form);

    //Variables para mensajes//
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea ${this.accionGet} el elemento seleccionado?`;
    let _montoCierreCajaEstado = this.form.value['montoCierreCajaEstado'];
    let _idmontoSumaMovimientosAnterior  = _this.total;
    console.log(_montoCierreCajaEstado);
            
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
              let caja = _this.reemplazarCaja(); 

              if(_idmontoSumaMovimientosAnterior == _montoCierreCajaEstado ){
              
                _this.cajaServicio.updateCajaEstado(caja)
                  .then((response) => {
                    console.log("ACTUALIZADO", response);

                    const titulo = "Éxito";
                    const mensaje = "Se ha cerrado la caja de forma exitosa";

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
                            _this.router.navigate(['/cerrarcaja/']);


                          }
                        }
                      }
                    });


                  })
              
                }else{

                 

                    const titulo = "Error";
                    const mensaje = "No coincide el monto de cierre con la suma de movimientos de caja hasta el momento";

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


  buscarMovimientosCaja() {
   let _this =this;
   
    
    console.log(this.idCaja);

    if (this.idCaja !== "") {
      this.cajaServicio.getCaja(this.idCaja)
      .subscribe((data: any) => { // Llamo a un Observer
        console.log(data);
        if (data != "") {
          //console.log("RESULT ----------------->", data);
          this.caja = data;
          this.listaMovimientoCaja = this.caja.movimientocajas; 
          this.fechaYHoraCajaEstado =  this.caja['cajaestados'][0].fechaYHoraAltaCajaEstado;
          this.montoDeAperturaAnterior= this.caja['cajaestados'][0].montoAperturaCajaEstado;
var length = this.listaMovimientoCaja.length;
for (let i = 0; i < length; i++) {
  console.log(this.listaMovimientoCaja[i].fechaYHoraMovimientoCaja,this.fechaYHoraCajaEstado);
  if(this.listaMovimientoCaja[i].fechaYHoraMovimientoCaja > this.fechaYHoraCajaEstado ){
    
    if(this.listaMovimientoCaja[i].tipomovimientocaja.idTipoMovimientoCaja == 1){
    _this.ingresos += this.listaMovimientoCaja[i].montoMovimientoCaja; 
   
    console.log("el monto de apertura anterior es",this.montoDeAperturaAnterior);
  }else{
    _this.egresos += this.listaMovimientoCaja[i].montoMovimientoCaja;
  }
  
  } 
  
};  

_this.total = _this.ingresos - _this.egresos+ this.montoDeAperturaAnterior;

this.newForm = {
  idCaja: this.caja['idCaja'],         
  descripcionCajaEstado: "Cierre de Caja",
  montoCierreCajaEstado:  null
  
   
}
console.log("esta es la fehca del ultimo estado",this.fechaYHoraCajaEstado);
this.form.setValue(this.newForm);
console.log("FORM", this.form);
                       
        }
      });
    }   
    console.log("este total",_this.total);
  }
 



  

    
    
  
}
