import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HomeService, IconoHome } from 'src/app/services/home/home.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

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
  variableLibre = false;
  public respuestaImagenEnviada;
  public resultadoCarga;
  private myForm: FormGroup;

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
      });
    }

  ngOnInit() {
    /* Hacer lógica que verifique si se encuentra logueado. En caso de no estar 
    logueado, redirige a pantalla de login */
  }

  subirImagen() {
    console.log("MOSTRANDO ENVIAR")
    console.log("MOSTRANDO ENVIAR", document.getElementById('imagen'))

  }


  // public cargandoImagen(file: File ){
  //   console.log("IMAGEN :", file)
	// 	this.uploadService.uploadFile(file).then(
	// 	// this.enviandoImagen.postFileImagen(files[0]).subscribe(
	// 		response => {
	// 			this.respuestaImagenEnviada = response; 
	// 			if(this.respuestaImagenEnviada <= 1){
	// 				console.log("Error en el servidor"); 
	// 			}else{
	// 				if(this.respuestaImagenEnviada.code == 200 && this.respuestaImagenEnviada.status == "success"){
	// 					this.resultadoCarga = 1;
	// 				}else{
	// 					this.resultadoCarga = 2;
	// 				}
	// 			}
	// 		},
	// 		error => {
	// 			console.log(<any>error);
	// 		}
	// 	);//FIN DE METODO SUBSCRIBE
  // }
  

  uploadedFiles: Array<File> = [];

  onUpload(){
    console.log("Upload");
    var formData = new FormData();
    for (let i=0; i < this.uploadedFiles.length; i++) {
      console.log( "DENTRO ,",this.uploadedFiles[i])
      formData.append('archivo', this.uploadedFiles[i]);
      // formData.append(this.uploadedFiles[i].name,this.uploadedFiles[i])
      console.log("ARMANDO FORM DATA ,", formData)
    }
    console.log("FORM DATA ;" ,formData)
    // this.uploadService.uploadFile( formData ).then((res) => {
    //   console.log('RESPUESTA ; ',res)
    // })
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
    }
    this.routes.navigate([next]);
  } 
}
