import { Injectable } from "@angular/core";
import { CanActivate, Router, NavigationEnd } from "@angular/router";
import { UsuarioService } from "../../../services/usuario/usuario.service";
import { reject } from 'q';

@Injectable({
  providedIn: "root"
})
export class LoginGuardGuard implements CanActivate {
   
  rolRecuperado: string;
  currentUrlatrib: string;
  arrayRolUrl: string [];
  rolPermitidoEnRuta = false;
  varaux = false;

  constructor(public usuarioService: UsuarioService,
    public router: Router,
  ) { }

  canActivate() {

/*
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrlatrib = event.url;
        this.arrayRolUrl.forEach(element => {
          if (element == this.currentUrlatrib) {
            this.rolPermitidoEnRuta = true;
          }
        });
        this.rolAdmitidoEnUrl(this.rolRecuperado);
        let res = this.usuarioService.estaLogueado().then(res => {
          if (res['tipo'] == 1) {
            //Tiene token válido (activo)
            this.rolRecuperado = res.dataToken.RolUsuario;
    
             let pepe = this.rolAdmitidoEnUrl(this.rolRecuperado);
              console.log("SAPBEEEEasdasdasdasdsad",pepe);
              return true;
            }});
            return false;
      };
    });
    */



    //HASTA ACA BIENNNNNNNNNNNNNNNNNNNNNNNNNN
    this.rolAdmitidoEnUrl(this.rolRecuperado);
    let res = this.usuarioService.estaLogueado().then(res => {
      if (res['tipo'] == 1) {
        //Tiene token válido (activo)
        this.rolRecuperado = res.dataToken.RolUsuario;

         let pepe = this.rolAdmitidoEnUrl(this.rolRecuperado);
          console.log("SAPBEEEE",pepe);
        

        return true;
      } else {
        // Falta enviar token si tipo == 2
        // No Autorizado" == tipo 3
        let _this = this;
        ($ as any).confirm({
          title: "Error",
          content: "No se encuentra una sesión activa. Por favor iniciar sesión.",
          type: 'red',
          typeAnimated: true,
          theme: 'material',
          buttons: {
            aceptar: {
              text: 'Aceptar',
              btnClass: 'btn-red',
              action: function () {
                 localStorage.clear();
                _this.router.navigate(['/login']);
              }
            }
          }
        });
      }
    });
    return res;
  }

  rolAdmitidoEnUrl(rol: string): boolean{

    switch ( rol ) {      
      case "Administrador":  
       this.arrayRolUrl = [
        '/usuario', 
        '/unidadmedida', 
        '/caja',
        '/mesa',
        '/rubro',
        '/sector',
        '/tipomoneda',
        '/producto',
        '/menupromocion',
        '/reporte'
       ]  
       break;  
      case "Encargado":  
      this.arrayRolUrl =    
      [
        '/abrircaja',       
      ]; 
       break;  
      default:
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrlatrib = event.url;
        this.arrayRolUrl.forEach(element => {
          if (element == this.currentUrlatrib) {
            this.rolPermitidoEnRuta = true;
          }
        });
        console.log("VARAXU", this.rolPermitidoEnRuta);
      };
    });

    return this.rolPermitidoEnRuta;

  }
}
