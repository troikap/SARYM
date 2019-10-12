import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { CajaService } from '../../../services/caja/caja.service';
import { Caja } from 'src/app/model/caja/caja.model';

@Component({
  selector: 'app-abm-caja-create',
  templateUrl: './abm-caja-create.component.html',
  styleUrls: ['./abm-caja-create.component.css']
})
export class AbmCajaCreateComponent implements OnInit {
  form: FormGroup;
  cajaEncontrada: boolean;
  idCaja: string = "";

  private newForm = {};
  private caja: Caja;

  constructor(
    private cajaService :CajaService,
    private router: Router,
  ) { 
    this.form = new FormGroup({
      'id': new FormControl({value: '', disabled: true}),
      'numeroCaja': new FormControl('', Validators.required),
      'idEstadoCaja': new FormControl('', Validators.required),
      'idUsuario': new FormControl('', Validators.required)
          })
  }

  ngOnInit() {
    this.ponerBuscador();
  }

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

  ponerBuscador() {
  this.form.controls['numeroCaja'].valueChanges
      .subscribe( (res) => {
        
        // console.log("valueChanges ponerBuscador----->" , res);

        if (res != "") {
          this.cajaService.getCaja(res)
          .subscribe((data: any) => { // Llamo a un Observer
            // console.log("RESULT ----------------->", data);
            
            if (data != null) { // Tengo datos
              this.cajaEncontrada = true;
              this.idCaja = data['idCaja'];
            }
            else { // No tengo datos
              this.cajaEncontrada = false;
            }
          });
        }
        else {
          this.cajaEncontrada = false;
        }

        
    })
  }

  traerUnidadMedida() {
    // console.log("Funcion 'traerUnidadMedida()', ejecutada");
    // console.log("valro de idUnidadMedida: ---->", this.idUnidadMedida);

    if (this.idCaja !== "") {
      this.cajaService.getCaja(this.idCaja)
        .subscribe((data: any) => { // Llamo a un Observer
          console.log(data);
          if (data != null) {
            // console.log("RESULT ----------------->", data);
          
            this.caja = data;
    
            this.newForm = {
              id: this.caja['idCaja'],
              numeroCaja:  this.caja['numeroCaja'] , 
              idEstadoCaja: this.caja['idEstadoCaja'],
              idUsuario:  this.caja['idUsuario']        
            }
  
            this.form.setValue(this.newForm);
            console.log("FORM" , this.form);
          }
      });
    }
  }

  reemplazarCaja(): Caja {
    console.log("Funcion 'reemplazarUnidadMedida()', ejecutada");

    let um = null;
    if( this.caja && this.caja.idCaja) {
      console.log("SETEO DE ID :", )
      um = this.caja.idCaja;
    } 

    let rempUsuario: Caja = {
      idCaja: um,
      numeroCaja:  this.form.value['numeroCaja'],
      idEstadoCaja:  this.form.value['idEstadoCaja'],
      cidUsuario:  this.form.value['cidUsuario']    
          }
    return rempUsuario
  }

  guardar() {
    console.log(this.form);
    if (this.cajaEncontrada) {
      let unidadMed = this.reemplazarCaja();
      this.cajaService.updateCaja( unidadMed, "libre" )
      .then( (response) => {
        console.log("ACTUALIZADO", response)
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
          numeroCaja:  this.form.value['numeroCaja'],
          idEstadoCaja:  this.form.value['idEstadoCaja'],
          idUsuario:  this.form.value['cidUsuario']          
        }
        this.form.setValue(this.newForm);
        ////////////////////////////

      })
    }
  }


}
