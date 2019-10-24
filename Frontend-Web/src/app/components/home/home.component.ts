import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HomeService, IconoHome } from 'src/app/services/home/home.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl} from '@angular/forms';

import { UploadService } from 'src/app/services/upload/upload.service';


// import { AbmUsuarioComponent } from '../abm-usuario/abm-usuario.component';
// import { AbmTipomonedaComponent } from '../abm-tipomoneda/abm-tipomoneda.component';
// import { AbmUnidadmedidaComponent } from '../abm-unidadmedida/abm-unidadmedida.component';
// import { AbmCajaComponent } from '../abm-caja/abm-caja.component';
// import { AbmMesaComponent } from '../abm-mesa/abm-mesa.component';
// import { AbmRubroComponent } from '../abm-rubro/abm-rubro.component';
// import { AbmSectorComponent } from '../abm-sector/abm-sector.component';
// import { GestionarProductoComponent } from '../gestionar-producto/gestionar-producto.component';
// import { GestionarMenupromocionComponent } from '../gestionar-menupromocion/gestionar-menupromocion.component';
// import { GenerarReporteComponent } from '../generar-reporte/generar-reporte.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})
export class HomeComponent implements OnInit {
  
  iconosHome: IconoHome [];
  iconosEncargado: IconoHome [];

  variableRol = "Encargado";
  variableLibre = true;
  public respuestaImagenEnviada;
  public resultadoCarga;
  private myForm: FormGroup;
  uploadedFiles: Array<File> = [];

  constructor( private activatedRoute: ActivatedRoute, 
               private homeService: HomeService, 
               private routes: Router,
               private formBuilder: FormBuilder,
               public uploadService: UploadService ) 
    { 
      this.activatedRoute.params.subscribe(params => {
        this.iconosHome = this.homeService.getIconosHome();
        this.iconosEncargado = this.homeService.getIconosEncargado();
      });

      this.myForm = this.formBuilder.group({
        'archivo': new FormControl()
      });
    }

  ngOnInit() {
    /* Hacer lógica que verifique si se encuentra logueado. En caso de no estar 
    logueado, redirige a pantalla de login */
  }

  onUpload(){
    console.log("Upload");
    console.log("this From :",this.myForm)
    this.uploadService.uploadFile( this.myForm ).then((res) => {
      console.log('RESPUESTA ; ',res)
    })
  }

  onFileChange(e) {
    console.log('FileChange ', e.target.files)
    this.uploadedFiles = e.target.files;
    console.log(" OK " ,this.uploadedFiles)
  }




  goTo( ruta: string) {
    let next;
    switch (ruta) {
    case 'abm-usuario':
      next = '/usuario';
    break;
    case 'abm-tipomoneda':
      next = '/tipomoneda';
    break;
    case 'abm-unidadmedida':
      next = '/unidadmedida';
    break;
    case 'abm-caja':
      next = '/caja';
    break;
    case 'abm-mesa':
      next = '/mesa';
    break;
    case 'abm-rubro':
      next = '/rubro';
    break;
    case 'abm-sector':
      next = '/sector';
    break;
    case 'gestionar-producto':
      next = '/producto';
    break;
    case 'gestionar-menupromocion':
      next = '/menupromocion';
    break;
    case 'generar-reporte':
      next = '/reporte';
    break;
    case 'abrir-caja':
      next = '/abrircaja';
    break;
    case 'cerrar-caja':
      next = '/cerrarcaja';
    break;
    case 'generar-movimiento-caja':
      next = '/generarmovimientocaja';
    break;
    case 'reasignar-mozo-a-estadia':
      next = '/reasignarmozoaestadia';
    break;
    case 'habilitar-deshabilitar-producto':
      next = '/habilitardeshabilitarproducto';
    break;
    case 'anular-pedido':
      next = '/anularpedido';
    break;
    case 'gestionar-estado-estadia':
      next = '/gestionarestadoestadia';
    break;
    case 'upload':
      next = '/upload';
    break;
    }
    this.routes.navigate([next]);
  } 
}
