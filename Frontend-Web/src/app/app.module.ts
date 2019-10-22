import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AbmUsuarioComponent } from './components/abm-usuario/search-usuario/abm-usuario.component';
import { AbmSectorComponent } from './components/abm-sector/search-sector/abm-sector.component';
import { AbmTipomonedaComponent } from './components/abm-tipomoneda/search-tipomoneda/abm-tipomoneda.component';
import { AbmUnidadmedidaComponent } from './components/abm-unidadmedida/search-unidadmedida/abm-unidadmedida.component';
import { AbmCajaComponent } from './components/abm-caja/search-caja/abm-caja.component';
import { CrudCajaComponent } from './components/abm-caja/crud-caja/crud-caja.component';
import { EditCajaComponent } from './components/abm-caja/edit-caja/edit-caja.component';
import { AbmAbrirCajaComponent } from './components/abrir-caja/search-abrir-caja/abm-abrir-caja.component';
import { EditAbrirCajaComponent } from './components/abrir-caja/edit-abrir-caja/edit-abrir-caja.component';
import { AbmCerrarCajaComponent } from './components/cerrar-caja/search-cerrar-caja/abm-cerrar-caja.component';
import { EditCerrarCajaComponent } from './components/cerrar-caja/edit-cerrar-caja/edit-cerrar-caja.component';
import { AbmGenerarMovimientoCajaComponent } from './components/generar-movimiento-caja/search-generar-movimiento-caja/abm-generar-movimiento-caja.component';
import { EditGenerarMovimientoCajaComponent } from './components/generar-movimiento-caja/edit-generar-movimiento-caja/edit-generar-movimiento-caja.component';
import { AbmRubroComponent } from './components/abm-rubro/search-rubro/abm-rubro.component';
import { GestionarProductoComponent } from './components/gestionar-producto/search-gestionar-producto/gestionar-producto.component';
import { GenerarReporteComponent } from './components/generar-reporte/generar-reporte.component';
import { AbmUnidadmedidaCreateComponent } from './components/abm-unidadmedida/crud-unidadmedida/abm-unidadmedida-crud.component';
import { CrudRubroComponent } from './components/abm-rubro/crud-rubro/crud-rubro.component';
import { CrudUsuarioComponent } from './components/abm-usuario/crud-usuario/crud-usuario.component';
import { CrudSectorComponent } from './components/abm-sector/crud-sector/crud-sector.component';
import { CrudTipomonedaComponent } from './components/abm-tipomoneda/crud-tipomoneda/crud-tipomoneda.component';
import { CrudGestionarProductoComponent } from './components/gestionar-producto/crud-gestionar-producto/crud-gestionar-producto.component';
import { ConsultaGestionarProductoComponent } from './components/gestionar-producto/consulta-gestionar-producto/consulta-gestionar-producto.component';
import { NoimagePipe } from './pipes/noimage-producto.pipe';
import { CrudGestionarMenupromocionComponent } from './components/gestionar-menupromocion/crud-gestionar-menupromocion/crud-gestionar-menupromocion.component';
import { ConsultaGestionarMenupromocionComponent } from './components/gestionar-menupromocion/consulta-gestionar-menupromocion/consulta-gestionar-menupromocion.component';
import { GestionarMenupromocionComponent } from './components/gestionar-menupromocion/search-gestionar-menupromocion/gestionar-menupromocion.component';
import { CrudMesaComponent } from './components/abm-mesa/crud-mesa/crud-mesa.component';
import { AbmMesaComponent } from './components/abm-mesa/search-mesa/abm-mesa.component';
import { UploadService } from './services/upload/upload.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    AbmUsuarioComponent,
    AbmSectorComponent,
    AbmTipomonedaComponent,
    AbmUnidadmedidaComponent,
    AbmCajaComponent,
    CrudCajaComponent,
    AbmAbrirCajaComponent,
    EditAbrirCajaComponent,
    AbmCerrarCajaComponent,
    EditCerrarCajaComponent,
    AbmGenerarMovimientoCajaComponent,
    EditGenerarMovimientoCajaComponent,
    EditCajaComponent,
    AbmRubroComponent,
    GestionarProductoComponent,
    GestionarMenupromocionComponent,
    GenerarReporteComponent,
    AbmUnidadmedidaCreateComponent,
    CrudRubroComponent,
    CrudUsuarioComponent,
    CrudTipomonedaComponent,
    CrudGestionarProductoComponent,
    ConsultaGestionarProductoComponent,
    NoimagePipe,
    CrudGestionarMenupromocionComponent,
    ConsultaGestionarMenupromocionComponent,
    CrudSectorComponent,
    CrudMesaComponent,
    AbmMesaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
