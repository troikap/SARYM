import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'logueo', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'logueo', loadChildren: './logueo/logueo.module#LogueoPageModule' },
  { path: 'registro-usuario', loadChildren: './registro-usuario/registro-usuario.module#RegistroUsuarioPageModule' },
  { path: 'registro-usuario/:id', loadChildren: './registro-usuario/registro-usuario.module#RegistroUsuarioPageModule' },
  { path: 'configuracion', loadChildren: './pages/setting/setting.module#SettingPageModule' },
  { path: 'recuperar-contrasenia/:token', loadChildren: './pages/recuperar-contrasenia/recuperar-contrasenia.module#RecuperarContraseniaPageModule' },

 
// mozo
  { path: 'consultar-salon', loadChildren: './pages/mozo/consultar-salon/consultar-salon.module#ConsultarSalonPageModule' },
  { path: 'pedidos-a-enviar', loadChildren: './pages/mozo/pedidos-a-enviar/pedidos-a-enviar.module#PedidosAEnviarPageModule' },
  { path: 'mostrar-mesas', loadChildren: './pages/mozo/generar-estadia/mostrar-mesas/mostrar-mesas.module#MostrarMesasPageModule' },
  { path: 'confirmar-reserva', loadChildren: './pages/mozo/confirmar-reserva/confirmar-reserva.module#ConfirmarReservaPageModule' },
  { path: 'crud-generar-estadia/:id/:accion/:tipo', loadChildren: './pages/mozo/crud-generar-estadia/crud-generar-estadia.module#CrudGenerarEstadiaPageModule' },
  { path: 'confirmar-pago/estadia/:idEstadia/pago/:idPago', loadChildren: './pages/gestionar-estadia/pago/confirmar-pago/confirmar-pago.module#ConfirmarPagoPageModule' },

// invitado
  { path: 'home-invitado', loadChildren: './pages/invitado/home-invitado/home-invitado.module#HomeInvitadoPageModule' },

// catalogo
  { path: 'catalogo', loadChildren: './catalogo/catalogo.module#CatalogoPageModule' },
  { path: 'modal-detalle-catalogo', loadChildren: './modal/modal-detalle-catalogo/modal-detalle-catalogo.module#ModalDetalleCatalogoPageModule' },
 
 // reserva
  { path: 'search-gestionar-reserva', loadChildren: './pages/gestionar-reserva/search-gestionar-reserva/search-gestionar-reserva.module#SearchGestionarReservaPageModule' },
  { path: 'crud-gestionar-reserva/:id/:accion', loadChildren: './pages/gestionar-reserva/crud-gestionar-reserva/crud-gestionar-reserva.module#CrudGestionarReservaPageModule' },
  { path: 'consulta-gestionar-reserva/:id', loadChildren: './pages/gestionar-reserva/consulta-gestionar-reserva/consulta-gestionar-reserva.module#ConsultaGestionarReservaPageModule' },
  { path: 'ver-qr-reserva/:id', loadChildren: './pages/gestionar-reserva/ver-qr-reserva/ver-qr-reserva.module#VerQRReservaPageModule' },
  
  { path: 'lista-pedido/reserva/:idReserva/comensal/:idComensal', loadChildren: './pages/gestionar-reserva/lista-pedido/lista-pedido.module#ListaPedidoPageModule' },
  { path: 'seleccion-comensal/reserva/:idReserva/:from', loadChildren: './pages/gestionar-reserva/seleccion-comensal/seleccion-comensal.module#SeleccionComensalPageModule' },
  { path: 'seleccion-pedido/reserva/:idReserva/comensal/:idComensal', loadChildren: './pages/gestionar-reserva/seleccion-pedido/seleccion-pedido.module#SeleccionPedidoPageModule' },

// estadia
  { path: 'search-gestionar-estadia', loadChildren: './pages/gestionar-estadia/search-gestionar-estadia/search-gestionar-estadia.module#SearchGestionarEstadiaPageModule' },
  { path: 'consulta-gestionar-estadia/:id', loadChildren: './pages/gestionar-estadia/consulta-gestionar-estadia/consulta-gestionar-estadia.module#ConsultaGestionarEstadiaPageModule' },
  { path: 'consultar-salon', loadChildren: './pages/mozo/consultar-salon/consultar-salon.module#ConsultarSalonPageModule' },
  { path: 'home-invitado', loadChildren: './pages/invitado/home-invitado/home-invitado.module#HomeInvitadoPageModule' },
  { path: 'pedido-catalogo/comensal/:idComensal/pedido/:idPedido', loadChildren: './pages/gestionar-reserva/pedido-catalogo/pedido-catalogo.module#PedidoCatalogoPageModule' },
  { path: 'seleccion-comensal/estadia/:idEstadia/:from', loadChildren: './pages/gestionar-estadia/seleccion-comensal/seleccion-comensal.module#SeleccionComensalPageModule' },
  { path: 'lista-pedido/estadia/:idEstadia/comensal/:idComensal', loadChildren: './pages/gestionar-estadia/lista-pedido/lista-pedido.module#ListaPedidoPageModule' },
  
  { path: 'lista-pago/:idEstadia', loadChildren: './pages/gestionar-estadia/pago/lista-pago/lista-pago.module#ListaPagoPageModule' },
  { path: 'lista-pedido-pago/estadia/:idEstadia/comensal/:idComensal', loadChildren: './pages/gestionar-estadia/pago/lista-pedido-pago/lista-pedido-pago.module#ListaPedidoPagoPageModule' },
  { path: 'seleccion-comensal-pago/:idEstadia', loadChildren: './pages/gestionar-estadia/pago/seleccion-comensal-pago/seleccion-comensal-pago.module#SeleccionComensalPagoPageModule' },

// unirse reserva estadia
  { path: 'unirse-reserva-estadia', loadChildren: './pages/unirse-reserva-estadia/unirse-reserva-estadia.module#UnirseReservaEstadiaPageModule' },
  { path: 'ver-qr-estadia/:id', loadChildren: './pages/gestionar-estadia/ver-qr-estadia/ver-qr-estadia.module#VerQrEstadiaPageModule' },
  { path: 'activar-usuario/:token', loadChildren: './pages/activar-usuario/activar-usuario.module#ActivarUsuarioPageModule' },
  { path: 'confirmar-pago-efectivo', loadChildren: './pages/mozo/confirmar-pago-efectivo/confirmar-pago-efectivo.module#ConfirmarPagoEfectivoPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
