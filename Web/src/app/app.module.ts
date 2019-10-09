import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductoComponent } from './components/entidades/producto/producto.component';
import { UsuarioComponent } from './components/entidades/usuario/usuario.component';
import { TipoMonedaComponent } from './components/entidades/tipo-moneda/tipo-moneda.component';
import { UnidadMedidaComponent } from './components/entidades/unidad-medida/unidad-medida.component';
import { RubroComponent } from './components/entidades/rubro/rubro.component';
import { SectorComponent } from './components/entidades/sector/sector.component';
import { MenuPromocionComponent } from './components/entidades/menu-promocion/menu-promocion.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductoComponent,
    UsuarioComponent,
    TipoMonedaComponent,
    UnidadMedidaComponent,
    RubroComponent,
    SectorComponent,
    MenuPromocionComponent,
    NavbarComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
