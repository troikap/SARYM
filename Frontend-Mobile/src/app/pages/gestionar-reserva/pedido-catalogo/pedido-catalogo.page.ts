  import { Component, OnInit } from '@angular/core';
  import { ModalController, AlertController } from '@ionic/angular';
  import { ModalDetalleCatalogoPage } from '../../../modal/modal-detalle-catalogo/modal-detalle-catalogo.page';
  import { ProductoService } from '../../../services/producto/producto.service';
  import { Producto } from '../../../services/producto/producto.model';
  import { MenupromocionService } from '../../../services/menupromocion/menupromocion.service';
  import { MenuPromocion } from '../../../services/menupromocion/menupromocion.model';
  import { StorageService, Log } from '../../../services/storage/storage.service';
  import { environment } from '../../../../environments/environment';
  import { ActivatedRoute } from '@angular/router';
  import { PedidoService } from '../../../services/pedido/pedido.service';
  import { ToastService } from '../../../providers/toast.service';

@Component({
  selector: 'app-pedido-catalogo',
  templateUrl: './pedido-catalogo.page.html',
  styleUrls: ['./pedido-catalogo.page.scss'],
})
export class PedidoCatalogoPage implements OnInit {

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

    idPedido;
    idComensal;

  
    constructor(
      public modalController: ModalController,
      public productoservice: ProductoService,
      public menupromocionservice: MenupromocionService,
      private storage: StorageService,
      private alertController: AlertController,
      public activatedRoute: ActivatedRoute,
      public pedidoService: PedidoService,
      private toastService: ToastService,
    ) { 
      this.traerProductos();
      this.traerMenusPromociones();
    }
  
    ngOnInit() {
      this.activatedRoute.params
      .subscribe(params => {
        console.log("PARAMETROS ", params)
        this.idPedido = params.idPedido;
        this.idComensal = params.idComensal;
      })
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
      this.productoservice.getProductos()
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
      this.menupromocionservice.getMenuPromociones()
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

    seleccionaProducto(item) {
      this.Confirm(`Agregar Producto`, `Desea agregar el Producto ${item.nombreProducto} al pedido N° ${this.idPedido}? Por favor Ingrese cantidad.`, item)
    }

    seleccionaMenuPromocion(item) {
      let tipo;
      if (item.tipomenupromocion.nombreTipoMenuPromocion == "Menu") {
        tipo = "Menu";
      } else {
        tipo = "Promocion"
      }
      this.Confirm(`Agregar ${tipo}`, `Desea agregar ${tipo} ${item.nombreMenuPromocion} al pedido N° ${this.idPedido}? Por favor Ingrese cantidad.`, item)
    }

    async Confirm(pTitulo: string, pMensaje: string, data) {
      const alert = await this.alertController.create({
        header: pTitulo,
        message: pMensaje,
        inputs: [
          {
            name: 'cantidad',
            type: 'number',
            placeholder: 'Ingrese Cantidad',
            min: 15
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Cancelado');
            }
          }, {
            text: 'Aceptar',
            handler: ( info ) => {
              if (info.cantidad > 0) {
                let tipo;
                let nombre;
                if (data.idProducto) {
                  tipo = 'idProducto';
                  nombre = 'Producto';
                } else {
                  tipo = 'idMenuPromocion';
                  nombre = data.tipomenupromocion.nombreTipoMenuPromocion
                }
                let pathDetalle = { idPedido: this.idPedido, detalle: [ {[tipo]: data[tipo], cantidadPedidoProducto: info.cantidad} ]}
                this.pedidoService.setDetallePedidoProducto( pathDetalle )
                .then( res => {
                  if ( res.tipo == 1){
                    this.toastService.toastSuccess(`Detalle creado!. ${nombre} agregado a su Pedido.`, 2000)
                  } else {
                    this.toastService.toastWarning(`Detalle no se pudo crear`, 2500)
                  }
                })
              } else {
                this.toastService.toastError('La cantidad ingresada es incorrecta! Debe ser positiva.', 2000)
              }
            }
          }
        ]
      });
      await alert.present();
    }
  }
  
  export interface item{
    titulo: string;
    descripcion: string;
    costo: number;
    img: string;
  }