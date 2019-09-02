import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// servicios
import { UsuarioServiceService } from './services/usuario-service.service';

//qr
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    NgxQRCodeModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    DatePipe,
    QRScanner,
    Camera,
    UsuarioServiceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
