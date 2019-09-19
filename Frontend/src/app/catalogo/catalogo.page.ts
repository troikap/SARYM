import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalDetalleCatalogoPage } from '../modal/modal-detalle-catalogo/modal-detalle-catalogo.page';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  producto: item;
  productos: item[]
  menu: item;
  menus: item[];
  promocion: item;
  promociones: item[];
  seleccion: string = "productos";

  currentModal = null;

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.traerProductos();
    this.traerPromociones();
    this.traerMenus();

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

  async presentModal( item: item ) {
    const modal = await this.modalController.create({
      component: ModalDetalleCatalogoPage,
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N',
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
    this.productos = [
      {
        'titulo': 'Pizza',
        'descripcion': 'Pizza Mozzarella a la piedra 8 porciones.',
        'costo': 110,
        'img': '../../assets/catalogo/productos/pizza.jpg'
      },
      {
        'titulo': 'Hamburguesa',
        'descripcion': 'Hamburguesa Simple con lechuga y tomate.',
        'costo': 90,
        'img': '../../assets/catalogo/productos/hamburguesa.jpg'
      },
      {
        'titulo': 'Empanada',
        'descripcion': 'Empanada de carne, cebolla y huevo.',
        'costo': 20,
        'img': '../../assets/catalogo/productos/empanada.jpg'
      },
      {
        'titulo': 'Taco',
        'descripcion': 'Taco de carne con jamon, queso y salsas.',
        'costo': 40,
        'img': '../../assets/catalogo/productos/taco.jpg'
      },
      {
        'titulo': 'Pancho',
        'descripcion': 'Pancho simple con condimentos.',
        'costo': 40,
        'img': '../../assets/catalogo/productos/pancho.jpg'
      },
      {
        'titulo': 'Papas',
        'descripcion': 'Papas fritas medianas.',
        'costo': 70,
        'img': '../../assets/catalogo/productos/papas.jpg'
      }
    ]
  }
  traerPromociones(){
    this.promociones = [
      {
        'titulo': 'Promocion 1',
        'descripcion': 'Tres tacos de carne con jamon y salsas.',
        'costo': 100,
        'img': '../../assets/catalogo/promociones/promocion1.jpg'
      },
      {
        'titulo': 'Promocion 2',
        'descripcion': 'Dos pizzas Mozzarella con tomate y huevo.',
        'costo': 200,
        'img': '../../assets/catalogo/promociones/promocion2.jpg'
      },
      {
        'titulo': 'Promocion 3',
        'descripcion': 'Dos hamburguesas con papas fritas.',
        'costo': 280,
        'img': '../../assets/catalogo/promociones/promocion3.jpg'
      }
    ]
  }
  traerMenus(){
    this.menus = [
      {
        'titulo': 'Menu 1',
        'descripcion': 'Milanesa de pollo con pure de papas.',
        'costo': 130,
        'img': '../../assets/catalogo/menus/menu1.jpg'
      },
      {
        'titulo': 'Menu 2',
        'descripcion': 'Estofado de berengenas, pimientos y lentejas.',
        'costo': 180,
        'img': '../../assets/catalogo/menus/menu2.jpg'
      },
      {
        'titulo': 'Menu 3',
        'descripcion': 'Paella con mariscos y calamares.',
        'costo': 200,
        'img': '../../assets/catalogo/menus/menu3.jpg'
      },
      {
        'titulo': 'Menu 4',
        'descripcion': 'Albondiga con papas.',
        'costo': 150,
        'img': '../../assets/catalogo/menus/menu4.jpg'
      }
    ]
  }

}

export interface item{
  titulo: string;
  descripcion: string;
  costo: number;
  img: string;
}