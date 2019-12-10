import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RolService } from 'src/app/services/rol/rol.service';
import * as $ from "jquery";

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
        if (data != null) {
          let arrayAFiltrar = [];
      //DESCARTAMOS MOZOS Y CLIENTS PQ NO TIENEN ACCESO AL SISTEMA WEB.
      let arrayFiltrado = [];
      arrayAFiltrar = data;           
      for ( let item of arrayAFiltrar ){
        if ( item.nombreRol != "Cliente" && item.nombreRol != "Mozo" ) {
          arrayFiltrado.push(item);
        }
      }
      this.listaRoles = arrayFiltrado;
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
      let arrayAFiltrar = [];
      //DESCARTAMOS MOZOS Y CLIENTS PQ NO TIENEN ACCESO AL SISTEMA WEB.
      let arrayFiltrado = [];
      arrayAFiltrar = res.data;        
      for ( let item of arrayAFiltrar ){
        if ( item.nombreRol != "Cliente" && item.nombreRol != "Mozo" ) {
          arrayFiltrado.push(item);
        }
      }
      this.listaRoles = arrayFiltrado;
    });
  }

  crudElemento(idElemento: number, accion: string) {
    this.router.navigate([`/rol_crud/${idElemento}/${accion}`]);
  }
}