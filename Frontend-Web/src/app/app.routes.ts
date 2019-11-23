import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RoleGuardService } from '../app/services/role-guard.service';

//IMPORTS PARA ROL ADMINISTRADOR
import { AbmUsuarioComponent } from './components/abm-usuario/search-usuario/abm-usuario.component';
import { CrudUsuarioComponent } from './components/abm-usuario/crud-usuario/crud-usuario.component';
import { AbmUnidadmedidaComponent } from './components/abm-unidadmedida/search-unidadmedida/abm-unidadmedida.component';
import { AbmUnidadmedidaCreateComponent } from './components/abm-unidadmedida/crud-unidadmedida/abm-unidadmedida-crud.component';
import { AbmCajaComponent } from './components/abm-caja/search-caja/abm-caja.component';
import { EditCajaComponent } from './components/abm-caja/edit-caja/edit-caja.component';
import { CrudMesaComponent } from './components/abm-mesa/crud-mesa/crud-mesa.component';
import { AbmMesaComponent } from './components/abm-mesa/search-mesa/abm-mesa.component';
import { AbmRubroComponent } from './components/abm-rubro/search-rubro/abm-rubro.component';
import { CrudRubroComponent } from './components/abm-rubro/crud-rubro/crud-rubro.component';
import { AbmSectorComponent } from './components/abm-sector/search-sector/abm-sector.component';
import { CrudSectorComponent } from './components/abm-sector/crud-sector/crud-sector.component';
import { AbmTipomonedaComponent } from './components/abm-tipomoneda/search-tipomoneda/abm-tipomoneda.component';
import { CrudTipomonedaComponent } from './components/abm-tipomoneda/crud-tipomoneda/crud-tipomoneda.component';
import { GestionarProductoComponent } from './components/gestionar-producto/search-gestionar-producto/gestionar-producto.component';
import { CrudGestionarProductoComponent } from './components/gestionar-producto/crud-gestionar-producto/crud-gestionar-producto.component';
import { ConsultaGestionarProductoComponent } from './components/gestionar-producto/consulta-gestionar-producto/consulta-gestionar-producto.component';
import { GestionarMenupromocionComponent } from './components/gestionar-menupromocion/search-gestionar-menupromocion/gestionar-menupromocion.component';
import { ConsultaGestionarMenupromocionComponent } from './components/gestionar-menupromocion/consulta-gestionar-menupromocion/consulta-gestionar-menupromocion.component';
import { CrudGestionarMenupromocionComponent } from './components/gestionar-menupromocion/crud-gestionar-menupromocion/crud-gestionar-menupromocion.component';
import { AgregarProductoGestionarMenupromocionComponent } from './components/gestionar-menupromocion/agregar-producto-gestionar-menupromocion/agregar-producto-gestionar-menupromocion.component';
import { GenerarReporteComponent } from './components/generar-reporte/generar-reporte.component';
import { UploadComponent } from './upload/upload.component';
import { BackupModuleComponent } from './components/backup-module/backup-db/backup-module.component';
import { SearchRolComponent } from './components/abm-rol/search-rol/search-rol.component';
import { CrudRolComponent } from './components/abm-rol/crud-rol/crud-rol.component';

