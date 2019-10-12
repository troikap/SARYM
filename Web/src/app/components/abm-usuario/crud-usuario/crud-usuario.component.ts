import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartamentoService, Departamento } from '../../../services/departamento/departamento.service';
import { RolService, Rol } from '../../../services/rol/rol.service';
import { EstadoUsuarioService, EstadoUsuario } from '../../../services/estadousuario/estadousuario.service';
import { Usuario } from '../../../model/usuario/usuario.model';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-crud-usuario',
  templateUrl: './crud-usuario.component.html',
  styleUrls: ['./crud-usuario.component.css']
})
export class CrudUsuarioComponent implements OnInit {
  form: FormGroup;
  private departamentos: Departamento[];
  private roles: Rol[];
  private estadosusuarios: EstadoUsuario[];
  private usuarioEncontrado: boolean; 
  private idUsuario: number = null;
  private usuario: Usuario;
  private newForm = {};

  accionGet;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private departamnetoservicio: DepartamentoService,
    private rolservicio: RolService,
    private estadousuarioservicio: EstadoUsuarioService,
    private usuarioservicio: UsuarioService,
  ) {
    this.form = new FormGroup({
      'apellidoUsuario': new FormControl('', Validators.required),
      'contrasenaUsuario': new FormControl('', Validators.required),
      'cuitUsuario': new FormControl('', Validators.required),
      'dniUsuario': new FormControl('', Validators.required),
      'domicilioUsuario': new FormControl('', Validators.required),
      'emailUsuario': new FormControl('',  [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      'idDepartamento': new FormControl('', Validators.required),
      'nombreUsuario': new FormControl('', Validators.required),
      'nroCelularUsuario': new FormControl('', [Validators.required, Validators.pattern(/^[0-9\-]{9,12}$/)]),
      'nroTelefonoUsuario': new FormControl('', [Validators.required, Validators.pattern(/^[0-9\-]{9,12}$/)]),
      'idRol': new FormControl('', Validators.required),
      'idEstadoUsuario': new FormControl('', Validators.required)
    });

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);

      this.accionGet  = params.accion;
      this.idUsuario = params.id;
      
      if (this.accionGet !== "crear") {
        this.usuarioEncontrado = true;
        this.traerUsuario();
      }
      else {
        this.usuarioEncontrado = false;
      }
      
    });

  }
  ngOnInit() {
    this.traerDepartamentos();
    this.traerRoles();
    this.traerEstadosUsuarios();
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

  buscar() {
    console.log("funcion 'buscar()' ejecutada");
  }

  traerUsuario() {
    console.log("Funcion 'traerUsuario()', ejecutada");
    console.log(this.idUsuario);

    if (this.idUsuario !== 0) {
      this.usuarioservicio.getUsuario(this.idUsuario)
      .then((res) => {
        console.log("USUARIO TRAIDO: ", res)
        if ( res['tipo'] == 2) {
          console.log("Raro")
        } else {
        if (res) {
          this.usuario = res['Usuario'];
          this.newForm = {
            cuitUsuario:  this.usuario['cuitUsuario'],
            nombreUsuario:  this.usuario['nombreUsuario'],
            apellidoUsuario:  this.usuario['apellidoUsuario'],
            dniUsuario:  this.usuario['dniUsuario'],
            domicilioUsuario:  this.usuario['domicilioUsuario'],
            emailUsuario:  this.usuario['emailUsuario'],
            idDepartamento:  this.usuario['idDepartamento'],
            nroCelularUsuario: this.usuario['nroCelularUsuario'],
            nroTelefonoUsuario: this.usuario['nroTelefonoUsuario'],
            contrasenaUsuario: '',
            idRol: this.usuario['rolusuarios'][0].rol.idRol,
            idEstadoUsuario: this.usuario['usuarioestados'][0].estadousuario.idEstadoUsuario
          }
          this.form.setValue(this.newForm)
          console.log("FORM" , this.form)
        }
      }
      });
    }
  }

  reemplazarUsuario(): Usuario {
    console.log("Funcion 'reemplazarUsuario()', ejecutada");
    let us = null;
    if( this.usuario && this.usuario.idUsuario) {
      console.log("SETEO DE ID :", )
      us = this.usuario.idUsuario;
    } 
    let rempUsuario: Usuario = {
      idUsuario: us,
      cuitUsuario:  this.form.value['cuitUsuario'],
      nombreUsuario:  this.form.value['nombreUsuario'],
      apellidoUsuario:  this.form.value['apellidoUsuario'],
      dniUsuario:  this.form.value['dniUsuario'],
      domicilioUsuario:  this.form.value['domicilioUsuario'],
      emailUsuario:  this.form.value['emailUsuario'],
      idDepartamento:  this.form.value['idDepartamento'],
      nroCelularUsuario: this.form.value['nroCelularUsuario'],
      nroTelefonoUsuario: this.form.value['nroTelefonoUsuario'],
      contrasenaUsuario: this.form.value['contrasenaUsuario'],
      idRol: this.form.value['idRol'],
      idEstadoUsuario: this.form.value['idEstadoUsuario'],
    }
    return rempUsuario;
  }

  guardar() {
    console.log(this.form);
    if (this.usuarioEncontrado && this.accionGet === "editar") {
      let user = this.reemplazarUsuario();
      this.usuarioservicio.updateUsuario( user )
      .then( (response) => {
        console.log("ACTUALIZADO", response)
      })
    } 
    if (this.usuarioEncontrado && this.accionGet === "eliminar") {
      let user = this.reemplazarUsuario();
      this.usuarioservicio.deleteUsuario( user )
      .then( (response) => {
        console.log("BORRADO", response)
      })
    } else {
      let unidadMed = this.reemplazarUsuario();
      console.log("----------------------------- :", unidadMed)
      this.usuarioservicio.setUsuario( unidadMed )
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

  traerDepartamentos() {
    this.departamnetoservicio.getDepartamentos()
      .then((res) => {
        this.departamentos = res;
      })
  }
  traerRoles() {
    this.rolservicio.getRoles()
      .then((res) => {
        this.roles = res;
      })
  }
  traerEstadosUsuarios() {
    this.estadousuarioservicio.getEstadosUsuarios()
      .then((res) => {
        this.estadosusuarios = res;
      })
  }
}
