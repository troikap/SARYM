import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HomeService, IconoHome } from 'src/app/services/home/home.service';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { UploadService } from 'src/app/services/upload/upload.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})
export class HomeComponent implements OnInit {
  
  iconosHome: IconoHome [];
  iconosEncargado: IconoHome [];
  iconosCocinero: IconoHome [];

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
        this.iconosCocinero = this.homeService.getIconosCocinero();
      });

      this.myForm = this.formBuilder.group({
        'archivo': new FormControl()
      });
      this.variableRol = localStorage.getItem("rolUsuario");

    }

  ngOnInit() {
  }

  onUpload(){
    this.uploadService.uploadFile( this.myForm ).then((res) => {
    })
  }

  onFileChange(e) {
    this.uploadedFiles = e.target.files;
  }

  goTo( ruta: string) {
    let next;
    switch (ruta) {
    case 'abm-usuario':
      next = '/usuario';
    break;
    case 'abm-rol':
      next = '/rol';
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
      next = '/enviar_pedido';
    break;
    case 'upload':
      next = '/upload';
    case 'backup':
        next = '/backup';
    break;
    }
    this.routes.navigate([next]);
  } 
}
