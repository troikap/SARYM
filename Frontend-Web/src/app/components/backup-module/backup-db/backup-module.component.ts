import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackupService } from 'src/app/services/backup/backup.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-backup-module',
  templateUrl: './backup-module.component.html',
  styleUrls: ['./backup-module.component.scss']
})
export class BackupModuleComponent implements OnInit {
  public uploadedFiles = null;
  public backupGenerado = true;
  public backupCargado = true;

  info = `Usted podrá generar un Backup de toda la Base de Datos del Sistema.<br>Además, recuperar dicho Backup desde un archivo previamente generado.`
  accion = "Presione el siguiente botón para generar un archivo de Backup de la <strong>Base de Datos</strong> del Sistema. El mismo puede demorar unos minutos en ser generado."
  info2 = "Presione el siguiente botón para restaurar una imagen de Backup de <strong>Base de Datos</strong> del Sistema, previamente generada. La misma puede demorar unos minutos en ser cargada."
  precacucion = `<strong>¡Precaución!</strong><br>La siguiente acción reemplazará los datos actuales del Sistema. Tenga en
  cuenta que la carga de un archivo de Backup recuperará los datos del Sistema a la fecha y hora en que se
  generó dicho archivo. Se reemplazará el archivo actual.`

  private fechaActual;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    public backupService: BackupService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.fechaActual = this.datePipe.transform(new Date(),"dd-MM-yyyy");
  }

  generarBackup() {
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
          action: function () {
            _this.backupGenerado = false;
            setTimeout(() => {
              _this.backupGenerado = true;
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
                    action: function () {
                    }
                  }
                }
              });
            }, 5000);
          }
        },
        cerrar: {
          text: 'Cerrar',
          action: function () { }
        }
      }
    });
  }

  cargarBackup() {
    let _this = this;
    ($ as any).confirm({
      title: "Atención",
      content: "¿Desea cargar un archivo de Backup?<br>Si continúa se reemplazarán todos los datos del sistema a la fecha y hora del archivo de Backup cargado",
      type: 'orange',
      typeAnimated: true,
      theme: 'material',
      buttons: {
        aceptar: {
          text: 'Aceptar',
          btnClass: 'btn-orange',
          action: function () {
            if (_this.uploadedFiles != null) {
              _this.backupCargado = false;
              const archivo = _this.uploadedFiles;
              const formData = new FormData();
              formData.append("archivo", archivo);
              setTimeout(() => {
                _this.backupGenerado = true;
                ($ as any).confirm({
                  title: "Éxito",
                  content: "Su archivo de Backup ha sido cargado con éxito",
                  type: "green",
                  typeAnimated: true,
                  theme: "material",
                  buttons: {
                    aceptar: {
                      text: "Aceptar",
                      btnClass: "btn-green",
                      action: function () {
                        _this.backupCargado = true;
                      }
                    }
                  }
                });
              }, 5000);
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
                    action: function () { }
                  }
                }
              });
            }
          }
        },
        cerrar: {
          text: 'Cerrar',
          action: function () { }
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