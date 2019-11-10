import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MozoEstadiaService } from '../../../services/mozo-estadia/mozo-estadia';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-edit-gestionar-estado-estadia',
  templateUrl: './edit-gestionar-estado-estadia.component.html',
  styleUrls: ['./edit-gestionar-estado-estadia.component.scss']
})
export class EditGestionarEstadoEstadiaComponent implements OnInit {

  form: FormGroup;
  private idEstadia: number;
  private estadia: any;
  private newForm = {};
  private listaMesas: any[] =[];
  private listaNumerosMesa: any[]=[];
  private estadosEstadia: any[]=[];
  private date: string;
  private listaComensales: any[]=[]


  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private mozoEstadiaServicio: MozoEstadiaService,
    private pedidoServicio: PedidoService,
    private datePipe: DatePipe
  ) {
    this.form = new FormGroup({
      'cantPersonas': new FormControl({ value: '', disabled: true }),
      'mesa': new FormControl({ value: '', disabled: true }),      
      'fechaYHoraInicioEstadia': new FormControl({ value: '', disabled: true}),
      'mozoEstadia': new FormControl({ value: '', disabled: true}),  
      'estadoEstadia':new FormControl({ value: '', disabled: true}),
      'comensales':new FormControl({ value: '', disabled: true})
    });

    this.activatedRoute.params.subscribe(params => {
      console.log("PAREMTROS DE URL", params);
      this.idEstadia = params.id;
      
        this.traerEstadia();
      
    });
  }

  ngOnInit() {   
  }


  traerEstadia() {
   
      this.mozoEstadiaServicio.getEstadia(this.idEstadia)
        .then((data: any) => { // Llamo a un Observer
          if (data != null) {
            this.estadia = data.data;
            console.log(this.estadia);
            console.log("estas son las mesas",this.estadia.detalleestadiamesas);
            this.listaMesas = this.estadia['detalleestadiamesas'];
            var length = this.listaMesas.length;
            for (let i = 0; i < length; i++) {
              console.log(this.estadia['detalleestadiamesas'][i].mesa.nroMesa);
              this.listaNumerosMesa.push(this.estadia['detalleestadiamesas'][i].mesa.nroMesa)
            }
            var lengthcomensales = this.estadia['comensals'].length;
            for (let i = 0; i < lengthcomensales; i++) {
              console.log(this.estadia['comensals'][i].aliasComensal);
              this.listaComensales.push(this.estadia['comensals'][i].aliasComensal)
            }
            this.date = this.estadia['fechaYHoraInicioEstadia'];
            console.log(this.listaNumerosMesa);
            this.newForm = {
              cantPersonas: this.estadia['cantPersonas'],                           
              mesa: this.listaNumerosMesa.join(),
              fechaYHoraInicioEstadia: this.datePipe.transform(this.date,'dd/MM/yyyy hh:mm:ss'), 
              mozoEstadia:this.estadia['mozoestadium'].usuario.nombreUsuario+" "+this.estadia['mozoestadium'].usuario.apellidoUsuario,
              estadoEstadia: this.estadia['estadiaestados'][0].estadoestadium.nombreEstadoEstadia,
              comensales: this.listaComensales.join()
            }

            this.form.setValue(this.newForm);
            console.log("FORM", this.form);
          }
        });
    
  }

  reemplazarEstadia(): any {
    console.log("Funcion 'reemplazarEstadia()', ejecutada");
 
      let rempEstadia: any = {
        idEstadia: this.idEstadia,
        idEstadoEstadia: 3,
        descripcionEstadiaEstado:"anulacion de Estadia por parte del encargado"   
      }
      //console.log(rempCaja);
      return rempEstadia;

    

  }

  guardar() {
    console.log(this.form);

    //Variables para mensajes//
    let _this = this; //Asigno el contexto a una variable, ya que se pierde al ingresar a la función de mensajeria
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea reasignar el mozo seleccionado?`;
               
      ($ as any).confirm({
        title: titulo,
        content: mensaje,
        type: 'blue',
        typeAnimated: true,
        theme: 'material',
        buttons: {
          aceptar: {
            text: 'Aceptar',
            btnClass: 'btn-blue',
            action: function () {
              let estadia = _this.reemplazarEstadia(); 
             
             
              if(estadia != null ){
              
                _this.mozoEstadiaServicio.updateEstadia(estadia)
                  .then((response) => {
                    console.log("ACTUALIZADO", response);

                    const titulo = "Éxito";
                    const mensaje = "Se ha modificado el mozo de forma exitosa";

                    ($ as any).confirm({
                      title: titulo,
                      content: mensaje,
                      type: 'green',
                      typeAnimated: true,
                      theme: 'material',
                      buttons: {
                        aceptar: {
                          text: 'Aceptar',
                          btnClass: 'btn-green',
                          action: function () {

                            _this.estadia['pedidos'].forEach( (item) => {
                              let rempPedido: any = {
                                idPedido: item.idPedido,
                                idEstadoPedido: 2,
                                descripcionPedidoEstado:"anulacion de Pedido por anulacion de Estadia"   
                              }
                              _this.pedidoServicio.updatePedidoEstado(rempPedido)
                              .then((response) => {

                                console.log("se actualizo el estado de Pedido", response);
                              })

                            }) 

                            _this.router.navigate(['/search_mozo_estadia/']);


                          }
                        }
                      }
                    });


                  })
              
                }

            }
          },
          cerrar: {
            text: 'Cerrar',
            action: function () {
              console.log("Edición Cancelada");
            }
          }
        }
      });



    
    
  }
  
}
