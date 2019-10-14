import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Component({
  selector: 'app-abm-usuario',
  templateUrl: './abm-usuario.component.html',
  styleUrls: ['./abm-usuario.component.scss']
})
export class AbmUsuarioComponent implements OnInit {

  listaUsuarios: any = [];

  constructor(
    // private unidadMedia: UnidadMedida, //Da error
    private usuarioService :UsuarioService,
    private router: Router,

  ) { }  
  

  ngOnInit() {
    this.getAllElements();
    this.cargarOnFocus();
  }

  cargarOnFocus() {
    $("#botonBuscar").focus();
  }

  buscarElemento(termino: string) {
    
    console.log(termino);

    if (termino.trim() !== "") {
      this.usuarioService.getUsuarioByAll(termino)
      .subscribe((data: any) => { // Llamo a un Observer
        console.log(data);
        if (data != null) {
          console.log("RESULT ----------------->", data);
          this.listaUsuarios = data;

          // this.listaUnidadMedida.push(data); // Para insertar un solo elemento
        }
      });
    }
    else {
      this.getAllElements();
    }
  }

  getAllElements() {
    this.usuarioService.getUsuarios()
      .then((res: any) => {
        console.log("TRAIGO: ", res.Usuario);
        this.listaUsuarios =  res.Usuario;
      })

  }

  crudElemento(idElemento: number, accion: string) {
    console.log("idElemento: ", idElemento);
    console.log("accion: ", accion);

    this.router.navigate( [`/usuario_crud/${idElemento}/${accion}`] );
  }

}