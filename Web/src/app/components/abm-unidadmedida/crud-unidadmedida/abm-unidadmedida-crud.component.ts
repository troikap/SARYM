import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UnidadMedidaService } from '../../../services/unidad-medida/unidad-medida.service';
import { UnidadMedida } from 'src/app/model/unidad-medida/unidad-medida.model';

@Component({
  selector: 'app-abm-unidadmedida-crud',
  templateUrl: './abm-unidadmedida-crud.component.html',
  styleUrls: ['./abm-unidadmedida-crud.component.css']
})
export class AbmUnidadmedidaCreateComponent implements OnInit {
  form: FormGroup;
  unidadMedidaEncontrada: boolean;
  idUnidadMedida: string = "";
  accionGet;

  private newForm = {};
  private unidadMedida: UnidadMedida;

  constructor(
    private activatedRoute: ActivatedRoute,
    private unidadMedidaService :UnidadMedidaService,
    private router: Router,
  ) { 
    this.form = new FormGroup({
      'id': new FormControl({value: '', disabled: true}),
      'codigo': new FormControl('', Validators.required),
      'nombre': new FormControl('', Validators.required),
      'caracter': new FormControl('', Validators.required),
      'descripcion': new FormControl('', Validators.required)
    })

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);

      this.accionGet  = params.accion;
      this.idUnidadMedida = params.id;
      
      if (this.accionGet !== "crear") {
        this.unidadMedidaEncontrada = true;
        this.traerUnidadMedida();
      }
      else {
        this.unidadMedidaEncontrada = false;
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

  traerUnidadMedida() {
    // console.log("Funcion 'traerUnidadMedida()', ejecutada");
    // console.log("valro de idUnidadMedida: ---->", this.idUnidadMedida);

    if (this.idUnidadMedida !== "0" && this.idUnidadMedida !== "") {
      this.unidadMedidaService.getUnidadMedida(this.idUnidadMedida)
        .subscribe((data: any) => { // Llamo a un Observer
          console.log(data);
          if (data != null) {
            // console.log("RESULT ----------------->", data);
          
            this.unidadMedida = data;
    
            this.newForm = {
              id: this.unidadMedida['idUnidadMedida'],
              codigo:  this.unidadMedida['codUnidadMedida'],
              nombre:  this.unidadMedida['nombreUnidadMedida'],
              caracter:  this.unidadMedida['caracterUnidadMedida'],
              descripcion:  this.unidadMedida['descripcionUnidadMedida']
            }
  
            this.form.setValue(this.newForm);
            console.log("FORM" , this.form);
          }
      });
    }
  }

  reemplazarUnidadMedida(): UnidadMedida {
    console.log("Funcion 'reemplazarUnidadMedida()', ejecutada");

    let um = null;
    if( this.unidadMedida && this.unidadMedida.idUnidadMedida) {
      console.log("SETEO DE ID :", this.unidadMedida)
      um = this.unidadMedida.idUnidadMedida;
    } 

    let rempUsuario: UnidadMedida = {
      idUnidadMedida: um,
      codUnidadMedida:  this.form.value['codigo'],
      nombreUnidadMedida:  this.form.value['nombre'],
      caracterUnidadMedida:  this.form.value['caracter'],
      descripcionUnidadMedida:  this.form.value['descripcion']
      
    }
    return rempUsuario
  }

  guardar() {
    console.log(this.form);
    if (this.unidadMedidaEncontrada && this.accionGet === "editar") {
      let unidadMed = this.reemplazarUnidadMedida();
      this.unidadMedidaService.updateUnidadMedida( unidadMed, "libre" )
      .then( (response) => {
        console.log("ACTUALIZADO", response)
      })
    } 
    if (this.unidadMedidaEncontrada && this.accionGet === "eliminar") {
      let unidadMed = this.reemplazarUnidadMedida();
      this.unidadMedidaService.deleteUnidadMedida( unidadMed, "libre" )
      .then( (response) => {
        console.log("BORRADO", response)
      })
    } else {
      let unidadMed = this.reemplazarUnidadMedida();
      console.log("----------------------------- :", unidadMed)
      this.unidadMedidaService.createUnidadMedida( unidadMed, "libre" )
      .then( (response) => {
        console.log("CREADO", response)

        // Asigno ID al formulario//
        this.newForm = {
          id: response.data.idUnidadMedida,
          codigo:  this.form.value['codigo'],
          nombre:  this.form.value['nombre'],
          caracter:  this.form.value['caracter'],
          descripcion:  this.form.value['descripcion']
        }
        this.form.setValue(this.newForm);
        ////////////////////////////

      })
    }
  }


}
