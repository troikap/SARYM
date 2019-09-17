import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';
import { DepartamentoService, Departamento } from '../services/departamento/departamento.service';
import { StorageService, Log } from '../services/storage/storage.service';
import { ToastController } from '@ionic/angular';
import * as CustomValidator from '../utils/custom-validators.util';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {

  private form: FormGroup;
  private form1: FormGroup;
  private form2: FormGroup;
  private departamentos: Departamento[];
  private newForm = {};
  private usuario = {}
  private token = null;
  private id : number = 0;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioservicio: UsuarioService,
    private departamnetoservicio: DepartamentoService,
    public activatedRoute: ActivatedRoute,
    private storage: StorageService,
    public toastController: ToastController
  ) {
    this.form1 = this.formBuilder.group({
      idUsuario: [''],
      cuitUsuario: ['', Validators.compose([Validators.required, Validators.min(9999999999), Validators.max(99999999999)])],
      nombreUsuario: ['', Validators.required],
      apellidoUsuario: ['', Validators.required],
      dniUsuario: ['', Validators.compose([Validators.required, Validators.min(9999999), Validators.max(99999999)])],
      domicilioUsuario: ['', Validators.required],
      emailUsuario: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])],
      idDepartamento: ['', Validators.required],
      nroCelularUsuario: ['', Validators.compose([Validators.required , Validators.pattern(/^[0-9\-]{12}$/)])],
      nroTelefonoUsuario: ['', Validators.compose([Validators.required , Validators.pattern(/^[0-9\-]{12}$/)])]
    });
    this.form2 = this.formBuilder.group({
      idUsuario: [''],
      contrasenaUsuario: [''],
      cuitUsuario: ['', Validators.compose([Validators.required, Validators.min(9999999999), Validators.max(99999999999)])],
      nombreUsuario: ['', Validators.required],
      apellidoUsuario: ['', Validators.required],
      dniUsuario: ['', Validators.compose([Validators.required, Validators.min(9999999), Validators.max(99999999)])],
      domicilioUsuario: ['', Validators.required],
      emailUsuario: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])],
      idDepartamento: ['', Validators.required],
      nroCelularUsuario: ['', Validators.compose([Validators.required , Validators.pattern(/^[0-9\-]{12}$/)])],
      nroTelefonoUsuario: ['', Validators.compose([Validators.required , Validators.pattern(/^[0-9\-]{12}$/)])],
      contrasenaUsuario_group: new FormGroup({
        contrasenaUsuario: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)])),
        contrasenaUsuarioRepeat: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)]))
      }, {validators: CustomValidator.equalValidator({first_control_name: 'contrasenaUsuario', second_control_name: 'contrasenaUsuarioRepeat'})})
    });
   }

  ngOnInit() {
    this.token = this.recuperarToken();
  }

  recuperarToken() {
    this.storage.getOneObject('token')
   .then( ( res)=>  {
    this.activatedRoute.params
    .subscribe( params =>{
      console.log("PARAMETROS ",params)
      this.traerDepartamentos();
      this.id = params["id"];
      if(this.id != 0){
        this.form = this.form1;
        console.log("Buscando Usuario")
        this.traerUsuario(this.id, res);
      } else {
        this.form = this.form2
        console.log("NUEVO USUARIO")
      }
    });
   })
 }

  async guardar() {
    console.log(this.form)
    this.storage.getOneObject('token')
    .then( (res) => {
      let usuario = this.crearNuevoUsuario();
      if (this.id != 0 ) {
        this.usuarioservicio.updateUsuario(usuario, res)
        .then( (resp) => {
          this.presentToast( resp );
          })
        .catch( (err) => {
          console.log("ERROR ", err)
        })
      } else {
        if (this.id == 0) {
          console.log("CREANDO  POR GUARDAR")
          this.usuarioservicio.setUsuario(usuario, 'nuevo')
            .then( (resp) => {
              console.log("GUARDANDO ", resp);
              this.presentToast( resp );
              this.router.navigate(['/logueo'])
              })
            .catch( (err) => {
              console.log("ERROR ", err)
            })
        }
      }
    })
  }

  crearNuevoUsuario() {
    let data= {};
    data = {
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
    if ( this.id > 0) {
      data['idUsuario'] = Number(this.id);
    } else {
      data['contrasenaUsuario'] = this.form.value['contrasenaUsuario_group']['contrasenaUsuario']
    }
    return data;
  }

  traerDepartamentos() {
    this.departamnetoservicio.getDepartamentos()
      .then( (res) => {
        this.departamentos = res;
      })
  }

  traerUsuario(id, token) {
    this.usuarioservicio.getUsuario(id, token)
      .then( (res) => {
        console.log( "RESPUESTA " ,res)
        this.usuario = res['Usuario'];
        this.transformarForm();
      })
  }

  transformarForm( ) {
    var cel = String(this.usuario['nroCelularUsuario']);
    var tel = String(this.usuario['nroTelefonoUsuario']);
    this.newForm = {
      idUsuario: ('' || this.usuario['idUsuario']),
      cuitUsuario: ('' || this.usuario['cuitUsuario']),
      nombreUsuario: ('' || this.usuario['nombreUsuario']),
      apellidoUsuario: ('' || this.usuario['apellidoUsuario']),
      dniUsuario: ('' || this.usuario['dniUsuario']),
      domicilioUsuario: ('' || this.usuario['domicilioUsuario']),
      emailUsuario: ('' || this.usuario['emailUsuario']),
      idDepartamento: ('' || this.usuario['idDepartamento']),
      nroCelularUsuario: ('' || cel.substr(0,3) + "-" + cel.substr(3,3) + "-" + cel.substr(6)),
      nroTelefonoUsuario: ('' || tel.substr(0,3) + "-" + tel.substr(3,3) + "-" + tel.substr(6))

    }
    this.form.setValue(this.newForm)
  }
  
  async presentToast( data ) {
    if (data.tipo == 1) {
      const toast = await this.toastController.create({
        message: data.title,
        duration: 3000,
        color: 'success',
        position: 'middle',
        translucent: true
      });
      toast.present();
    }
    if (data.tipo == 2) {
      const toast = await this.toastController.create({
        message: data.title,
        duration: 3000,
        color: 'warning',
        position: 'middle',
        translucent: true
      });
      toast.present();
    }
  }

  prueba() {
    console.log(this.form)
  }
}

