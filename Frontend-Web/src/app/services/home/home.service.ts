import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HomeService {
  private iconos: IconoHome[] = [
    {
      id: "0",
      nombre: "ABM Usuario",
      clave: "abm-usuario",
      path: "/usuario",
      img: "assets/imagenes/user_accounts.png",
      responsable: "Administrador"
    },
    {
      id: "1",
      nombre: "ABM Tipo Moneda",
      clave: "abm-tipomoneda",
      path: "/tipomoneda",
      img: "assets/imagenes/tipo-moneda.png",
      responsable: "Administrador"
    },
    {
      id: "2",
      nombre: "ABM Unidad Medida",
      clave: "abm-unidadmedida",
      path: "/unidadmedida",
      img: "assets/imagenes/unidad-medida.png",
      responsable: "Administrador"
    },
    {
      id: "3",
      nombre: "ABM Caja",
      clave: "abm-caja",
      path: "/caja",
      img: "assets/imagenes/caja.png",
      responsable: "Administrador"
    },
    {
      id: "4",
      nombre: "ABM Mesa",
      clave: "abm-mesa",
      path: "/mesa",
      img: "assets/imagenes/config_general.png",
      responsable: "Administrador"
    },
    {
      id: "5",
      nombre: "ABM Rubro",
      clave: "abm-rubro",
      path: "/rubro",
      img: "assets/imagenes/rubro.png",
      responsable: "Administrador"
    },
    {
      id: "6",
      nombre: "ABM Sector",
      clave: "abm-sector",
      path: "/sector",
      img: "assets/imagenes/ubicacion.png",
      responsable: "Administrador"
    },
    {
      id: "7",
      nombre: "Gestionar Producto",
      clave: "gestionar-producto",
      path: "/producto",
      img: "assets/imagenes/producto.png",
      responsable: "Administrador"
    },
    {
      id: "8",
      nombre: "Gestionar Menu Promocion",
      clave: "gestionar-menupromocion",
      path: "/menupromocion",
      img: "assets/imagenes/menu-promocion.png",
      responsable: "Administrador"
    },
    {
      id: "9",
      nombre: "Generar Reporte",
      clave: "generar-reporte",
      path: "/reporte",
      img: "assets/imagenes/reportes.png",
      responsable: "Administrador"
    },
    {
      id: "10",
      nombre: "Generar Backup",
      clave: "backup",
      path: "/backup",
      img: "assets/imagenes/backup.png",
      responsable: "Administrador"
    }
  ];
  private encargado: IconoHome[] = [
    {
      id: "0",
      nombre: "Abrir Caja",
      clave: "abrir-caja",
      path: "/abrircaja",
      img: "assets/imagenes/caja-registradora-abrir.png",
      responsable: "Encargado"
    },
    {
      id: "1",
      nombre: "Cerrar Caja",
      clave: "cerrar-caja",
      path: "/cerrarcaja",
      img: "assets/imagenes/caja-registradora-cerrar.png",
      responsable: "Encargado"
    },
    {
      id: "2",
      nombre: "Generar Movimiento Caja",
      clave: "generar-movimiento-caja",
      path: "/generarmovimientocaja",
      img: "assets/imagenes/movimiento-caja.png",
      responsable: "Encargado"
    },
    {
      id: "3",
      nombre: "Reasignar Mozo a Estadia",
      clave: "reasignar-mozo-a-estadia",
      path: "/reasignarmozoaestadia",
      img: "assets/imagenes/camarero.png",
      responsable: "Encargado"
    },
    {
      id: "4",
      nombre: "Habilitar/Deshabilitar Producto",
      clave: "habilitar-deshabilitar-producto",
      path: "/habilitar-deshabilitar-producto",
      img: "assets/imagenes/producto.png",
      responsable: "Encargado"
    },
    {
      id: "5",
      nombre: "Anular Pedido",
      clave: "anular-pedido",
      path: "/search_anular_pedido",
      img: "assets/imagenes/menu-promocion.png",
      responsable: "Encargado"
    },
    {
      id: "6",
      nombre: "Gestionar Estado Estadia",
      clave: "gestionar-estado-estadia",
      path: "/search_gestionar_estado_estadia",
      img: "assets/imagenes/cena.png",
      responsable: "Encargado"
    }
  ];
  private cocinero: IconoHome[] = [
    {
      id: "0",
      nombre: "Actualizar Comanda Cocina",
      clave: "actualizar-comanda-cocina",
      path: "/search_actualizar_comanda_cocina",
      img: "assets/imagenes/comida-y-restaurante.png",
      responsable: "Cocinero"
    }
  ];

  constructor() {}

  getIconosHome(): IconoHome[] {
    return this.iconos;
  }
  getIconosEncargado(): IconoHome[] {
    return this.encargado;
  }
  getIconosCocinero(): IconoHome[] {
    return this.cocinero;
  }
  getIconoHomeParticular(idx: number): IconoHome {
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
