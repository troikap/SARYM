import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HomeService, IconoHome } from 'src/app/services/home/home.service';
import { FormBuilder, FormGroup, FormControl,Validators} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UploadService } from 'src/app/services/upload/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  private myForm: FormGroup;
  public uploadedFiles;
  public mostrarfoto;

  public url = "http://localhost:3000/traerImagen/producto/BBBBBBBBB-2-9.jpeg";

  public carpetas= 
  [
    { key: 'producto', value: 'producto' },
    { key: 'menu', value: 'menu' },
    { key: 'promocion', value: 'promocion' },
  ]

  public idElemento;
  public nombreElemento;
  public pathElemento;
  public archivoCargado;
  public redirigir;

  constructor( 
    private activatedRoute: ActivatedRoute, 
    public uploadService: UploadService,
    private router: Router
  ) 
{ 

  // this.myForm = this.formBuilder.group({
  //   'archivo': new FormControl( Validators.required),
  //   'nombre': new FormControl('', Validators.required),
  //   'carpeta': new FormControl( Validators.required),
  //   'id': new FormControl('', Validators.required),
  //   'mostrarfoto': new FormControl(),
  //   });

    this.myForm = new FormGroup({
      'archivo': new FormControl('', Validators.required)
    });

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params.id);
      this.idElemento  = params.id;
      this.nombreElemento = params.nombre;
      this.pathElemento = params.path;
      this.redirigir = params.retorno;
    });


  }

  ngOnInit() {
  }

  prueba() {
    console.log(this.myForm);
  }

  onUpload(){
    if (this.uploadedFiles != null ){
      console.log("Upload");
      const foto = this.uploadedFiles;
      const formData = new FormData();
      formData.append('archivo', foto);
      formData.append('nombre', this.nombreElemento)
      formData.append('carpeta', this.pathElemento)
      formData.append('id', this.idElemento)
      this.uploadService.uploadFile( formData ).then((res) => {
        console.log('RESPUESTA ; ',res);
        console.log('res ',res['data']);
        this.mostrarfoto = res['data']; // Path del archivo creado
        
        //Obtener Imagen
        this.uploadService.getFile(this.pathElemento, this.mostrarfoto)
        .subscribe((data: any) => { // Llamo a un Observer
          console.log(data);
          this.archivoCargado = data;
        });


      })
    } else {
      
      ($ as any).confirm({
        title: "Error",
        content: "Seleccione imagen..",
        type: 'red',
        typeAnimated: true,
        theme: 'material',
        buttons: {
            aceptar: {
                text: 'Aceptar',
                btnClass: 'btn-red',
                action: function(){
                  console.log("Confirmación de error, por usuario.");
                }
            }
        }
      });

    }
  }

  cerrar() {
    this.router.navigate( [`/${this.redirigir}`] );
  }

  onFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      this.uploadedFiles = e.target.files[0];
    }
  }


}