//IMPORTS PARA ROL ENCARGADO
import { AbmAbrirCajaComponent } from './components/abrir-caja/search-abrir-caja/abm-abrir-caja.component';
import { EditAbrirCajaComponent } from './components/abrir-caja/edit-abrir-caja/edit-abrir-caja.component';
import { AbmCerrarCajaComponent } from './components/cerrar-caja/search-cerrar-caja/abm-cerrar-caja.component';
import { EditCerrarCajaComponent } from './components/cerrar-caja/edit-cerrar-caja/edit-cerrar-caja.component';
import { AbmGenerarMovimientoCajaComponent } from './components/generar-movimiento-caja/search-generar-movimiento-caja/abm-generar-movimiento-caja.component';
import { EditGenerarMovimientoCajaComponent } from './components/generar-movimiento-caja/edit-generar-movimiento-caja/edit-generar-movimiento-caja.component';
import { CrudGenerarMovimientoCajaComponent } from './components/generar-movimiento-caja/crud-generar-movimiento-caja/crud-generar-movimiento-caja.component';
import { HabilitarDeshabilitarProductoComponent } from './components/habilitar-deshabilitar-producto/search-habilitar-deshabilitar-producto/habilitar-deshabilitar-producto.component';
import { CrudHabilitarDeshabilitarProductoComponent } from './components/habilitar-deshabilitar-producto/crud-habilitar-deshabilitar-producto/crud-habilitar-deshabilitar-producto.component';
import { SearchComponent } from './components/reasignar-mozo-a-estadia/search/search.component';
import { EditComponent } from './components/reasignar-mozo-a-estadia/edit/edit.component';
import { SearchPedidoComponent } from './components/anular-pedido/search-pedido/search-pedido.component';
import { EditPedidoComponent } from './components/anular-pedido/edit-pedido/edit-pedido.component';
import { DetallePedidoComponent } from './components/anular-pedido/detalle-pedido/detalle-pedido.component';
import { SearchGestionarEstadoEstadiaComponent } from './components/gestionar-estado-estadia/search-gestionar-estado-estadia/search-gestionar-estado-estadia.component';
import { EditGestionarEstadoEstadiaComponent } from './components/gestionar-estado-estadia/edit-gestionar-estado-estadia/edit-gestionar-estado-estadia.component';

//IMPORTS PARA ROL COCINERO
import { SearchActualizarPedidosComponent } from './components/actualizar-comanda-cocina/search-pedidos/search-actualizar-pedidos.component';
import { EnviarPedidoComponent } from './components/enviar-pedido/enviar-pedido/enviar-pedido.component';
import { CambiarEstadoPedidoComponent } from './components/cambiar-estado-pedido/cambiar-estado-pedido/cambiar-estado-pedido.component';

