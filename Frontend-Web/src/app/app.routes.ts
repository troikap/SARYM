import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AbmUsuarioComponent } from './components/abm-usuario/search-usuario/abm-usuario.component';
import { AbmTipomonedaComponent } from './components/abm-tipomoneda/abm-tipomoneda.component';
import { AbmUnidadmedidaComponent } from './components/abm-unidadmedida/search-unidadmedida/abm-unidadmedida.component';
import { AbmUnidadmedidaCreateComponent } from './components/abm-unidadmedida/crud-unidadmedida/abm-unidadmedida-crud.component';
import { AbmCajaComponent } from './components/abm-caja/abm-caja.component';
import { AbmMesaComponent } from './components/abm-mesa/abm-mesa.component';
import { AbmRubroComponent } from './components/abm-rubro/search-rubro/abm-rubro.component';
import { AbmSectorComponent } from './components/abm-sector/abm-sector.component';
import { GestionarProductoComponent } from './components/gestionar-producto/gestionar-producto.component';
import { GestionarMenupromocionComponent } from './components/gestionar-menupromocion/gestionar-menupromocion.component';
import { GenerarReporteComponent } from './components/generar-reporte/generar-reporte.component';
import { CrudUsuarioComponent } from './components/abm-usuario/crud-usuario/crud-usuario.component';
import { CrudRubroComponent } from './components/abm-rubro/crud-rubro/crud-rubro.component';



const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'usuario', component: AbmUsuarioComponent },
    { path: 'usuario_crud/:id/:accion', component: CrudUsuarioComponent },
    { path: 'tipomoneda', component: AbmTipomonedaComponent },
    { path: 'unidadmedida', component: AbmUnidadmedidaComponent },
    { path: 'unidadmedida_crud/:id/:accion', component: AbmUnidadmedidaCreateComponent},
    { path: 'caja', component: AbmCajaComponent },
    { path: 'mesa', component: AbmMesaComponent },
    { path: 'rubro', component: AbmRubroComponent },
    { path: 'rubro_crud/:id/:accion', component: CrudRubroComponent },
    { path: 'sector', component: AbmSectorComponent },
    { path: 'producto', component: GestionarProductoComponent },
    { path: 'menupromocion', component: GestionarMenupromocionComponent },
    { path: 'reporte', component: GenerarReporteComponent },
    { path: '',  redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: 'home'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }
