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

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },

  //RUTAS ADMINISTRADOR  
  { path: "usuario", component: AbmUsuarioComponent, canActivate: [RoleGuardService], data: { expectedRole:'Administrador'}},
  { path: "usuario_crud/:id/:accion", component: CrudUsuarioComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "unidadmedida", component: AbmUnidadmedidaComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "unidadmedida_crud/:id/:accion", component: AbmUnidadmedidaCreateComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}}, 
  { path: "caja", component: AbmCajaComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "caja_edit/:id/:accion", component: EditCajaComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}}, 
  { path: "mesa", component: AbmMesaComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "mesa_crud/:id/:accion", component: CrudMesaComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "rubro", component: AbmRubroComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "rubro_crud/:id/:accion", component: CrudRubroComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "sector", component: AbmSectorComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "sector_crud/:id/:accion", component: CrudSectorComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "tipomoneda", component: AbmTipomonedaComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "tipomoneda_crud/:id/:accion", component: CrudTipomonedaComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "producto", component: GestionarProductoComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "producto_crud/:id/:accion", component: CrudGestionarProductoComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "producto_consulta/:id", component: ConsultaGestionarProductoComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "menupromocion", component: GestionarMenupromocionComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "menupromocion_consulta/:id", component: ConsultaGestionarMenupromocionComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "menupromocion_crud/:id/:accion", component: CrudGestionarMenupromocionComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "menupromocion_agregarproducto/:id", component: AgregarProductoGestionarMenupromocionComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "reporte", component: GenerarReporteComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "upload/:id/:nombre/:path/:retorno", component: UploadComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  { path: "upload", component: UploadComponent, canActivate: [RoleGuardService], data: { expectedRole:['Administrador']}},
  //RUTAS ENCARGADO  
  { path: "abrircaja", component: AbmAbrirCajaComponent, canActivate: [RoleGuardService], data: { expectedRole:['Encargado']}},
  { path: "abrircaja/:id/:accion", component: EditAbrirCajaComponent, canActivate: [RoleGuardService], data: { expectedRole:['Encargado']}},
  { path: "cerrarcaja", component: AbmCerrarCajaComponent, canActivate: [RoleGuardService], data: { expectedRole:['Encargado']}},
  { path: "cerrarcaja/:id/:accion", component: EditCerrarCajaComponent, canActivate: [RoleGuardService], data: { expectedRole:['Encargado']}},
  { path: "generarmovimientocaja", component: AbmGenerarMovimientoCajaComponent, canActivate: [RoleGuardService], data: { expectedRole:['Encargado']}},
  { path: "generarmovimientocaja/:id", component: EditGenerarMovimientoCajaComponent, canActivate: [RoleGuardService], data: { expectedRole:['Encargado']}},
  { path: "generarmovimientocaja_crud/:id", component: CrudGenerarMovimientoCajaComponent, canActivate: [RoleGuardService], data: { expectedRole:['Encargado']}},
  { path: "habilitar-deshabilitar-producto", component: HabilitarDeshabilitarProductoComponent, canActivate: [RoleGuardService], data: { expectedRole:['Encargado']}},
  { path: "crud_habilitar_deshabilitar_producto/:id", component: CrudHabilitarDeshabilitarProductoComponent, canActivate: [RoleGuardService], data: { expectedRole:['Encargado']}},

  { path: "**", redirectTo: "login" },
  { path: "", redirectTo: "/login", pathMatch: "full" },  

];

  /* para meter 2 roles o mas... no borrar:
    canActivate: [RoleGuardService], data: { expectedRole:['Administrador', 'Encargado']}, 
   */ 

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }
