import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { item } from '../../catalogo/catalogo.page';
import { Producto } from '../../services/producto/producto.model';
import { MenuPromocion } from '../../services/menupromocion/menupromocion.model'
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-modal-detalle-catalogo',
  templateUrl: './modal-detalle-catalogo.page.html',
  styleUrls: ['./modal-detalle-catalogo.page.scss'],
})
export class ModalDetalleCatalogoPage implements OnInit {

  producto: Producto;
  menupromocion: MenuPromocion;
  composicion: { };
  altSrc="../../assets/imgs/logo-sarym.png";
  tipoElemento = "producto";
  tipoElemento2 = "menupromocion";

  rutaImagenProducto = `${environment.urlNgrok || environment.url}/traerImagen/${this.tipoElemento}/`;
  rutaImagenMenuPromocion = `${environment.urlNgrok || environment.url}/traerImagen/${this.tipoElemento2}/`;


  // Data passed in by componentProps
  @Input() tipo: string;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    ) {
    // componentProps can also be accessed at construction time using NavParams
    this.tipo = navParams.get('tipo');
    console.log("TIPO", this.tipo)
    if ( this.tipo == "producto") {
      this.producto = navParams.get('item');
      console.log("PRODUCTO ,",  this.producto)
    } else {
      this.menupromocion = navParams.get('item');
      console.log("MENUPROMOCION ,",  this.menupromocion)
    }
    // this.traerComposicion();
  }

  ngOnInit() {
  }

  dismissModal(){
    this.modalController.dismiss();
  }
  
//  traerComposicion() {
//   this.composicion = {
//     'item': this.itemTraido,
//     'componentes': [
//       {
//         'titulo': 'Pizza',
//         'descripcion': 'Pizza Mozzarella a la piedra 8 porciones.',
//         'costo': 110,
//         'img': '../../assets/catalogo/productos/pizza.jpg',
//         'unidad': 'gr',
//         'medida': 300,
//         'estado': 'Activo'
//       },
//       {
//         'titulo': 'Hamburguesa',
//         'descripcion': 'Hamburguesa Simple con lechuga y tomate.',
//         'costo': 90,
//         'img': '../../assets/catalogo/productos/hamburguesa.jpg',
//         'unidad': 'cm',
//         'medida': 200,
//         'estado': 'En Falta'
//       },
//       {
//         'titulo': 'Empanada',
//         'descripcion': 'Empanada de carne, cebolla y huevo.',
//         'costo': 20,
//         'img': '../../assets/catalogo/productos/empanada.jpg',
//         'unidad': 'gr',
//         'medida': 50,
//         'estado': 'Activo'
//       },
//       {
//         'titulo': 'Taco',
//         'descripcion': 'Taco de carne con jamon, queso y salsas.',
//         'costo': 40,
//         'img': '../../assets/catalogo/productos/taco.jpg',
//         'unidad': 'ml',
//         'medida': 260,
//         'estado': 'Activo'
//       },
//       {
//         'titulo': 'Pancho',
//         'descripcion': 'Pancho simple con condimentos.',
//         'costo': 40,
//         'img': '../../assets/catalogo/productos/pancho.jpg',
//         'unidad': 'gr',
//         'medida': 300,
//         'estado': 'En Falta'
//       },
//       {
//         'titulo': 'Papas',
//         'descripcion': 'Papas fritas medianas.',
//         'costo': 70,
//         'img': '../../assets/catalogo/productos/papas.jpg',
//         'unidad': 'lt',
//         'medida': 1.2,
//         'estado': 'Inactivo'
//       }
//     ]
//   }
//  }
}
