import * as $ from "jquery";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RolService } from 'src/app/services/rol/rol.service';

@Component({
  selector: 'app-search-rol',
  templateUrl: './search-rol.component.html',
  styleUrls: ['./search-rol.component.scss']
})
export class SearchRolComponent implements OnInit {
  listaRoles: any = [];

  constructor(
    private rolService: RolService, private router: Router
  )
  { }

  ngOnInit() {
    this.getAllElements();
    this.cargarOnFocus();
  }

  cargarOnFocus() {
    $("#botonBuscar").focus();
  }

  buscarElemento(termino: string) {
    if (termino.trim() !== "") {
      this.rolService.getRolByAll(termino).subscribe((data: any) => {
        // Llamo a un Observer
        if (data != null) {
          this.listaRoles = data;
        } else {
          this.listaRoles = [];
        }
      });
    } else {
      this.getAllElements();
    }
  }

  getAllElements() {
    this.rolService.getRoles().then((res: any) => {
      console.log("getAllElements", res);
      this.listaRoles = res.data;
    });
  }

  crudElemento(idElemento: number, accion: string) {
    this.router.navigate([`/rol_crud/${idElemento}/${accion}`]);
  }

}