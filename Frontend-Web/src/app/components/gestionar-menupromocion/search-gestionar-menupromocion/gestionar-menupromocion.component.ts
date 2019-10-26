import * as $ from 'jquery'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuPromocionService } from 'src/app/services/menu-promocion/menu-promocion.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gestionar-menupromocion',
  templateUrl: './gestionar-menupromocion.component.html',
  styleUrls: ['./gestionar-menupromocion.component.scss']
})
export class GestionarMenupromocionComponent implements OnInit {

  listaMenuPromocion: any [] = [];

  private tipoElementoProducto = "producto";
  private tipoElementoMenuPromocion = "menupromocion";

  public rutaImagenProducto = `${environment.urlNgrok || environment.url}/traerImagen/${this.tipoElementoProducto}/`;
  public rutaImagenMenuPromocion = `${environment.urlNgrok || environment.url}/traerImagen/${this.tipoElementoMenuPromocion}/`;

  constructor(
    public menuPromocionService: MenuPromocionService,
    private router: Router
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
      this.menuPromocionService.getMenuPromocionByAll(termino)
      .subscribe((data: any) => { // Llamo a un Observer
        console.log(data);
        if (data != null) {
          console.log("RESULT ----------------->", data);
          this.listaMenuPromocion = data;

          // this.listaMenuPromocion.push(data); // Para insertar un solo elemento
        }
        else {
          this.listaMenuPromocion = [];
        }
      });
    }
    else {
      this.getAllElements();
    }
  }

  getAllElements() {
    this.menuPromocionService.getAllMenuPromocion()
      .then((res: any) => {
        console.log("getAllElements(): ", res.data);
        this.listaMenuPromocion =  res.data;
      })
  }

  consultarElemento(idElemento: number) {
    console.log("idElemento: ", idElemento);

    this.router.navigate( [`/menupromocion_consulta/${idElemento}`] );
  }

  crearMenuPromocion() {
    this.router.navigate( ['/menupromocion_crud/0/crear']);
  }

}
