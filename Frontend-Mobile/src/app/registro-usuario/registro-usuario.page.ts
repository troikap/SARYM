import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';
import { DepartamentoService, Departamento } from '../services/departamento/departamento.service';
import { StorageService, Log } from '../services/storage/storage.service';
import { ToastController } from '@ionic/angular';
import * as CustomValidator from '../utils/custom-validators.util';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {

  public form: FormGroup;
  public form1: FormGroup;
  public form2: FormGroup;
  public departamentos: Departamento[];
  public newForm = {};
  public usuario = {}
  public id: number = 0;
  public existenciaUsuario: boolean = false;
  public mensajeExistenciaUsuario: string = null;
  public nuevoUsuario: boolean = false;
  public gender: string = '';
  public isDNI: boolean = false;
  public cuitValidated: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioservicio: UsuarioService,
    private departamnetoservicio: DepartamentoService,
    public activatedRoute: ActivatedRoute,
    private storage: StorageService,
    public toastController: ToastController,
    private navController: NavController
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
      gender: [''],
      nroCelularUsuario: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9\-]{12}$/)])],
      nroTelefonoUsuario: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9\-]{12}$/)])]
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
      nroCelularUsuario: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9\-]{12}$/)])],
      nroTelefonoUsuario: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9\-]{12}$/)])],
      gender: [''],
      contrasenaUsuario_group: new FormGroup({
        contrasenaUsuario: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(25)])),
        contrasenaUsuarioRepeat: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(25)]))
      }, { validators: CustomValidator.equalValidator({ first_control_name: 'contrasenaUsuario', second_control_name: 'contrasenaUsuarioRepeat' }) })
    });
  }

  ngOnInit() {
    this.recuperarToken();
  }

  validateCuitFormat(cuitStr: string, gen: string): boolean {
    if (cuitStr.length == 11) {
      this.isDNI = false;
      const dni = cuitStr.substring(2, 10);
      const cuitCalculated = this.calculateCuitByDni(dni, gen);
      if (!gen || gen == 'empresa') {
        return true;
      }
      if (cuitCalculated == cuitStr) {
        return true;
      }
      return false;
    } else if (cuitStr.length == 7 || cuitStr.length == 8){
      this.isDNI = true;
    } else {
      this.isDNI = false;
      return false;
    }
  }

  onChangeGen() {
    const gender = this.form.controls['gender'].value;
    const dni = String(this.form.controls['dniUsuario'].value);
    if (dni.length == 7 || dni.length == 8) {
      const cuitCalculated = this.calculateCuitByDni(dni, gender);
      const validated = this.validateCuitFormat(cuitCalculated, gender);
      if (validated == true) {
        this.form.controls['cuitUsuario'].setValue(`${cuitCalculated}`);
      }
    }
  }

  calculateCuitByDni(dniStr: string, gen: string): string {
    if (dniStr.length == 7) {
      dniStr = `0${dniStr}`;
    }
    let z = 0;
    let xy = '20';
    switch (gen) {
      case 'masculino':
        xy = '20';
        break;
      case 'femenino':
        xy = '27';
        break;    
      default:
         xy = '30';
        break;
    }
    const calc = (parseInt(xy[0]) * 5
        + parseInt(xy[1]) * 4
        + parseInt(dniStr[0]) * 3
        + parseInt(dniStr[1]) * 2
        + parseInt(dniStr[2]) * 7
        + parseInt(dniStr[3]) * 6
        + parseInt(dniStr[4]) * 5
        + parseInt(dniStr[5]) * 4
        + parseInt(dniStr[6]) * 3
        + parseInt(dniStr[7]) * 2);
    const rest = calc % 11;    
    if (rest == 1) {
      switch (gen) {
        case 'masculino':
          z = 9;
          xy = '23';
          break;
        case 'femenino':
          z = 4;
          xy = '23';
          break;      
        default:
          break;
      }
    } else if (rest == 0){
      z = 0;
    } else {
      z = 11 - rest;
    }
    return `${xy}${dniStr}${z}`;
  }

  modificadoCuit() {
    this.form.controls.dniUsuario.setValue(this.form.value.dniUsuario)
  }

  setValidateDNI() {
    this.form.controls['dniUsuario'].valueChanges
    .subscribe((resp) => {
      let cuit = String(this.form.value.cuitUsuario).slice(2,10);
      if ( Number(cuit) == Number(resp)) {
        this.form.controls.dniUsuario.setErrors(null);
      } else {
        this.form.controls.dniUsuario.setErrors({not_equals: true});
      }
      this.form.controls.dniUsuario.valid;
    })
  }

  validarExistenciaUsuario(){
    console.log("Validar Existencia")
      this.form.controls.cuitUsuario.valueChanges
      .subscribe( respuesta => {
        this.usuarioservicio.validarExistenciaUsuario( respuesta )
        .then( (res) => {
          if (res.tipo == 2) {
            this.existenciaUsuario = true;
            this.mensajeExistenciaUsuario = res.descripcion;
            this.form.controls.cuitUsuario.setErrors({pattern: true});
          } else {
            this.existenciaUsuario = false;
          }
        })
    });
  }

  recuperarToken() {
    this.activatedRoute.params
      .subscribe(params => {
        this.traerDepartamentos();
        this.id = params["id"];
        if (this.id != 0) {
          this.form = this.form1;
          console.log("Buscando Usuario")
          this.traerUsuario(this.id);
          this.nuevoUsuario = true;
        } else {
          this.form = this.form2
          console.log("Nuevo Usuario")
          this.validarExistenciaUsuario();
          this.nuevoUsuario = false;
        }
        this.setValidateDNI()
      });
  }

  guardar() {
    let usuario = this.crearNuevoUsuario();
    if (this.id != 0) {
      this.usuarioservicio.updateUsuario(usuario)
        .then((resp) => {
          this.presentToast(resp, 'editado');
        })
        .catch((err) => {
          console.log("ERROR ", err)
        })
    } else {
      if (this.id == 0) {
        usuario['activadoUsuario'] = false;
        this.usuarioservicio.setUsuario(usuario)
          .then((resp) => {
            this.presentToast(resp, 'creado');
            usuario['idUsuario'] = resp.Usuario['idUsuario']
            this.usuarioservicio.envioEmail(usuario, 'activar');
            this.navController.navigateRoot('/logueo');
          })
          .catch((err) => {
            console.log("ERROR ", err)
          })
      }
    }
  }

  crearNuevoUsuario() {
    let data = {};
    data = {
      "cuitUsuario": this.form.value.cuitUsuario,
      "nombreUsuario": this.form.value.nombreUsuario,
      "apellidoUsuario": this.form.value.apellidoUsuario,
      "contrasenaUsuario": this.form.value.contrasenaUsuario,
      "dniUsuario": this.form.value.dniUsuario,
      "domicilioUsuario": this.form.value.domicilioUsuario,
      "emailUsuario": this.form.value.emailUsuario,
      "idDepartamento": this.form.value.idDepartamento,
      "nroCelularUsuario": Number(this.form.value.nroCelularUsuario.substr(0, 3) + this.form.value.nroCelularUsuario.substr(4, 3) + this.form.value.nroCelularUsuario.substr(8)),
      "nroTelefonoUsuario": Number(this.form.value.nroTelefonoUsuario.substr(0, 3) + this.form.value.nroTelefonoUsuario.substr(4, 3) + this.form.value.nroTelefonoUsuario.substr(8))
    }
    if (this.id > 0) {
      data['idUsuario'] = Number(this.id);
    } else {
      data['contrasenaUsuario'] = this.form.value['contrasenaUsuario_group']['contrasenaUsuario']
    }
    return data;
  }

  traerDepartamentos( ) {
    this.departamnetoservicio.getDepartamentos()
      .then((res) => {
        this.departamentos = res;
      })
  }

  traerUsuario(id) {
    this.usuarioservicio.getUsuario(id)
      .then((res) => {
        this.usuario = res['Usuario'];
        this.transformarForm();
      })
  }

  transformarForm() {
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
      gender: (''),
      nroCelularUsuario: ('' || cel.substr(0, 3) + "-" + cel.substr(3, 3) + "-" + cel.substr(6)),
      nroTelefonoUsuario: ('' || tel.substr(0, 3) + "-" + tel.substr(3, 3) + "-" + tel.substr(6))
    }
    this.form.setValue(this.newForm)
  }

  validateCuit() {
    let dni = String(this.form.controls['dniUsuario'].value);
    this.form.controls['gender'].setValue('');
    if (dni != null ) {
      if (dni.length == 11) {   
        this.isDNI = false;   
      } else if (dni.length == 7 || dni.length == 8){
        this.isDNI = true;
        this.cuitValidated = false;
      } else {
        this.isDNI = false;
        this.cuitValidated = false;
      }
    }
  }

  async presentToast(data, tipo) {
    console.log("data" ,data)
    let addMensaje = 'Verifique su correo para activar su cuenta.'
    
    if (data.tipo == 1) {
      let toast;
      if (tipo == 'creado') {
        toast = await this.toastController.create({
          message: `${data.title.descripcion} ${addMensaje}`,
          duration: 3000,
          color: 'success',
          position: 'middle',
          translucent: true
        });
      } else {
        toast = await this.toastController.create({
          message: `${data.title.descripcion}`,
          duration: 3000,
          color: 'success',
          position: 'middle',
          translucent: true
        });
      }
     
      toast.present();
    }
    if (data.tipo == 2) {
      const toast = await this.toastController.create({
        message: data.title.descripcion,
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

