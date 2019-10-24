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
  
  iconosHome: IconoHome [];
  iconosEncargado: IconoHome [];

  variableRol = "Encargado";
  variableLibre = false;
  public respuestaImagenEnviada;
  public resultadoCarga;
  private myForm: FormGroup;
  uploadedFiles;
  mostrarfoto;
  url = "http://localhost:3000/traerImagen/producto/BBBBBBBBB-2-9.jpeg";

  carpetas= 
  [
    { key: 'producto', value: 'producto' },
    { key: 'menu', value: 'menu' },
    { key: 'promocion', value: 'promocion' },
  ]

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
'archivo': new FormControl( Validators.required),
'nombre': new FormControl('', Validators.required),
'carpeta': new FormControl( Validators.required),
'id': new FormControl('', Validators.required),
'mostrarfoto': new FormControl(),
});
}

  ngOnInit() {
  }

  prueba() {
    console.log(this.myForm)
  }

  onUpload(){
    if (this.uploadedFiles != null ){
      console.log("Upload");
      const foto = this.uploadedFiles;
      const formData = new FormData();
      formData.append('archivo', foto);
      formData.append('nombre', this.myForm.value.nombre)
      formData.append('carpeta', this.myForm.value.carpeta)
      formData.append('id', this.myForm.value.id)
      this.uploadService.uploadFile( formData ).then((res) => {
        console.log('RESPUESTA ; ',res)
        this.mostrarfoto = res['data'];
      })
    } else {
      alert('Seleccione Imagen.')
    }
  }

  onFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      this.uploadedFiles = e.target.files[0];
    }
  }


}
