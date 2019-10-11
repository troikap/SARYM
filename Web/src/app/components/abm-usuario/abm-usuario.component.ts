import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  private usuario;
  private newForm = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private departamnetoservicio: DepartamentoService,
    private rolservicio: RolService,
    private estadousuarioservicio: EstadoUsuarioService,


    private usuarioservicio: UsuarioService,
  ) { 
    this.form = this.formBuilder.group({
      apellidoUsuario: ['', Validators.required],
      contrasenaUsuario: ['', Validators.required],
      cuitUsuario: [ '', Validators.required],
      dniUsuario: ['', Validators.required],
      domicilioUsuario: ['', Validators.required],
      emailUsuario: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      idDepartamento: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      nroCelularUsuario: ['', [Validators.required, Validators.pattern(/^[0-9\-]{9,12}$/)]],
      nroTelefonoUsuario: ['', [Validators.required, Validators.pattern(/^[0-9\-]{7,11}$/)]],
      idRol: [''],
      idEstadoUsuario: [''],

    });
  }

  ngOnInit() {
    this.traerDepartamentos();
    this.traerRoles();
    this.traerEstadosUsuarios();
    this.ponerBuscador();
  }

  buscar() {

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
    console.log(this.form)
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
        console.log(res)
      })
  }
  traerRoles() {
    this.rolservicio.getRoles()
      .then((res) => {
        this.roles = res;
        console.log(res)
      })
  }
  traerEstadosUsuarios() {
    this.estadousuarioservicio.getEstadosUsuarios()
      .then((res) => {
        this.estadosusuarios = res;
        console.log(res)
      })
  }
}
