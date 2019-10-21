import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CajaService } from '../../../services/caja/caja.service';
import { CajaEdit, CajaCreate } from 'src/app/model/caja/caja.model';
import { EstadoCaja } from 'src/app/model/estadoCaja/estadoCaja.model';
import { Usuario } from '../../../model/usuario/usuario.model';
import { UsuarioService } from '../../../services/usuario/usuario.service';


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
      'nroCaja': new FormControl('', Validators.required),
      'idEstadoCaja': new FormControl('', Validators.required),
      'idUsuario': new FormControl('', Validators.required),
      'descripcionCajaEstado': new FormControl('', Validators.required),
      'montoAperturaCajaEstado': new FormControl('', Validators.required),     
    });

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.accionGet = params.accion;
      this.idCaja = params.id;
      if (this.accionGet !== "crear") {
        console.log("editar")
        this.cajaEncontrada = true;
        this.traerCaja();
      }
      else {
        this.cajaEncontrada = false;
      }
    });
  }

  ngOnInit() {    
  }


  traerCaja() {
    if (this.idCaja !== "0" && this.idCaja !== "") {
      this.cajaServicio.getCaja(this.idCaja)
        .subscribe((data: any) => { // Llamo a un Observer
          //console.log(data['cajaestados'][0].estadocaja.idEstadoCaja);
          if (data != null) {
            console.log("RESULT ----------------->", data);
            this.montoCierreCaja = data['cajaestados'][0].montoCierreCajaEstado;
            this.caja = data;
            console.log(this.caja['cajaestados'][0]);

            this.newForm = {
              idCaja: this.caja['idCaja'],
              nroCaja: this.caja['nroCaja'],
              idEstadoCaja: this.caja['cajaestados'][0].estadocaja.idEstadoCaja,
              idUsuario: this.caja['cajaestados'][0].usuario.idUsuario,
              descripcionCajaEstado: "Apertura de Caja",
              montoAperturaCajaEstado: this.caja['cajaestados'][0].montoCierreCajaEstado
            }

            this.form.setValue(this.newForm);
            console.log("FORM", this.form);
          }
        });
    }
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
        idEstadoCaja: 2,
        idUsuario: 1,
        descripcionCajaEstado: this.form.value['descripcionCajaEstado'],
        montoAperturaCajaEstado: this.form.value['montoCierreCajaEstado']


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
    let _montoCierreCajaEstado = this.form.value['montoAperturaCajaEstado'];
    let _idmontoCierreAnterior = this.montoCierreCaja;
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

              if(_idmontoCierreAnterior == _montoCierreCajaEstado || _idmontoCierreAnterior == null ){
              
                _this.cajaServicio.updateCajaEstado(caja)
                  .then((response) => {
                    console.log("ACTUALIZADO", response);

                    const titulo = "Éxito";
                    const mensaje = "Se ha abierto la caja de forma exitrosa";

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
