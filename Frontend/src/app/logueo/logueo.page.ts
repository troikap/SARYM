import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { StorageService, Item, Log } from '../services/storage/storage.service';

@Component({
  selector: 'app-logueo',
  templateUrl: './logueo.page.html',
  styleUrls: ['./logueo.page.scss'],
})
export class LogueoPage implements OnInit {

  private form: FormGroup;
  private logueo: Log;
  private logueo2;
  private logueo3;
  items: Item[] = [];
  newItem: Item = <Item>{};

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private usuarioservicio: UsuarioService,
    private storage: StorageService
    ) { 

      this.loadLog();

      this.form = this.formBuilder.group({
        cuitUsuario: ['', Validators.compose([Validators.required, Validators.maxLength(11),Validators.minLength(11)])],
        contrasenaUsuario: ['', Validators.required]
      });

     
    }

  ngOnInit() {

  }

  loadLog() {
    this.storage.getLog().then(logs => {
      this.logueo = logs;
      console.log("logs",logs)
      console.log("logs",logs[0])
      console.log(logs[0].cuit,logs[0].pass)
    //    this.form.setValue( {
    //     cuitUsuario: logs.cuit, 
    //     contrasenaUsuario: logs.pass} )
    })
  }

  loguear() {
    this.usuarioservicio.loguear(this.form.value.cuitUsuario , this.form.value.contrasenaUsuario )
    .then(algo => {
      if (algo.title.tipo == 1) {
        console.log("LOGUEADO")
        let logueo = {cuit: this.form.value.cuitUsuario, pass: this.form.value.contrasenaUsuario , date: null}
        // this.storage.setOneObject( 'logueo',logueo)
        this.actualizarLog(logueo);
        // this.router.navigate(["/home"])
      } else {
        if (algo.title.tipo == 2){
          console.log("INVALIDOS")
        } else {
          console.log("SUSPENDIDO INHAVILITAD")
        }
      }
    })
  }

  actualizarLog(log: Log) {
     log.date = new Date();
    // log.pass = this.form.value.contrasenaUsuario;
    this.storage.updateLog(log)
      .then( res => {
        console.log("ACTUALIZANDO ", res)
        if (!res) {
          this.storage.addLog(log)
            .then( res2 => {
              console.log("CREANDO ", res2)
            })
        }
      })
  }

  goTo(key: string) {
    let page;

    switch (key) {
      case 'sign-in':
        page = '/home';
        break;
      case 'sign-up':
        page = '/sign-up';
        break;
      case 'home':
        page = '/home';
        break;
    }

    this.router.navigateByUrl(page);
  }
}
