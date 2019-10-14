import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartamentoService, Departamento } from '../../../services/departamento/departamento.service';
import { RolService, Rol } from '../../../services/rol/rol.service';
import { EstadoUsuarioService, EstadoUsuario } from '../../../services/estadousuario/estadousuario.service';
import { Usuario } from '../../../model/usuario/usuario.model';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-crud-usuario',
  templateUrl: './crud-usuario.component.html',
  styleUrls: ['./crud-usuario.component.scss']
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
    this.form = this.formBuilder.group({
      'idUsuario': [null],
      'apellidoUsuario': ['', Validators.required],
      'contrasenaUsuario': [null],
      'contrasenaUsuarioRepeat': [null],
      'cuitUsuario': ['', Validators.required],
      'dniUsuario': ['', Validators.required],
      'domicilioUsuario': ['', Validators.required],
      'emailUsuario': ['',  [Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])]],
      'idDepartamento': ['', Validators.required],
      'nombreUsuario': ['', Validators.required],
      'nroCelularUsuario': ['', ([Validators.required, Validators.pattern(/^[0-9\-]{9,12}$/)])],
      'nroTelefonoUsuario': ['', ([Validators.required, Validators.pattern(/^[0-9\-]{9,12}$/)])],
      'idRol': ['', Validators.required],
      'idEstadoUsuario': ['', Validators.required],
      // 'contrasenaUsuario_group': new FormGroup({
      //   'contrasenaUsuario': new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)])),
      //   'contrasenaUsuarioRepeat': new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)]))
      // }, { validators: this.equalValidator({ first_control_name: 'contrasenaUsuario', second_control_name: 'contrasenaUsuarioRepeat' }) })
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
        this.form.get('contrasenaUsuario').setValidators(Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)]));
        this.form.get('contrasenaUsuario').updateValueAndValidity();
        this.form.get('contrasenaUsuarioRepeat').setValidators([Validators.required]);
        this.form.get('contrasenaUsuarioRepeat').updateValueAndValidity();
        this.setValueChangeContraseñaRepeat();
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
            idUsuario: this.usuario['idUsuario'],
            cuitUsuario:  this.usuario['cuitUsuario'],
            nombreUsuario:  this.usuario['nombreUsuario'],
            apellidoUsuario:  this.usuario['apellidoUsuario'],
            dniUsuario:  this.usuario['dniUsuario'],
            domicilioUsuario:  this.usuario['domicilioUsuario'],
            emailUsuario:  this.usuario['emailUsuario'],
            idDepartamento:  this.usuario['idDepartamento'],
            contrasenaUsuario: null,
            nroCelularUsuario: this.usuario['nroCelularUsuario'],
            nroTelefonoUsuario: this.usuario['nroTelefonoUsuario'],
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
    else if (this.usuarioEncontrado && this.accionGet === "eliminar") {
      let user = this.reemplazarUsuario();
      // console.log("Datos A enviar: " + user);
      this.usuarioservicio.deleteUsuario( user )
      .then( (response) => {
        console.log("BORRADO", response)
      })
    } else {
      let unidadMed = this.reemplazarUsuario();
      console.log("----------------------------- :", unidadMed)
      this.usuarioservicio.setUsuario( unidadMed )
      .then( (response) => {
        console.log("CREADO", response);

        alert("Se ha Creado un nuevo registro de usuario");
        this.router.navigate( ['/usuario/']);
      })
    }
  }

  prueba() {
    console.log(this.form)
  }

  // setValueChangeContraseña(){
  //   this.form.controls.contrasenaUsuario.valueChanges
  //   .subscribe( ( resp ) => {
  //     console.log("CONTRASEÑA ,", resp)
  //     if(resp == null && this.accionGet != "crear") {
  //       this.form.get('contrasenaUsuario').clearValidators();
  //       this.form.get('contrasenaUsuarioRepeat').clearValidators();
  //     } else {
  //       this.form.get('contrasenaUsuario').setValidators(Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)]));
  //       // this.form.get('contrasenaUsuario').updateValueAndValidity();
  //       this.form.get('contrasenaUsuarioRepeat').setValidators(Validators.required);
  //       // this.form.get('contrasenaUsuarioRepeat').updateValueAndValidity();
  //     }
  //     this.form.get('contrasenaUsuario').updateValueAndValidity();
  //     this.form.get('contrasenaUsuarioRepeat').updateValueAndValidity();
  //   });
  // }

  setValueChangeContraseñaRepeat () {
    this.form.get('contrasenaUsuarioRepeat').valueChanges
    .subscribe( ( resp ) => {
      console.log("RESPUESTA :",resp)
      if ( resp == this.form.value.contrasenaUsuario ) {
        this.form.controls.contrasenaUsuarioRepeat.setErrors(null)
      } else {
        this.form.controls.contrasenaUsuarioRepeat.setErrors({not_equal: true})
      }
    })
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
