import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backup-module',
  templateUrl: './backup-module.component.html',
  styleUrls: ['./backup-module.component.scss']
})
export class BackupModuleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  generarBackup() {
    console.log("Generar Backup");
  }

  getBackup() {
    console.log("Recuperar datos desde Backup");
  }

}
