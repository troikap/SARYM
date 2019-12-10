import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MozoEstadiaService } from '../../../services/mozo-estadia/mozo-estadia';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { DatePipe } from '@angular/common';
import { MesaService } from 'src/app/services/mesa/mesa.service';

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
    private mesaServicio: MesaService,
    private datePipe: DatePipe
  ) {
    this.form = new FormGroup({
      idEstadia: new FormControl({ value: "", disabled: true }),
      cantPersonas: new FormControl({ value: "", disabled: true }),
      mesa: new FormControl({ value: "", disabled: true }),
      fechaYHoraInicioEstadia: new FormControl({ value: "", disabled: true }),
      mozoEstadia: new FormControl({ value: "", disabled: true }),
      estadoEstadia: new FormControl({ value: "", disabled: true }),
      comensales: new FormControl({ value: "", disabled: true }),
      descripcionCambioEstado: new FormControl('', Validators.required)
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
          idEstadia: this.estadia.idEstadia,
          cantPersonas: this.estadia["cantPersonas"],
          mesa: this.listaNumerosMesa.join(),
          fechaYHoraInicioEstadia: this.datePipe.transform(
            this.date,
            "dd/MM/yyyy HH:mm"
          ),
          mozoEstadia:
            this.estadia["mozoestadia"][0].usuario.nombreUsuario +
            " " +
            this.estadia["mozoestadia"][0].usuario.apellidoUsuario,
          estadoEstadia: this.estadia["estadiaestados"][0].estadoestadium
            .nombreEstadoEstadia,
          comensales: this.listaComensales.join(),
          descripcionCambioEstado: ""
        };

        this.form.setValue(this.newForm);
      }
    });
  }

  reemplazarEstadia(): any {
    let rempEstadia: any = {
      idEstadia: this.idEstadia,
      idEstadoEstadia: 3,
      descripcionEstadiaEstado: this.form.value['descripcionCambioEstado']
    };
    return rempEstadia;
  }

  async guardar() {
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea anular la estadia seleccionada?`;

    await ($ as any).confirm({
      title: titulo,
      content: mensaje,
      type: "orange",
      typeAnimated: true,
      theme: "material",
      buttons: {
        aceptar: {
          text: "Aceptar",
          btnClass: "btn-orange",
          action: async function() {
            let estadia = _this.reemplazarEstadia();

            if (estadia != null) {
              await _this.mozoEstadiaServicio
                .updateEstadoEstadia(estadia)
                .then(async response => {
                  const titulo = "Éxito";
                  const mensaje = "La estadía ha sido finalizada de forma exitosa.";
                  await ($ as any).confirm({
                    title: titulo,
                    content: mensaje,
                    type: "green",
                    typeAnimated: true,
                    theme: "material",
                    buttons: {
                      aceptar: {
                        text: "Aceptar",
                        btnClass: "btn-green",
                        action: async function() {
                         await  _this.actualizarEstadoPedidos();
                         await _this.actualizarEstadoMesas();

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

  async actualizarEstadoPedidos() {
    await this.estadia["pedidos"]
    .forEach(async item => {
      let rempPedido: any = {
        idPedido: item.idPedido,
        idEstadoPedido: 7,
        descripcionPedidoEstado: "Anulacion de Pedido por anulacion de Estadia"
      };
      if (
        item["pedidoestados"][0].estadopedido.idEstadoPedido == 3 ||
        item["pedidoestados"][0].estadopedido.idEstadoPedido == 4 ||
        item["pedidoestados"][0].estadopedido.idEstadoPedido == 5
      ) {
        await this.pedidoServicio.updatePedidoEstado(rempPedido)
          .then(response => {
            console.log(`Cambio de estado de Pedido ID: ${item.idPedido}, a Finalizado sin Pago`);
          });
      }
    });
  }

  async actualizarEstadoMesas() {
    for (let mesa of this.estadia.detalleestadiamesas) {
      let pathMesa = {}
      pathMesa['idMesa'] = mesa.idMesa;
      pathMesa['idEstadoMesa'] = 2;
      await this.mesaServicio.updateMesaEstado(pathMesa)
      .then(resp => {
        console.log(`Cambio de estado de la mesa ID: ${mesa.idMesa}, a Disponible`);
      });
    }
  }
}
