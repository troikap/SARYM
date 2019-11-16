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
    
    this.backupGenerado = false;

    this.backupService.generarBackup().then((res: any) => {
        
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
              this.backupGenerado = true;
            }
          }
        }
      });
    });
  }

  cargarBackup() {
    console.log("cargarBackup");

    if (this.uploadedFiles != null) {

      this.backupCargado = false;

      const archivo = this.uploadedFiles;
      const formData = new FormData();
      formData.append("archivo", archivo);
      this.backupService.cargarBackup(formData).then((res: any) => {
        
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
                this.backupCargado = true;
              }
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

  onFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      this.uploadedFiles = e.target.files[0];
    }
  }

}
