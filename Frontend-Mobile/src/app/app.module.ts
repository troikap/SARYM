import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// servicios
// import { UsuarioServiceService } from './services/usuario.service';
import { ReservaService } from './services/reserva/reserva.service';
import { MesaService } from './services/mesa/mesa.service';
import { AlertService } from './providers/alert.service';
import { ToastService } from './providers/toast.service';
import { LoaderService } from './providers/loader.service';
import { PagoService } from './services/pago/pago.service';

// providers
import { TratarFechaProvider } from './providers/tratarFecha.provider';

//qr
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

//form
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

//format
import { DatePipe } from '@angular/common';
import { BrMaskerModule } from 'br-mask';
import { IonicSelectableModule } from 'ionic-selectable';

//camera
import { Camera } from '@ionic-native/camera/ngx';

//storage
import { IonicStorageModule } from '@ionic/storage';

// import { ModalDetalleCatalogoPage } from './modal/modal-detalle-catalogo/modal-detalle-catalogo.page';





@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    NgxQRCodeModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    BrMaskerModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    DatePipe,
    QRScanner,
    Camera,
    ReservaService,
    MesaService,
    IonicSelectableModule,
    TratarFechaProvider,
    AlertService,
    ToastService,
    LoaderService,
    PagoService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
