import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AbmUsuarioComponent } from './components/abm-usuario/search-usuario/abm-usuario.component';
import { AbmTipomonedaComponent } from './components/abm-tipomoneda/search-tipomoneda/abm-tipomoneda.component';
import { AbmUnidadmedidaComponent } from './components/abm-unidadmedida/search-unidadmedida/abm-unidadmedida.component';
import { AbmUnidadmedidaCreateComponent } from './components/abm-unidadmedida/crud-unidadmedida/abm-unidadmedida-crud.component';
import { AbmCajaComponent } from './components/abm-caja/search-caja/abm-caja.component';
import { CrudCajaComponent } from './components/abm-caja/crud-caja/crud-caja.component';
import { EditCajaComponent } from './components/abm-caja/edit-caja/edit-caja.component';
import { AbmRubroComponent } from './components/abm-rubro/search-rubro/abm-rubro.component';
import { GestionarProductoComponent } from './components/gestionar-producto/search-gestionar-producto/gestionar-producto.component';
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


const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'usuario', component: AbmUsuarioComponent },
    { path: 'usuario_crud/:id/:accion', component: CrudUsuarioComponent },
    { path: 'sector', component: AbmSectorComponent },
    { path: 'sector_crud/:id/:accion', component: CrudSectorComponent },
    { path: 'mesa', component: AbmMesaComponent },
    { path: 'mesa_crud/:id/:accion', component: CrudMesaComponent },
    { path: 'tipomoneda', component: AbmTipomonedaComponent },
    { path: 'tipomoneda_crud/:id/:accion', component: CrudTipomonedaComponent},
    { path: 'unidadmedida', component: AbmUnidadmedidaComponent },
    { path: 'unidadmedida_crud/:id/:accion', component: AbmUnidadmedidaCreateComponent},
    { path: 'caja', component: AbmCajaComponent },
    { path: 'caja_crud/:id/:accion', component: CrudCajaComponent},
    { path: 'caja_edit/:id/:accion', component: EditCajaComponent},
    { path: 'rubro', component: AbmRubroComponent },
    { path: 'rubro_crud/:id/:accion', component: CrudRubroComponent },
    { path: 'producto', component: GestionarProductoComponent },
    { path: 'producto_consulta/:id', component: ConsultaGestionarProductoComponent },
    { path: 'producto_crud/:id/:accion', component: CrudGestionarProductoComponent },
    { path: 'menupromocion', component: GestionarMenupromocionComponent },
    { path: 'menupromocion_consulta/:id', component: ConsultaGestionarMenupromocionComponent },
    { path: 'menupromocion_crud/:id/:accion', component: CrudGestionarMenupromocionComponent },
    { path: 'reporte', component: GenerarReporteComponent },
    { path: '',  redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: 'home'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }
