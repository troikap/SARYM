import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
    private iconos: IconoHome[] = [
        {
          id: '0',
          nombre: 'ABM Usuario',
          clave: 'abm-usuario',
          path: '/usuario',
          img: 'assets/imagenes/noimage.png',
          responsable: 'Administrador'
        },
        {
          id: '1',
          nombre: 'ABM Tipo Moneda',
          clave: 'abm-tipomoneda',
          path: '/tipomoneda',
          img: 'assets/imagenes/noimage.png',
          responsable: 'Administrador'
        },
        {
          id: '2',
          nombre: 'ABM Unidad Medida',
          clave: 'abm-unidadmedida',
          path: '/unidadmedida',
          img: 'assets/imagenes/noimage.png',
          responsable: 'Administrador'
        },
        {
          id: '3',
          nombre: 'ABM Caja',
          clave: 'abm-caja',
          path: '/caja',
          img: 'assets/imagenes/noimage.png',
          responsable: 'Administrador'
        },
        {
          id: '4',
          nombre: 'ABM Mesa',
          clave: 'abm-mesa',
          path: '/mesa',
          img: 'assets/imagenes/noimage.png',
          responsable: 'Administrador'
        },
        {
          id: '5',
          nombre: 'ABM Rubro',
          clave: 'abm-rubro',
          path: '/rubro',
          img: 'assets/imagenes/noimage.png',
          responsable: 'Administrador'
        },
        {
          id: '6',
          nombre: 'ABM Sector',
          clave: 'abm-sector',
          path: '/sector',
          img: 'assets/imagenes/noimage.png',
          responsable: 'Administrador'
        },
        {
          id: '7',
          nombre: 'Gestionar Producto',
          clave: 'gestionar-producto',
          path: '/producto',
          img: 'assets/imagenes/noimage.png',
          responsable: 'Administrador'
        },
        {
          id: '8',
          nombre: 'Gestionar Menu Promocion',
          clave: 'gestionar-menupromocion',
          path: '/menupromocion',
          img: 'assets/imagenes/noimage.png',
          responsable: 'Administrador'
        },
        {
          id: '9',
          nombre: 'Generar Reporte',
          clave: 'generar-reporte',
          path: '/reporte',
          img: 'assets/imagenes/noimage.png',
          responsable: 'Administrador'
        },
    ];

    constructor() {
        console.log('Servicio funcionando');
    }

    getIconosHome(): IconoHome[] {
        return this.iconos;
    }
    getIconoHomeParticular( idx: number ): IconoHome {
      return this.iconos[idx];
    }
}

export interface IconoHome {
    id: string;
    nombre: string;
    clave: string;
    path: string;
    img: string;
    responsable: string;
}
