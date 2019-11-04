import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AbmUsuarioComponent } from './components/abm-usuario/search-usuario/abm-usuario.component';
import { AbmTipomonedaComponent } from './components/abm-tipomoneda/search-tipomoneda/abm-tipomoneda.component';
import { AbmUnidadmedidaComponent } from './components/abm-unidadmedida/search-unidadmedida/abm-unidadmedida.component';
import { AbmUnidadmedidaCreateComponent } from './components/abm-unidadmedida/crud-unidadmedida/abm-unidadmedida-crud.component';
import { AbmCajaComponent } from './components/abm-caja/search-caja/abm-caja.component';
import { AbmAbrirCajaComponent } from './components/abrir-caja/search-abrir-caja/abm-abrir-caja.component';
import { EditAbrirCajaComponent } from './components/abrir-caja/edit-abrir-caja/edit-abrir-caja.component';
import { AbmCerrarCajaComponent } from './components/cerrar-caja/search-cerrar-caja/abm-cerrar-caja.component';
import { EditCerrarCajaComponent } from './components/cerrar-caja/edit-cerrar-caja/edit-cerrar-caja.component';
import { AbmGenerarMovimientoCajaComponent } from './components/generar-movimiento-caja/search-generar-movimiento-caja/abm-generar-movimiento-caja.component';
import { EditGenerarMovimientoCajaComponent } from './components/generar-movimiento-caja/edit-generar-movimiento-caja/edit-generar-movimiento-caja.component';
import { CrudGenerarMovimientoCajaComponent } from './components/generar-movimiento-caja/crud-generar-movimiento-caja/crud-generar-movimiento-caja.component';
import { EditCajaComponent } from './components/abm-caja/edit-caja/edit-caja.component';
import { AbmRubroComponent } from './components/abm-rubro/search-rubro/abm-rubro.component';
import { GestionarProductoComponent } from './components/gestionar-producto/search-gestionar-producto/gestionar-producto.component';
import { HabilitarDeshabilitarProductoComponent } from './components/habilitar-deshabilitar-producto/search-habilitar-deshabilitar-producto/habilitar-deshabilitar-producto.component';
import { CrudHabilitarDeshabilitarProductoComponent } from './components/habilitar-deshabilitar-producto/crud-habilitar-deshabilitar-producto/crud-habilitar-deshabilitar-producto.component';
import { ConsultaHabilitarDeshabilitarProductoComponent } from './components/habilitar-deshabilitar-producto/consulta-habilitar-deshabilitar-producto/consulta-habilitar-deshabilitar-producto.component';
import { GestionarMenupromocionComponent } from './components/gestionar-menupromocion/search-gestionar-menupromocion/gestionar-menupromocion.component';
import { GenerarReporteComponent } from './components/generar-reporte/generar-reporte.component';
import { CrudUsuarioComponent } from './components/abm-usuario/crud-usuario/crud-usuario.component';
import { CrudSectorComponent } from './components/abm-sector/crud-sector/crud-sector.component';
import { CrudMesaComponent } from './components/abm-mesa/crud-mesa/crud-mesa.component';
import { CrudRubroComponent } from './components/abm-rubro/crud-rubro/crud-rubro.component';
import { CrudTipomonedaComponent } from './components/abm-tipomoneda/crud-tipomoneda/crud-tipomoneda.component';
import { CrudGestionarProductoComponent } from './components/gestionar-producto/crud-gestionar-producto/crud-gestionar-producto.component';
import { ConsultaGestionarProductoComponent } from './components/gestionar-producto/consulta-gestionar-producto/consulta-gestionar-producto.component';
import { ConsultaGestionarMenupromocionComponent } from './components/gestionar-menupromocion/consulta-gestionar-menupromocion/consulta-gestionar-menupromocion.component';
import { CrudGestionarMenupromocionComponent } from './components/gestionar-menupromocion/crud-gestionar-menupromocion/crud-gestionar-menupromocion.component';
import { AbmSectorComponent } from './components/abm-sector/search-sector/abm-sector.component';
import { AbmMesaComponent } from './components/abm-mesa/search-mesa/abm-mesa.component';
import { UploadComponent } from './upload/upload.component';

import { AgregarProductoGestionarMenupromocionComponent } from './components/gestionar-menupromocion/agregar-producto-gestionar-menupromocion/agregar-producto-gestionar-menupromocion.component';
import { LoginGuardGuard } from './components/shared/guardias/login-guard.guard';



