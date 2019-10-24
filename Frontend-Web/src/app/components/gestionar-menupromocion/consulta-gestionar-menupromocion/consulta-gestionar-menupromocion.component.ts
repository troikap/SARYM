import { Component, OnInit } from '@angular/core';
import { MenuPromocionService } from 'src/app/services/menu-promocion/menu-promocion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuPromocion } from 'src/app/model/menu-promocion/menu-promocion.model';

@Component({
  selector: 'app-consulta-gestionar-menupromocion',
  templateUrl: './consulta-gestionar-menupromocion.component.html',
  styleUrls: ['./consulta-gestionar-menupromocion.component.scss']
})
export class ConsultaGestionarMenupromocionComponent implements OnInit {

  menuPromocion: MenuPromocion;
  estadoMenuPromocion: string;

  constructor(
    public menupromocionService: MenuPromocionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { 
    this.activatedRoute.params.subscribe(params => {
      // console.log("Parámetro de entrada: ", params.id);
      this.menupromocionService.getMenuPromocion(params.id)
        .then((res: MenuPromocion) => {
          console.log("Datos del MenuPromocion obtenido: ", res);
          this.menuPromocion = res;
          this.estadoMenuPromocion = res['menupromocionestados'][0].estadomenupromocion.nombreEstadoMenuPromocion;
          console.log("Estado Menu Promocion: ", this.estadoMenuPromocion);
        });

      });
  }

  ngOnInit() {
  }

  generarAccion(accion: string) {
    console.log("accion: ", accion);
    this.router.navigate( [`/menupromocion_crud/${this.menuPromocion.idMenuPromocion}/${accion}`] );
  }

}
