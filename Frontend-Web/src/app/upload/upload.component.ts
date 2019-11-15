import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { UploadService } from "src/app/services/upload/upload.service";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {
  private myForm: FormGroup;
  public uploadedFiles;
  public nombreArchivo;
  public carpetas = [
    { key: "producto", value: "producto" },
    { key: "menu", value: "menu" },
    { key: "promocion", value: "promocion" }
  ];

  public idElemento;
  public nombreElemento;
  public pathElemento;
  public archivoCargado;
  public redirigir;

  constructor(
    private activatedRoute: ActivatedRoute,
    public uploadService: UploadService,
    private router: Router
  ) {
    this.myForm = new FormGroup({
      archivo: new FormControl("", Validators.required)
    });
    this.activatedRoute.params.subscribe(params => {
      this.idElemento = params.id;
      this.nombreElemento = params.nombre;
      this.pathElemento = params.path;
      this.redirigir = params.retorno;
    });
  }
  ngOnInit() {}

  onUpload() {
    if (this.uploadedFiles != null) {
      const foto = this.uploadedFiles;
      const formData = new FormData();
      formData.append("archivo", foto);
      formData.append("nombre", this.nombreElemento);
      formData.append("carpeta", this.pathElemento);
      formData.append("id", this.idElemento);
      this.uploadService.uploadFile(formData).then((res: any) => {
        this.nombreArchivo = res.path;
        this.archivoCargado = this.uploadService.getFile(
          this.pathElemento,
          this.nombreArchivo
        );
        ($ as any).confirm({
          title: "Éxito",
          content: "Su imagen ha sido cargada con éxito",
          type: "green",
          typeAnimated: true,
          theme: "material",
          buttons: {
            aceptar: {
              text: "Aceptar",
              btnClass: "btn-green",
              action: function() {}
            }
          }
        });
      });
    } else {
      ($ as any).confirm({
        title: "Error",
        content: "Seleccione imagen..",
        type: "red",
        typeAnimated: true,
        theme: "material",
        buttons: {
          aceptar: {
            text: "Aceptar",
            btnClass: "btn-red",
            action: function() {}
          }
        }
      });
    }
  }

  cerrar() {
    this.router.navigate([`/${this.redirigir}`]);
  }

  onFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      this.uploadedFiles = e.target.files[0];
    }
  }
}
