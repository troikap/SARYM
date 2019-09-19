import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { item } from '../../catalogo/catalogo.page';


@Component({
  selector: 'app-modal-detalle-catalogo',
  templateUrl: './modal-detalle-catalogo.page.html',
  styleUrls: ['./modal-detalle-catalogo.page.scss'],
})
export class ModalDetalleCatalogoPage implements OnInit {

  itemTraido: item;
  composicion: { };

  // Data passed in by componentProps
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    ) {
    // componentProps can also be accessed at construction time using NavParams
    console.log(navParams.get('firstName') )
    console.log(navParams.get('item') )
    this.itemTraido = navParams.get('item');
    this.traerComposicion();
  }

  ngOnInit() {
  }

  dismissModal(){
    this.modalController.dismiss();
  }
  
 traerComposicion() {
  this.composicion = {
    'item': this.itemTraido,
    'componentes': [
      {
        'titulo': 'Pizza',
        'descripcion': 'Pizza Mozzarella a la piedra 8 porciones.',
        'costo': 110,
        'img': '../../assets/catalogo/productos/pizza.jpg',
        'unidad': 'gr',
        'medida': 300,
        'estado': 'Activo'
      },
      {
        'titulo': 'Hamburguesa',
        'descripcion': 'Hamburguesa Simple con lechuga y tomate.',
        'costo': 90,
        'img': '../../assets/catalogo/productos/hamburguesa.jpg',
        'unidad': 'cm',
        'medida': 200,
        'estado': 'En Falta'
      },
      {
        'titulo': 'Empanada',
        'descripcion': 'Empanada de carne, cebolla y huevo.',
        'costo': 20,
        'img': '../../assets/catalogo/productos/empanada.jpg',
        'unidad': 'gr',
        'medida': 50,
        'estado': 'Activo'
      },
      {
        'titulo': 'Taco',
        'descripcion': 'Taco de carne con jamon, queso y salsas.',
        'costo': 40,
        'img': '../../assets/catalogo/productos/taco.jpg',
        'unidad': 'ml',
        'medida': 260,
        'estado': 'Activo'
      },
      {
        'titulo': 'Pancho',
        'descripcion': 'Pancho simple con condimentos.',
        'costo': 40,
        'img': '../../assets/catalogo/productos/pancho.jpg',
        'unidad': 'gr',
        'medida': 300,
        'estado': 'En Falta'
      },
      {
        'titulo': 'Papas',
        'descripcion': 'Papas fritas medianas.',
        'costo': 70,
        'img': '../../assets/catalogo/productos/papas.jpg',
        'unidad': 'lt',
        'medida': 1.2,
        'estado': 'Inactivo'
      }
    ]
  }
 }
}
