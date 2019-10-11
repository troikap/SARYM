import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { DepartamentoService, Departamento } from '../../services/departamento/departamento.service';
import { RolService, Rol } from '../../services/rol/rol.service';
import { EstadoUsuarioService, EstadoUsuario } from '../../services/estadousuario/estadousuario.service';
import { Usuario } from '../../model/usuario/usuario.model';

import { UsuarioService } from '../../services/usuario/usuario.service';




@Component({
  selector: 'app-abm-usuario',
  templateUrl: './abm-usuario.component.html',
  styleUrls: ['./abm-usuario.component.css']
})
export class AbmUsuarioComponent implements OnInit {
  form: FormGroup;
  private departamentos: Departamento[];
  private roles: Rol[];
  private estadosusuarios: EstadoUsuario[];
  private usuarioencontrado: boolean = false; 
  private idUsuario: number = null;
  private usuario: Usuario;
  private newForm = {};

  constructor(
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
  }

  ngOnInit() {
    this.traerDepartamentos();
    this.traerRoles();
    this.traerEstadosUsuarios();
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

  buscar() {
    console.log("funcion 'buscar()' ejecutada");
  }

  ponerBuscador() {
    this.form.controls.cuitUsuario.valueChanges
    .subscribe( (res) => {
      this.usuarioservicio.getUsuarioCuit(res)
      .then( (response: any) => {
        if(response.tipo == 1) {
          this.usuarioencontrado = true;
          this.idUsuario = response.Usuario.idUsuario;
          console.log("ENCONTRO ALGO", response)
        } else {
          this.usuarioencontrado = false;
          this.idUsuario = null;
        }
      }
      )
    })
  }

  traerUsuario() {

    console.log("Funcion 'traerUsuario()', ejecutada");

    let id = this.idUsuario;
    this.usuarioservicio.getUsuario(id)
      .then((res) => {
        console.log("RESPUESTA ", res)
        if ( res.tipo == 2) {
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
            idRol: this.usuario.rolusuarios[0].rol.idRol,
            idEstadoUsuario: this.usuario.usuarioestados[0].estadousuario.idEstadoUsuario
          }
          this.form.setValue(this.newForm)
          console.log("FORM" , this.form)
        }
      }
      })
  }

  reemplazarUsuario(): Usuario {

    console.log("Funcion 'reemplazarUsuario()', ejecutada");

    let us;
    if(this.usuario.idUsuario) {
      us = this.usuario.idUsuario;
    } else {
      us = null
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
    return rempUsuario
  }

  async guardar() {
    
    console.log("Funcion 'guardar()', ejecutada");
    console.log(this.form);
    console.log(this.form.value);

    if (this.usuarioencontrado) {
      let user = this.reemplazarUsuario();
      this.usuarioservicio.updateUsuario( user, "libre" )
      .then( (response) => {
        console.log("ACTUALIZAMOS", response)
      })
    } else {
      console.log("CREANDO")
      let user = this.reemplazarUsuario();
      this.usuarioservicio.updateUsuario( user, "libre" )
      .then( (response) => {
        console.log("CREADO", response)
      })
    }
    // this.storage.getOneObject('token')
    // //   .then((res) => {
    //     if (false) {
    //       this.usuarioservicio.updateUsuario(usuario, res)
    //         .then((resp) => {
    //           this.presentToast(resp);
    //         })
    //         .catch((err) => {
    //           console.log("ERROR ", err)
    //         })
    //     } else {
    //       if (this.id == 0) {
    //         this.usuarioservicio.setUsuario(usuario, 'nuevo')
    //           .then((resp) => {
    //             this.presentToast(resp);
    //           })
    //           .catch((err) => {
    //             console.log("ERROR ", err)
    //           })
    //       }
    //     }
    //   })
  }

  traerDepartamentos() {
    this.departamnetoservicio.getDepartamentos()
      .then((res) => {
        this.departamentos = res;
        // console.log(res);
      })
  }
  traerRoles() {
    this.rolservicio.getRoles()
      .then((res) => {
        this.roles = res;
        // console.log(res);
      })
  }
  traerEstadosUsuarios() {
    this.estadousuarioservicio.getEstadosUsuarios()
      .then((res) => {
        this.estadosusuarios = res;
        // console.log(res);
      })
  }
}
