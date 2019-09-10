import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';
import { DepartamentoService, Departamento } from '../services/departamento/departamento.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {

  private form: FormGroup;
  private departamentos: Departamento[];
  private newForm = {};
  private usuario = {}

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioservicio: UsuarioService,
    private departamnetoservicio: DepartamentoService,
    public activatedRoute: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      idUsuario: [''],
      cuitUsuario: ['', Validators.compose([Validators.required, Validators.min(9999999999), Validators.max(99999999999)])],
      nombreUsuario: ['', Validators.required],
      apellidoUsuario: ['', Validators.required],
      dniUsuario: ['', Validators.compose([Validators.required, Validators.min(9999999), Validators.max(99999999)])],
      domicilioUsuario: ['', Validators.required],
      emailUsuario: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])],
      idDepartamento: ['', Validators.required],
      nroCelularUsuario: ['', Validators.compose([Validators.required , Validators.pattern(/^[0-9\-]{12}$/)])],
      nroTelefonoUsuario: ['', Validators.compose([Validators.required , Validators.pattern(/^[0-9\-]{12}$/)])],
    });

    // this.form.valueChanges.subscribe(() => {
    //   console.log(this.form.valid);
    //   console.log(this.form.controls);

    // })
   }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe( params =>{
      console.log("PARAMETROS ",params)
      const id = params["id"];
      //console.log("Este es El id kkkkkkkkkkkkkkkkkkkkkkk ",id)
      if(id !== 0){
        this.traerDepartamentos();
        this.traerUsuario(id);
      }
    });
    // console.log("ROUTER  ",this.router)
    console.log("FORM ",this.form)
  }

  guardar() {
    let usuario = this.crearNuevoUsuario();
    this.usuarioservicio.setUsuario(usuario)
    console.log("adwadaw" ,this.form)
    console.log("FORM  " + (this.form.value.nroCelularUsuario.substr(0,3) + this.form.value.nroCelularUsuario.substr(4,3) + this.form.value.nroCelularUsuario.substr(8))   )
  }

  crearNuevoUsuario() {
    let data = {
      "cuitUsuario": this.form.value.cuitUsuario, 
      "nombreUsuario": this.form.value.nombreUsuario, 
      "apellidoUsuario": this.form.value.apellidoUsuario, 
      "contrasenaUsuario": this.form.value.contrasenaUsuario,   
      "dniUsuario": this.form.value.dniUsuario,
      "domicilioUsuario": this.form.value.domicilioUsuario,
      "emailUsuario": this.form.value.emailUsuario,
      "idDepartamento": this.form.value.idDepartamento, 
      "nroCelularUsuario": Number(this.form.value.nroCelularUsuario.substr(0,3) + this.form.value.nroCelularUsuario.substr(4,3) + this.form.value.nroCelularUsuario.substr(8)),
      "nroTelefonoUsuario": Number(this.form.value.nroTelefonoUsuario.substr(0,3) + this.form.value.nroTelefonoUsuario.substr(4,3) + this.form.value.nroTelefonoUsuario.substr(8))
    }
    console.log("DATA : " ,data)
    return data;
  }

  traerDepartamentos() {
    this.departamnetoservicio.getDepartamentos()
      .then( (res) => {
        this.departamentos = res;
      })
  }

  traerUsuario(id) {
    this.usuarioservicio.getUsuario(id)
      .then( (res) => {
        this.usuario = res['Usuario'];
        this.transformarForm();
      })

  }

  transformarForm(  ) {
    this.newForm = {
      idUsuario: ('' || this.usuario['idUsuario']),
      cuitUsuario: ('' || this.usuario['cuitUsuario']),
      nombreUsuario: ('' || this.usuario['nombreUsuario']),
      apellidoUsuario: ('' || this.usuario['apellidoUsuario']),
      dniUsuario: ('' || this.usuario['dniUsuario']),
      domicilioUsuario: ('' || this.usuario['domicilioUsuario']),
      emailUsuario: ('' || this.usuario['emailUsuario']),
      idDepartamento: ('' || this.usuario['idDepartamento']),
      nroCelularUsuario: ('' || this.usuario['nroCelularUsuario']),
      nroTelefonoUsuario: ('' || this.usuario['nroTelefonoUsuario']),
    }
    this.form.setValue(this.newForm)
  }
  
}
