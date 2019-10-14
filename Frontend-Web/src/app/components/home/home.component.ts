import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HomeService, IconoHome } from 'src/app/services/home/home.service';

// import { AbmUsuarioComponent } from '../abm-usuario/abm-usuario.component';
// import { AbmTipomonedaComponent } from '../abm-tipomoneda/abm-tipomoneda.component';
// import { AbmUnidadmedidaComponent } from '../abm-unidadmedida/abm-unidadmedida.component';
// import { AbmCajaComponent } from '../abm-caja/abm-caja.component';
// import { AbmMesaComponent } from '../abm-mesa/abm-mesa.component';
// import { AbmRubroComponent } from '../abm-rubro/abm-rubro.component';
// import { AbmSectorComponent } from '../abm-sector/abm-sector.component';
// import { GestionarProductoComponent } from '../gestionar-producto/gestionar-producto.component';
// import { GestionarMenupromocionComponent } from '../gestionar-menupromocion/gestionar-menupromocion.component';
// import { GenerarReporteComponent } from '../generar-reporte/generar-reporte.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  
  iconosHome: IconoHome [];

  constructor( private activatedRoute: ActivatedRoute, 
               private homeSercie: HomeService, 
               private routes: Router ) 
    { 
      this.activatedRoute.params.subscribe(params => {
        this.iconosHome = this.homeSercie.getIconosHome();
      });
    }

  ngOnInit() {
    /* Hacer lógica que verifique si se encuentra logueado. En caso de no estar 
    logueado, redirige a pantalla de login */
    
  }

  goTo( ruta: string) {
    let next;
    switch (ruta) {
    case 'abm-usuario':
      next = '/usuario';
    break;
    case 'abm-tipomoneda':
      next = '/tipomoneda';
    break;
    case 'abm-unidadmedida':
      next = '/unidadmedida';
    break;
    case 'abm-caja':
      next = '/caja';
    break;
    case 'abm-mesa':
      next = '/mesa';
    break;
    case 'abm-rubro':
      next = '/rubro';
    break;
    case 'abm-sector':
      next = '/sector';
    break;
    case 'gestionar-producto':
      next = '/producto';
    break;
    case 'gestionar-menupromocion':
      next = '/menupromocion';
    break;
    case 'generar-reporte':
      next = '/reporte';
    break;
    }
    this.routes.navigate([next]);
  } 
}
