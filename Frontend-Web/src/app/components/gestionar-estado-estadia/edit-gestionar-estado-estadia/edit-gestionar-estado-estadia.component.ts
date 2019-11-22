import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MozoEstadiaService } from '../../../services/mozo-estadia/mozo-estadia';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: "app-edit-gestionar-estado-estadia",
  templateUrl: "./edit-gestionar-estado-estadia.component.html",
  styleUrls: ["./edit-gestionar-estado-estadia.component.scss"]
})
export class EditGestionarEstadoEstadiaComponent implements OnInit {
  form: FormGroup;
  private idEstadia: number;
  private estadia: any;
  private newForm = {};
  private listaMesas: any[] = [];
  private listaNumerosMesa: any[] = [];
  private estadosEstadia: any[] = [];
  private date: string;
  private listaComensales: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private mozoEstadiaServicio: MozoEstadiaService,
    private pedidoServicio: PedidoService,
    private datePipe: DatePipe
  ) {
    this.form = new FormGroup({
      cantPersonas: new FormControl({ value: "", disabled: true }),
      mesa: new FormControl({ value: "", disabled: true }),
      fechaYHoraInicioEstadia: new FormControl({ value: "", disabled: true }),
      mozoEstadia: new FormControl({ value: "", disabled: true }),
      estadoEstadia: new FormControl({ value: "", disabled: true }),
      comensales: new FormControl({ value: "", disabled: true })
    });

    this.activatedRoute.params.subscribe(params => {
      this.idEstadia = params.id;
      this.traerEstadia();
    });
  }

  ngOnInit() {}

  traerEstadia() {
    this.mozoEstadiaServicio.getEstadia(this.idEstadia).then((data: any) => {
      // Llamo a un Observer
      if (data != null) {
        this.estadia = data.data;
        this.listaMesas = this.estadia["detalleestadiamesas"];
        var length = this.listaMesas.length;
        for (let i = 0; i < length; i++) {
          this.listaNumerosMesa.push(
            this.estadia["detalleestadiamesas"][i].mesa.nroMesa
          );
        }
        var lengthcomensales = this.estadia["comensals"].length;
        for (let i = 0; i < lengthcomensales; i++) {
          this.listaComensales.push(this.estadia["comensals"][i].aliasComensal);
        }
        this.date = this.estadia["fechaYHoraInicioEstadia"];
        this.newForm = {
          cantPersonas: this.estadia["cantPersonas"],
          mesa: this.listaNumerosMesa.join(),
          fechaYHoraInicioEstadia: this.datePipe.transform(
            this.date,
            "dd/MM/yyyy HH:mm"
          ),
          mozoEstadia:
            this.estadia["mozoestadium"].usuario.nombreUsuario +
            " " +
            this.estadia["mozoestadium"].usuario.apellidoUsuario,
          estadoEstadia: this.estadia["estadiaestados"][0].estadoestadium
            .nombreEstadoEstadia,
          comensales: this.listaComensales.join()
        };

        this.form.setValue(this.newForm);
      }
    });
  }

  reemplazarEstadia(): any {
    let rempEstadia: any = {
      idEstadia: this.idEstadia,
      idEstadoEstadia: 3,
      descripcionEstadiaEstado: "anulacion de Estadia por parte del encargado"
    };
    return rempEstadia;
  }

  guardar() {
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea anular la estadia seleccionada?`;

    ($ as any).confirm({
      title: titulo,
      content: mensaje,
      type: "blue",
      typeAnimated: true,
      theme: "material",
      buttons: {
        aceptar: {
          text: "Aceptar",
          btnClass: "btn-blue",
          action: function() {
            let estadia = _this.reemplazarEstadia();

            if (estadia != null) {
              _this.mozoEstadiaServicio
                .updateEstadoEstadia(estadia)
                .then(response => {
                  const titulo = "Éxito";
                  const mensaje = "Se ha modificado la estadia de forma exitosa";
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
                          _this.estadia["pedidos"].forEach(item => {
                            let rempPedido: any = {
                              idPedido: item.idPedido,
                              idEstadoPedido: 7,
                              descripcionPedidoEstado:
                                "anulacion de Pedido por anulacion de Estadia"
                            };
                            if (
                              item["pedidoestados"][0].estadopedido.idEstadoPedido == 3 ||
                              item["pedidoestados"][0].estadopedido.idEstadoPedido == 4 ||
                              item["pedidoestados"][0].estadopedido.idEstadoPedido == 5
                            ) {
                              _this.pedidoServicio
                                .updatePedidoEstado(rempPedido)
                                .then(response => {});
                            }
                          });
                          _this.router.navigate(["/search_gestionar_estado_estadia/"]);
                        }
                      }
                    }
                  });
                });
            }
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
