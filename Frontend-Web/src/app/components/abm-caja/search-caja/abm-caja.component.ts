import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CajaService } from "../../../services/caja/caja.service";

@Component({
  selector: "app-abm-caja",
  templateUrl: "./abm-caja.component.html",
  styleUrls: ["./abm-caja.component.scss"]
})
export class AbmCajaComponent implements OnInit {
  listaCaja: any = [];
  listaEstadoCaja: any = [];

  constructor(private cajaService: CajaService, private router: Router) {}

  ngOnInit() {
    this.getAllCaja();
    this.getAllEstadoCaja();
    this.cargarOnFocus();
  }
  cargarOnFocus() {
    $("#botonBuscar").focus();
  }

  buscarCaja(termino: string) {
    if (termino !== "") {
      this.cajaService.getCajasByAll(termino).subscribe((data: any) => {
        // Llamo a un Observer
        if (data != null) {
          this.listaCaja = data;
        } else {
          this.listaCaja = [];
        }
      });
    } else {
      this.getAllCaja();
    }
  }

  getAllCaja() {
    this.cajaService.getCajas().then((res: any) => {
      this.listaCaja = res.data;
    });
  }

  getAllEstadoCaja() {
    this.cajaService.getEstadosCaja().then((res: any) => {
      this.listaEstadoCaja = res.data;
    });
  }

  abmCaja(idElemento: number, accion: string) {
    this.router.navigate([`/caja_edit/${idElemento}/${accion}`]);
  }
  crearCaja() {
    let _this = this;
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea crear el elemento seleccionado?`;
    ($ as any).confirm({
      title: titulo,
      content: "¿Confirma la creación de un nuevo registro?",
      type: "blue",
      typeAnimated: true,
      theme: "material",
      buttons: {
        aceptar: {
          text: "Aceptar",
          btnClass: "btn-blue",
          action: function() {
            let nuevaCaja: any = {
              idUsuario: localStorage.getItem("idUsuario")
            };
            _this.cajaService.setCaja(nuevaCaja).then(response => {
              if (response.tipo !== 2) {
                //TODO CORRECTO
                const titulo = "Éxito";
                const mensaje =
                  "Se ha creado un nuevo registro de caja de forma exitosa";

                ($ as any).confirm({
                  title: titulo,
                  content: mensaje,
                  type: "green",
                  typeAnimated: true,
                  theme: "material",
                  buttons: {
                    aceptar: {
                      text: "Aceptar",
                      btnClass: "btn-green",
                      action: function() {
                        location.reload();
                      }
                    }
                  }
                });
              } else {
                ($ as any).confirm({
                  title: "Error",
                  content: `${response.title}. No es posible realizar esta acción`,
                  type: "red",
                  typeAnimated: true,
                  theme: "material",
                  buttons: {
                    aceptar: {
                      text: "Aceptar",
                      btnClass: "btn-red",
                      action: function() {}
                    }
                  }
                });
              }
            });
          }
        },
        cerrar: {
          text: "Cerrar",
          action: function() {}
        }
      }
    });
  }
}
