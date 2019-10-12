import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CajaService } from '../../../services/caja/caja.service';
import { Caja } from 'src/app/model/caja/caja.model';
import { EstadoCaja } from 'src/app/model/estadoCaja/estadoCaja.model';
import { Usuario } from 'src/app/model/usuario/usuario.model';

@Component({
  selector: 'app-abm-caja-crud',
  templateUrl: './abm-caja-crud.component.html',
  styleUrls: ['./abm-caja-crud.component.css']
})
export class AbmCajaCreateComponent implements OnInit {
  form: FormGroup;
  cajaEncontrada: boolean;
  idCaja: string = "";
  listaEstadoCaja: EstadoCaja[];
  estadoCaja: EstadoCaja;
  listaUsuario: Usuario[];
  usuario: Usuario;
  accionGet;

  private newForm = {};
  private caja: Caja;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cajaService :CajaService,
    private router: Router,
  ) { 
    this.form = new FormGroup({
      'id': new FormControl({value: '', disabled: true}),
      'nroCaja': new FormControl('', Validators.required),
      'idEstadoCaja': new FormControl('', Validators.required),
      'idUsuario': new FormControl('', Validators.required)      
    })

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);

      this.accionGet  = params.accion;
      this.idCaja = params.id;
      
      if (this.accionGet !== "crear") {
        this.cajaEncontrada = true;
        this.traerCaja();
      }
      else {
        this.cajaEncontrada = false;
      }
      
    });
  }

  ngOnInit() {}

  verificarValidacionCampo(pNombreCampo: string, arregloValidaciones: string[]) {
    let countValidate = 0;
    for (let validacion of arregloValidaciones) {
      if (validacion === 'valid') {
        if (this.form.controls[pNombreCampo].valid) {
          countValidate ++;
        }
      }
      if (validacion === 'invalid') {
        if (this.form.controls[pNombreCampo].invalid) {
          countValidate ++;
        }
      }
      if (validacion === 'touched') {
        if (this.form.controls[pNombreCampo].touched) {
          countValidate ++;
        }
      }
    }

    if (countValidate === arregloValidaciones.length) {
      return true;
    }
    else {
      return false;
    }
  }

  traerCaja() {
    // console.log("Funcion 'traerUnidadMedida()', ejecutada");
    // console.log("valro de idUnidadMedida: ---->", this.idUnidadMedida);

    if (this.idCaja !== "0" && this.idCaja !== "") {
      this.cajaService.getCaja(this.idCaja)
        .subscribe((data: any) => { // Llamo a un Observer
          console.log(data);
          if (data != null) {
            // console.log("RESULT ----------------->", data);
          
            this.caja = data;
    
            this.newForm = {
              id: this.caja['idCaja'],
              nroCaja:  this.caja['nroCaja'],
              idEstadoCaja:  this.caja['idEstadoCaja'],
              idUsuario:  this.caja['idUsuario']
                          }
  
            this.form.setValue(this.newForm);
            console.log("FORM" , this.form);
          }
      });
    }
  }

  reemplazarCaja(): Caja {
    console.log("Funcion 'reemplazarCaja()', ejecutada");

    let um = null;
    if( this.caja && this.caja.idCaja) {
      console.log("SETEO DE ID :", this.caja)
      um = this.caja.idCaja;
    } 

    let rempUsuario: Caja = {
      idCaja: um,
      nroCaja:  this.form.value['nroCaja'],
      idEstadoCaja:  this.form.value['idEstadoCaja'],
      idUsuario:  this.form.value['idUsuario']
           
    }
    return rempUsuario
  }

  guardar() {
    console.log(this.form);
    if (this.cajaEncontrada && this.accionGet === "editar") {
      let caja = this.reemplazarCaja();
      this.cajaService.updateCaja( caja, "libre" )
      .then( (response) => {
        console.log("ACTUALIZADO", response)
      })
    } 
    if (this.cajaEncontrada && this.accionGet === "eliminar") {
      let caja = this.reemplazarCaja();
      this.cajaService.deleteCaja( caja, "libre" )
      .then( (response) => {
        console.log("BORRADO", response)
      })
    } else {
      let caja = this.reemplazarCaja();
      console.log("----------------------------- :", caja)
      this.cajaService.createCaja( caja, "libre" )
      .then( (response) => {
        console.log("CREADO", response)

        // Asigno ID al formulario//
        this.newForm = {
          id: response.data.idCaja,
          nroCaja:  this.form.value['nroCaja'],
          idEstadoCaja:  this.form.value['idEstadoCaja'],
          idUsuario:  this.form.value['idUsuario']
                  }
        this.form.setValue(this.newForm);
        ////////////////////////////

      })
    }
  }


}
