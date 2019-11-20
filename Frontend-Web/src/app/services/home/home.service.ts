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
      nombreFuncion: "Consulta Usuario"
    },
    {
      id: "1",
      nombre: "ABM Tipo Moneda",
      clave: "abm-tipomoneda",
      path: "/tipomoneda",
      img: "assets/imagenes/tipo-moneda.png",
      nombreFuncion: "Consulta Tipo Moneda"
    },
    {
      id: "2",
      nombre: "ABM Unidad Medida",
      clave: "abm-unidadmedida",
      path: "/unidadmedida",
      img: "assets/imagenes/unidad-medida.png",
      nombreFuncion: "Consulta Unidad Medida"
    },
    {
      id: "3",
      nombre: "ABM Caja",
      clave: "abm-caja",
      path: "/caja",
      img: "assets/imagenes/caja.png",
      nombreFuncion: "Consulta Caja"
    },
    {
      id: "4",
      nombre: "ABM Mesa",
      clave: "abm-mesa",
      path: "/mesa",
      img: "assets/imagenes/config_general.png",
      nombreFuncion: "Consulta Mesa"
    },
    {
      id: "5",
      nombre: "ABM Rubro",
      clave: "abm-rubro",
      path: "/rubro",
      img: "assets/imagenes/rubro.png",
      nombreFuncion: "Consulta Rubro"
    },
    {
      id: "6",
      nombre: "ABM Sector",
      clave: "abm-sector",
      path: "/sector",
      img: "assets/imagenes/ubicacion.png",
      nombreFuncion: "Consulta Sector"
    },
    {
      id: "7",
      nombre: "Gestionar Producto",
      clave: "gestionar-producto",
      path: "/producto",
      img: "assets/imagenes/producto.png",
      nombreFuncion: "Consulta Producto"
    },
    {
      id: "8",
      nombre: "Gestionar Menu Promocion",
      clave: "gestionar-menupromocion",
      path: "/menupromocion",
      img: "assets/imagenes/menu-promocion.png",
      nombreFuncion: "Consultar Menu-Promocion"
    },
    {
      id: "9",
      nombre: "Generar Reporte",
      clave: "generar-reporte",
      path: "/reporte",
      img: "assets/imagenes/reportes.png",
      nombreFuncion: "Generar Reporte"
    },
    {
      id: "10",
      nombre: "Generar Backup",
      clave: "backup",
      path: "/backup",
      img: "assets/imagenes/backup.png",
      nombreFuncion: "Gestionar Backup"
    },
    {
      id: "11",
      nombre: "ABM Rol",
      clave: "abm-rol",
      path: "/rol",
      img: "assets/imagenes/rol.png",
      nombreFuncion: "Consulta Rol"
    },
    {
      id: "12",
      nombre: "Abrir Caja",
      clave: "abrir-caja",
      path: "/abrircaja",
      img: "assets/imagenes/caja-registradora-abrir.png",
      nombreFuncion: "Consulta Abrir Caja"
    },
    {
      id: "13",
      nombre: "Cerrar Caja",
      clave: "cerrar-caja",
      path: "/cerrarcaja",
      img: "assets/imagenes/caja-registradora-cerrar.png",
      nombreFuncion: "Consulta Cerrar Caja"
    },
    {
      id: "14",
      nombre: "Generar Movimiento Caja",
      clave: "generar-movimiento-caja",
      path: "/generarmovimientocaja",
      img: "assets/imagenes/movimiento-caja.png",
      nombreFuncion: "Consultar movimiento de caja"
    },
    {
      id: "15",
      nombre: "Reasignar Mozo a Estadia",
      clave: "reasignar-mozo-a-estadia",
      path: "/reasignarmozoaestadia",
      img: "assets/imagenes/camarero.png",
      nombreFuncion: "Consulta Mozo-Estadia"
    },
    {
      id: "16",
      nombre: "Habilitar/Deshabilitar Producto",
      clave: "habilitar-deshabilitar-producto",
      path: "/habilitar-deshabilitar-producto",
      img: "assets/imagenes/producto.png",
      nombreFuncion: "Consulta Habilitar-Deshabilitar Producto"
    },
    {
      id: "17",
      nombre: "Anular Pedido",
      clave: "anular-pedido",
      path: "/search_anular_pedido",
      img: "assets/imagenes/menu-promocion.png",
      nombreFuncion: "Consulta Anular Pedido"
    },
    {
      id: "18",
      nombre: "Gestionar Estado Estadia",
      clave: "gestionar-estado-estadia",
      path: "/search_gestionar_estado_estadia",
      img: "assets/imagenes/cena.png",
      nombreFuncion: "Consulta de Gestion de Estado-Estadia"
    },
    {
      id: "19",
      nombre: "Actualizar Comanda Cocina",
      clave: "enviar-pedido",
      path: "/enviar_pedido",
      img: "assets/imagenes/comida-y-restaurante.png",
      nombreFuncion: "Enviar Pedido (Comanda Cocina)'"
    }
  ];

  constructor() { }

  getIconosHome(): IconoHome[] {
    let iconosHabilitados: IconoHome[] = [];
    let lista = localStorage.getItem("FuncionesRol");
    let funcionesRecuperadas = JSON.parse(lista);

    for (let itemIcono of this.iconos) {
      for (let itemFuncionesRecuperadas of funcionesRecuperadas) {
        if (itemIcono.nombreFuncion == itemFuncionesRecuperadas) {
          iconosHabilitados.push(itemIcono);
        }
      }
    }
    return iconosHabilitados;
  }
}

export interface IconoHome {
  id: string;
  nombre: string;
  clave: string;
  path: string;
  img: string;
  nombreFuncion: string;
}
