import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackupService } from 'src/app/services/backup/backup.service';

@Component({
  selector: 'app-backup-module',
  templateUrl: './backup-module.component.html',
  styleUrls: ['./backup-module.component.scss']
})
export class BackupModuleComponent implements OnInit {
  public uploadedFiles = null;
  public backupGenerado = true;
  public backupCargado = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    public backupService: BackupService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  generarBackup() {
    console.log("Generar Backup");
    let _this = this;
    ($ as any).confirm({
      title: "Confirmar",
      content: "¿Confirma la generación del archivo de Backup?",
      type: 'blue',
      typeAnimated: true,
      theme: 'material',
      buttons: {
          aceptar: {
              text: 'Aceptar',
              btnClass: 'btn-blue',
              action: function(){
                _this.backupGenerado = false;
                _this.backupService.generarBackup().then((res: any) => {
                  console.log("res: ", res);
                  ($ as any).confirm({
                    title: "Éxito",
                    content: "Su archivo de Backup ha sido generado con éxito",
                    type: "green",
                    typeAnimated: true,
                    theme: "material",
                    buttons: {
                      aceptar: {
                        text: "Aceptar",
                        btnClass: "btn-green",
                        action: function() {
                          _this.backupGenerado = true;
                        }
                      }
                    }
                  });
                });
              }
          },
          cerrar: {
            text: 'Cerrar',
            action: function(){}
        }
      }
    });
  }

  cargarBackup() {
    console.log("cargarBackup");
    let _this = this;
    
    ($ as any).confirm({
      title: "Atención",
      content: "¿Desea cargar un archivo de Backup?<br>Si continúa se reemplazarán todos los datos del sistema a la fecha y hora del archivo de Backup cargado.",
      type: 'orange',
      typeAnimated: true,
      theme: 'material',
      buttons: {
          aceptar: {
              text: 'Aceptar',
              btnClass: 'btn-orange',
              action: function(){
                if (_this.uploadedFiles != null) {
                  _this.backupCargado = false;
                  const archivo = _this.uploadedFiles;
                  const formData = new FormData();
                  formData.append("archivo", archivo);
                  _this.backupService.cargarBackup(formData).then((res: any) => {
                    console.log("res: ", res);
                    ($ as any).confirm({
                      title: "Éxito",
                      content: "Su archivo de Backup ha sido cargada con éxito",
                      type: "green",
                      typeAnimated: true,
                      theme: "material",
                      buttons: {
                        aceptar: {
                          text: "Aceptar",
                          btnClass: "btn-green",
                          action: function() {
                            _this.backupCargado = true;
                          }
                        }
                      }
                    });
                  });
                } else {
                  ($ as any).confirm({
                    title: "Error",
                    content: "No ha seleccionado un archivo de Backup. Seleccione un archivo de Backup antes de continuar",
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
          },
          cerrar: {
            text: 'Cerrar',
            action: function(){}
        }
      }
    }); 
  }

  onFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      this.uploadedFiles = e.target.files[0];
    }
  }

}