const routes: Routes = [ 
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'usuario', component: AbmUsuarioComponent, canActivate: [LoginGuardGuard]},
    { path: 'usuario_crud/:id/:accion', component: CrudUsuarioComponent, canActivate: [LoginGuardGuard]},
    { path: 'sector', component: AbmSectorComponent, canActivate: [LoginGuardGuard]},
    { path: 'sector_crud/:id/:accion', component: CrudSectorComponent, canActivate: [LoginGuardGuard]},
    { path: 'mesa', component: AbmMesaComponent, canActivate: [LoginGuardGuard]},
    { path: 'mesa_crud/:id/:accion', component: CrudMesaComponent, canActivate: [LoginGuardGuard]},
    { path: 'tipomoneda', component: AbmTipomonedaComponent, canActivate: [LoginGuardGuard]},
    { path: 'tipomoneda_crud/:id/:accion', component: CrudTipomonedaComponent, canActivate: [LoginGuardGuard]},
    { path: 'unidadmedida', component: AbmUnidadmedidaComponent, canActivate: [LoginGuardGuard]},
    { path: 'unidadmedida_crud/:id/:accion', component: AbmUnidadmedidaCreateComponent, canActivate: [LoginGuardGuard]},
    { path: 'caja', component: AbmCajaComponent , canActivate: [LoginGuardGuard]},    
    { path: 'caja_edit/:id/:accion', component: EditCajaComponent, canActivate: [LoginGuardGuard]},
    { path: 'generarmovimientocaja/:id', component: EditGenerarMovimientoCajaComponent, canActivate: [LoginGuardGuard]},
    { path: 'generarmovimientocaja', component: AbmGenerarMovimientoCajaComponent, canActivate: [LoginGuardGuard]},
    { path: 'generarmovimientocaja_crud/:id', component: CrudGenerarMovimientoCajaComponent, canActivate: [LoginGuardGuard]},
    { path: 'cerrarcaja/:id/:accion', component: EditCerrarCajaComponent, canActivate: [LoginGuardGuard]},
    { path: 'cerrarcaja', component: AbmCerrarCajaComponent, canActivate: [LoginGuardGuard]},
    { path: 'abrircaja/:id/:accion', component: EditAbrirCajaComponent, canActivate: [LoginGuardGuard]},
    { path: 'abrircaja', component: AbmAbrirCajaComponent, canActivate: [LoginGuardGuard]},
    { path: 'rubro', component: AbmRubroComponent, canActivate: [LoginGuardGuard]},
    { path: 'rubro_crud/:id/:accion', component: CrudRubroComponent, canActivate: [LoginGuardGuard]},
    { path: 'producto', component: GestionarProductoComponent, canActivate: [LoginGuardGuard]},
    { path: 'habilitar-deshabilitar-producto', component: HabilitarDeshabilitarProductoComponent, canActivate: [LoginGuardGuard]},
    { path: 'crud_habilitar_deshabilitar_producto/:id', component: CrudHabilitarDeshabilitarProductoComponent, canActivate: [LoginGuardGuard]},
    { path: 'consulta_habilitar_deshabilitar_producto/:id', component: ConsultaHabilitarDeshabilitarProductoComponent, canActivate: [LoginGuardGuard]},
    { path: 'producto_consulta/:id', component: ConsultaGestionarProductoComponent, canActivate: [LoginGuardGuard]},
    { path: 'producto_crud/:id/:accion', component: CrudGestionarProductoComponent, canActivate: [LoginGuardGuard]},
    { path: 'menupromocion', component: GestionarMenupromocionComponent, canActivate: [LoginGuardGuard]},
    { path: 'menupromocion_consulta/:id', component: ConsultaGestionarMenupromocionComponent, canActivate: [LoginGuardGuard]},
    { path: 'menupromocion_crud/:id/:accion', component: CrudGestionarMenupromocionComponent, canActivate: [LoginGuardGuard]},
    { path: 'menupromocion_agregarproducto/:id', component: AgregarProductoGestionarMenupromocionComponent, canActivate: [LoginGuardGuard]},
    { path: 'reporte', component: GenerarReporteComponent, canActivate: [LoginGuardGuard]},
    { path: 'upload/:id/:nombre/:path/:retorno', component: UploadComponent, canActivate: [LoginGuardGuard]},
    { path: 'upload', component: UploadComponent, canActivate: [LoginGuardGuard]},
    { path: '**', redirectTo: 'login'},
    { path: '',  redirectTo: '/login', pathMatch: 'full' },
 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }
