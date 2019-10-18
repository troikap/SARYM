import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioservicio: UsuarioService,
    private router: Router,
    private rout: RouterModule,

  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      checkRecordar: false
    });
  }

  ngOnInit() {}

  loguear() {
    console.log("FORMULARIO , ",this.form)
    this.usuarioservicio.loguear(this.form.value.username , this.form.value.password )
    .then(algo => {
      if (algo.tipo == 2){ 
        console.log( "MENSAJE " ,algo.title)
      } else if (algo.tipo == 1) {
        // this.storage.set( 'logeo', algo);
        // this.storage.get('logeo')

      }
    // this.router.navigate(['/home']);

      // if (algo.title.tipo == 1) {
      //   console.log("LOGUEADO")
        // this.logueo = {cuit: this.form.value.cuitUsuario, pass: this.form.value.contrasenaUsuario, id: algo.title.idUsuario , date: null}
        // this.storage.setOneObject( 'token',algo.title.token)
        // if (this.form.value.checkRecordar){
        //   this.actualizarLog(this.logueo);
        // }
        // this.storage.setOneObject( 'currentUsuario', this.logueo)
        // this.alert();
        // this.menu.enable(true);
        // this.navController.navigateRoot('/home')
        //  this.router.navigate(["/home"])
      // } else {
      //   if (algo.title.tipo == 2){
      //     console.log("INVALIDOS")
      //   } else {
      //     console.log("SUSPENDIDO INHAVILITAD")
      //   }
        // this.alert();
      // }
    })
  }
  next(){
    console.log("SIGUIENTE")
    this.router.navigate(['/usuario'])
  }
  next2(){
    console.log("SIGUIENTE2")
  }

}