//IMPORT LOGUIN
import { RecuperarContraseniaComponent } from './components/recuperar-contrasenia/recuperar-contrasenia.component';
import { BackupAppComponent } from './components/backup-module/backup-app/backup-app/backup-app.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },

  //RUTAS ADMINISTRADOR  
  { path: "usuario", component: AbmUsuarioComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Consulta Usuario']}},
  { path: "usuario_crud/:id/:accion", component: CrudUsuarioComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Editar Usuario']}},
  { path: "unidadmedida", component: AbmUnidadmedidaComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Consulta Unidad Medida']}},
  { path: "unidadmedida_crud/:id/:accion", component: AbmUnidadmedidaCreateComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Editar Unidad Medida']}},
  { path: "caja", component: AbmCajaComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Consulta Caja']}},
  { path: "caja_edit/:id/:accion", component: EditCajaComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Editar Caja']}},
  { path: "mesa", component: AbmMesaComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Consulta Mesa']}},
  { path: "mesa_crud/:id/:accion", component: CrudMesaComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Editar Mesa']}},
  { path: "rubro", component: AbmRubroComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Consulta Rubro']}},
  { path: "rubro_crud/:id/:accion", component: CrudRubroComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Editar Rubro']}},
  { path: "sector", component: AbmSectorComponent, canActivate: [RoleGuardService],data: { nombreFuncion:['Consulta Sector']}},
  { path: "sector_crud/:id/:accion", component: CrudSectorComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Editar Sector']}},
  { path: "tipomoneda", component: AbmTipomonedaComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Consulta Tipo Moneda']}},
  { path: "tipomoneda_crud/:id/:accion", component: CrudTipomonedaComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Editar Tipo Moneda']}},
  { path: "producto", component: GestionarProductoComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Consulta Producto']}},
  { path: "producto_crud/:id/:accion", component: CrudGestionarProductoComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Editar Producto']}},
  { path: "producto_consulta/:id", component: ConsultaGestionarProductoComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Consulta Producto']}},
  { path: "menupromocion", component: GestionarMenupromocionComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Consultar Menu-Promocion']}},
  { path: "menupromocion_consulta/:id", component: ConsultaGestionarMenupromocionComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Consultar Menu-Promocion']}},
  { path: "menupromocion_crud/:id/:accion", component: CrudGestionarMenupromocionComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Editar  Menu-Promocion']}},
  { path: "menupromocion_agregarproducto/:id", component: AgregarProductoGestionarMenupromocionComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Editar  Menu-Promocion']}},
  { path: "reporte", component: GenerarReporteComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Generar Reporte']}},
  { path: "upload/:id/:nombre/:path/:retorno", component: UploadComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Cargar Imagen Producto o Menu-Promocion']}},
  { path: "upload", component: UploadComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Cargar Imagen Producto o Menu-Promocion']}},
  { path: "backup", component: BackupModuleComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Gestionar Backup']}},
  { path: "backupApp", component: BackupAppComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Gestionar Backup']}},
  { path: "rol", component: SearchRolComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Consulta Rol']}},
  { path: "rol_crud/:id/:accion", component: CrudRolComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Editar Rol']}},
  
  //RUTAS ENCARGADO  
  { path: "abrircaja", component: AbmAbrirCajaComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Consulta Abrir Caja']}},
  { path: "abrircaja/:id/:accion", component: EditAbrirCajaComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Editar Abrir Caja']}},
  { path: "cerrarcaja", component: AbmCerrarCajaComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Consulta Cerrar Caja']}},
  { path: "cerrarcaja/:id/:accion", component: EditCerrarCajaComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Editar Cerrar Caja']}},
  { path: "generarmovimientocaja", component: AbmGenerarMovimientoCajaComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Consultar movimiento de caja']}},
  { path: "generarmovimientocaja/:id", component: EditGenerarMovimientoCajaComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Generar movimiento de caja']}},
  { path: "generarmovimientocaja_crud/:id", component: CrudGenerarMovimientoCajaComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Generar movimiento de caja']}},
  { path: "habilitar-deshabilitar-producto", component: HabilitarDeshabilitarProductoComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Consulta Habilitar-Deshabilitar Producto']}},
  { path: "crud_habilitar_deshabilitar_producto/:id", component: CrudHabilitarDeshabilitarProductoComponent, canActivate: [RoleGuardService], data: { nombreFuncion:['Editar Habilitar-Deshabilitar Producto']}},
  { path: 'search_mozo_estadia', component: SearchComponent , canActivate: [RoleGuardService], data: { nombreFuncion:['Consulta Mozo-Estadia']}},
  { path: 'edit_mozo_estadia/:id', component: EditComponent , canActivate: [RoleGuardService], data: { nombreFuncion:['Editar Mozo-Estadia']}},
  { path: 'search_anular_pedido', component: SearchPedidoComponent , canActivate: [RoleGuardService], data: { nombreFuncion:['Consulta Anular Pedido']}}, 
  { path: 'edit_anular_pedido/:id', component: EditPedidoComponent , canActivate: [RoleGuardService], data: { nombreFuncion:['Editar Anular Pedido']}},
  { path: 'detalle_anular_pedido/:id', component: DetallePedidoComponent , canActivate: [RoleGuardService], data: { nombreFuncion:['Consulta Anular Pedido']}},
  { path: 'search_gestionar_estado_estadia', component: SearchGestionarEstadoEstadiaComponent , canActivate: [RoleGuardService], data: { nombreFuncion:['Consulta de Gestion de Estado-Estadia']}},  
  { path: 'edit_gestionar_estado_estadia/:id', component: EditGestionarEstadoEstadiaComponent , canActivate: [RoleGuardService], data: { nombreFuncion:['Edicion de Gestion de Estado-Estadia']}},

  //RUTAS COCINERO
  { path: 'search_actualizar_comanda_cocina', component: SearchActualizarPedidosComponent , canActivate: [RoleGuardService], data: { nombreFuncion:['Consulta Comanda Cocina']}},
  { path: 'enviar_pedido', component: EnviarPedidoComponent , canActivate: [RoleGuardService], data: { nombreFuncion:['Enviar Pedido (Comanda Cocina)']}},
  { path: 'cambiar_estado_pedido', component: CambiarEstadoPedidoComponent , canActivate: [RoleGuardService], data: { nombreFuncion:['Cambiar Estado Pedido (Comanda Cocina)']}},

  //LOGUIN
  { path: 'recuperar-contrasenia/:token', component: RecuperarContraseniaComponent},

  { path: "**", redirectTo: "login" },
  { path: "", redirectTo: "/login", pathMatch: "full" },  
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }