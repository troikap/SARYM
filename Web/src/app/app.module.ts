import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AbmUsuarioComponent } from './components/abm-usuario/abm-usuario.component';
import { AbmTipomonedaComponent } from './components/abm-tipomoneda/abm-tipomoneda.component';
import { AbmUnidadmedidaComponent } from './components/abm-unidadmedida/abm-unidadmedida.component';
import { AbmCajaComponent } from './components/abm-caja/abm-caja.component';
import { AbmMesaComponent } from './components/abm-mesa/abm-mesa.component';
import { AbmRubroComponent } from './components/abm-rubro/abm-rubro.component';
import { AbmSectorComponent } from './components/abm-sector/abm-sector.component';
import { GestionarProductoComponent } from './components/gestionar-producto/gestionar-producto.component';
import { GestionarMenupromocionComponent } from './components/gestionar-menupromocion/gestionar-menupromocion.component';
import { GenerarReporteComponent } from './components/generar-reporte/generar-reporte.component';
import { AbmUnidadmedidaCreateComponent } from './components/abm-unidadmedida-create/abm-unidadmedida-create.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    AbmUsuarioComponent,
    AbmTipomonedaComponent,
    AbmUnidadmedidaComponent,
    AbmCajaComponent,
    AbmMesaComponent,
    AbmRubroComponent,
    AbmSectorComponent,
    GestionarProductoComponent,
    GestionarMenupromocionComponent,
    GenerarReporteComponent,
    AbmUnidadmedidaCreateComponent
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
