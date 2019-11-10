import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HomeService, IconoHome } from 'src/app/services/home/home.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl} from '@angular/forms';
import { UploadService } from 'src/app/services/upload/upload.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})
export class HomeComponent implements OnInit {
  
  iconosHome: IconoHome [];
  iconosEncargado: IconoHome [];

  variableRol: string;
  variableLibre = false;
  public respuestaImagenEnviada: any;
  public resultadoCarga: any;
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
      this.variableRol = localStorage.getItem("rolUsuario");

    }

  ngOnInit() {
    console.log("Rol del usuario: ", localStorage.getItem("rolUsuario"));
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
      next = '/search_mozo_estadia';
    break;
    case 'habilitar-deshabilitar-producto':
      next = '/habilitar-deshabilitar-producto';
    break;
    case 'anular-pedido':
      next = '/search_anular_pedido';
    break;
    case 'gestionar-estado-estadia':
      next = '/search_gestionar_estado_estadia';
    break;
    case 'enviar-pedido':
      next = '/enviarpedido';
    break;
    case 'cambiar-estado-pedido':
      next = '/cambiarestadopedido';
    break;
    case 'upload':
      next = '/upload';
    break;
    }
    this.routes.navigate([next]);
  } 
}
