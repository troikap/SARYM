import * as $ from "jquery";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioService } from "src/app/services/usuario/usuario.service";

@Component({
  selector: "app-abm-usuario",
  templateUrl: "./abm-usuario.component.html",
  styleUrls: ["./abm-usuario.component.scss"]
})
export class AbmUsuarioComponent implements OnInit {
  listaUsuarios: any = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllElements();
    this.cargarOnFocus();
  }

  cargarOnFocus() {
    $("#botonBuscar").focus();
  }

  buscarElemento(termino: string) {
    if (termino.trim() !== "") {
      this.usuarioService.getUsuarioByAll(termino).subscribe((data: any) => {
        if (data != null) {
          this.listaUsuarios = data;
        } else {
          this.listaUsuarios = [];
        }
      });
    } else {
      this.getAllElements();
    }
  }

  getAllElements() {
    this.usuarioService.getUsuarios().then((res: any) => {
      this.listaUsuarios = res.Usuario;
    });
  }

  crudElemento(idElemento: number, accion: string) {
    this.router.navigate([`/usuario_crud/${idElemento}/${accion}`]);
  }
}
