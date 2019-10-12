import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalDetalleCatalogoPage } from '../modal/modal-detalle-catalogo/modal-detalle-catalogo.page';
import { ProductoService } from '../services/producto/producto.service';
import { Producto } from '../services/producto/producto.model';
import { MenupromocionService } from '../services/menupromocion/menupromocion.service';
import { MenuPromocion } from '../services/menupromocion/menupromocion.model'


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

  currentModal = null;

  constructor(
    public modalController: ModalController,
    public productoservice: ProductoService,
    public menupromocionservice: MenupromocionService
  ) { }

  ngOnInit() {
    this.traerProductos();
    this.traerMenusPromociones();
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
    this.productoservice.getProductos('nada')
      .then( ( res: any ) => {
        this.productos = res.Producto;
        console.log(this.productos)
      })
      .catch( err => {
        console.log("Error ", err)
      })
    // this.productos = [
    //   {
    //     'titulo': 'Pizza',
    //     'descripcion': 'Pizza Mozzarella a la piedra 8 porciones.',
    //     'costo': 110,
    //     'img': '../../assets/catalogo/productos/pizza.jpg'
    //   },
    //   {
    //     'titulo': 'Hamburguesa',
    //     'descripcion': 'Hamburguesa Simple con lechuga y tomate.',
    //     'costo': 90,
    //     'img': '../../assets/catalogo/productos/hamburguesa.jpg'
    //   },
    //   {
    //     'titulo': 'Empanada',
    //     'descripcion': 'Empanada de carne, cebolla y huevo.',
    //     'costo': 20,
    //     'img': '../../assets/catalogo/productos/empanada.jpg'
    //   },
    //   {
    //     'titulo': 'Taco',
    //     'descripcion': 'Taco de carne con jamon, queso y salsas.',
    //     'costo': 40,
    //     'img': '../../assets/catalogo/productos/taco.jpg'
    //   },
    //   {
    //     'titulo': 'Pancho',
    //     'descripcion': 'Pancho simple con condimentos.',
    //     'costo': 40,
    //     'img': '../../assets/catalogo/productos/pancho.jpg'
    //   },
    //   {
    //     'titulo': 'Papas',
    //     'descripcion': 'Papas fritas medianas.',
    //     'costo': 70,
    //     'img': '../../assets/catalogo/productos/papas.jpg'
    //   }
    // ]
  }
  traerMenusPromociones(){
    this.menupromocionservice.getMenuPromociones('nada')
      .then( ( res: any ) => {
        this.menus = [];
        this.promociones = [];
        console.log("todoo , ",res)
        res.MenuPromocion.filter( element => {
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
  traerPromociones(){
    // this.promociones = [
    //   {
    //     'titulo': 'Promocion 1',
    //     'descripcion': 'Tres tacos de carne con jamon y salsas.',
    //     'costo': 100,
    //     'img': '../../assets/catalogo/promociones/promocion1.jpg'
    //   },
    //   {
    //     'titulo': 'Promocion 2',
    //     'descripcion': 'Dos pizzas Mozzarella con tomate y huevo.',
    //     'costo': 200,
    //     'img': '../../assets/catalogo/promociones/promocion2.jpg'
    //   },
    //   {
    //     'titulo': 'Promocion 3',
    //     'descripcion': 'Dos hamburguesas con papas fritas.',
    //     'costo': 280,
    //     'img': '../../assets/catalogo/promociones/promocion3.jpg'
    //   }
    // ]
  }
  traerMenus(){
    // this.menus = [
    //   {
    //     'titulo': 'Menu 1',
    //     'descripcion': 'Milanesa de pollo con pure de papas.',
    //     'costo': 130,
    //     'img': '../../assets/catalogo/menus/menu1.jpg'
    //   },
    //   {
    //     'titulo': 'Menu 2',
    //     'descripcion': 'Estofado de berengenas, pimientos y lentejas.',
    //     'costo': 180,
    //     'img': '../../assets/catalogo/menus/menu2.jpg'
    //   },
    //   {
    //     'titulo': 'Menu 3',
    //     'descripcion': 'Paella con mariscos y calamares.',
    //     'costo': 200,
    //     'img': '../../assets/catalogo/menus/menu3.jpg'
    //   },
    //   {
    //     'titulo': 'Menu 4',
    //     'descripcion': 'Albondiga con papas.',
    //     'costo': 150,
    //     'img': '../../assets/catalogo/menus/menu4.jpg'
    //   }
    // ]
  }

  loadDefault(event) {
    console.log("AAAAAAAAAA")
    event.target.src = '/assets/imgs/logo-sarym.png';
  }

}

export interface item{
  titulo: string;
  descripcion: string;
  costo: number;
  img: string;
}