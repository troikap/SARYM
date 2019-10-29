import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalDetalleCatalogoPage } from '../modal/modal-detalle-catalogo/modal-detalle-catalogo.page';
import { ProductoService } from '../services/producto/producto.service';
import { Producto } from '../services/producto/producto.model';
import { MenupromocionService } from '../services/menupromocion/menupromocion.service';
import { MenuPromocion } from '../services/menupromocion/menupromocion.model';
import { StorageService, Log } from '../services/storage/storage.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  producto: Producto;
  productos: Producto[]
  menu: MenuPromocion;
  menus: MenuPromocion[];
  promocion: MenuPromocion;
  promociones: MenuPromocion[];
  seleccion: string = "productos";
  altSrc="../../assets/imgs/logo-sarym.png";
  token: string;

  tipoElemento = "producto";
  tipoElemento2 = "menupromocion";

  rutaImagenProducto = `${environment.urlNgrok || environment.url}/traerImagen/${this.tipoElemento}/`;
  rutaImagenMenuPromocion = `${environment.urlNgrok || environment.url}/traerImagen/${this.tipoElemento2}/`;
  
  currentModal = null;

  constructor(
    public modalController: ModalController,
    public productoservice: ProductoService,
    public menupromocionservice: MenupromocionService,
    private storage: StorageService,
  ) { 
    this.getToken();
  }

  ngOnInit() {
    
  }

  seleccionTipo( tipo: string ){
    if (tipo == 'productos'){
      this.seleccion = 'productos';
    }
    if (tipo == 'promociones'){
      this.seleccion = 'promociones';
    }
    if (tipo == 'menus'){
      this.seleccion = 'menus';
    }
  }

  async presentModal( item: item, tipo: string ) {
    const modal = await this.modalController.create({
      component: ModalDetalleCatalogoPage,
      componentProps: {
        'tipo': tipo,
         item
      }
    });
    await modal.present();
    this.currentModal = modal;
    const { data } = await modal.onDidDismiss();
    console.log("DEVOLVIO ALGO EL MODAL")
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  dismissModal() {
    if (this.currentModal) {
      this.currentModal.dismiss().then(() => { this.currentModal = null; });
    }
  }

  traerProductos(){
    this.productoservice.getProductos(this.token)
      .then( ( res: any ) => {
        console.log("prod ,",res)
        this.productos = res.data;
        console.log(this.productos)
      })
      .catch( err => {
        console.log("Error ", err)
      })
  }
  traerMenusPromociones(){
    this.menupromocionservice.getMenuPromociones(this.token)
      .then( ( res: any ) => {
        this.menus = [];
        this.promociones = [];
        res.data.filter( element => {
          if ( element.tipomenupromocion.nombreTipoMenuPromocion == 'Menu') {
            this.menus.push(element);
          }
          if ( element.tipomenupromocion.nombreTipoMenuPromocion == 'Promocion') {
            this.promociones.push(element);
          }
        })
        console.log(this.promociones)
      })
      .catch( err => {
        console.log("Error ", err)
      })
    }
  
  loadDefault(event) {
    event.target.src = '/assets/imgs/logo-sarym.png';
  }

  async getToken() {
    await this.storage.getOneObject('token')
      .then( resp => {
          this.token = resp;
          this.traerProductos();
          this.traerMenusPromociones();
      })
  }
}

export interface item{
  titulo: string;
  descripcion: string;
  costo: number;
  img: string;
}