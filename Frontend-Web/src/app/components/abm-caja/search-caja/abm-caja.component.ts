import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CajaService } from '../../../services/caja/caja.service';



@Component({
  selector: 'app-abm-caja',
  templateUrl: './abm-caja.component.html',
  styleUrls: ['./abm-caja.component.css']
})
export class AbmCajaComponent implements OnInit {

  listaCaja: any = [];
  listaEstadoCaja: any = [];  
  

  constructor(
    // private unidadMedia: UnidadMedida, //Da error
    private cajaService :CajaService,    
    private router: Router,

  ) { }

  ngOnInit() {
    this.getAllCaja();   
    this.getAllEstadoCaja();
    this.cargarOnFocus();   
  }
  cargarOnFocus() {
    $("#botonBuscar").focus();
  }


  buscarCaja(termino: string) {
    
    console.log(termino);

    if (termino !== "") {
      this.cajaService.getCajasByAll(termino)
      .subscribe((data: any) => { // Llamo a un Observer
        console.log(data);
        if (data != null) {
          console.log("RESULT ----------------->", data);
          this.listaCaja = data;          
        }else{
          this.listaCaja =[];
        }
      });
    }
    else {
      this.getAllCaja();
    }
  }

  getAllCaja() {    
    this.cajaService.getCajas()
      .then((res: any) => {
       
        this.listaCaja =  res.data;         
        console.log(res); 
      })

  }

  getAllEstadoCaja() {
    this.cajaService.getEstadosCaja()
      .then((res: any) => {
        //console.log(res);
        this.listaEstadoCaja =  res.data;
      })

  }
  

  abmCaja(idElemento: number, accion: string) {
    console.log("idElemento: ", idElemento);
    console.log("accion: ", accion);   

  this.router.navigate( [`/caja_edit/${idElemento}/${accion}`] );

  }
  crearCaja(){
    let _this = this;
    const titulo = "Confirmación";
    const mensaje = `¿Está seguro que desea crear el elemento seleccionado?`;
      
    ($ as any).confirm({
      title: titulo,
      content: "¿Confirma la creación de un nuevo registro?",
      type: 'blue',
      typeAnimated: true,
      theme: 'material',
      buttons: {
          aceptar: {
              text: 'Aceptar',
              btnClass: 'btn-blue',
              action: function(){
                let nuevaCaja: any = {       
                  idUsuario: localStorage.getItem("idUsuario")
                  
                }               
           
                
                _this.cajaService.setCaja( nuevaCaja )
                .then( (response) => {
                  
                  if (response.tipo !== 2) { //TODO CORRECTO

                    console.log("CREADO", response);
                  
                    const titulo = "Éxito";
                    const mensaje = "Se ha creado un nuevo registro de caja de forma exitosa";
                  
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
                              action: function(){
            
                                //ACCION
                                location.reload();
            
                              }
                          }
                      }
                    });




                  }
                  else {
                    console.log("ERROR", response);
                    
                    ($ as any).confirm({
                      title: "Error",
                      content: `${response.title}. No es posible realizar esta acción`, 
                      type: 'red',
                      typeAnimated: true,
                      theme: 'material',
                      buttons: {
                          aceptar: {
                              text: 'Aceptar',
                              btnClass: 'btn-red',
                              action: function(){
                                console.log("Mensaje de error aceptado");
                              }
                          }
                      }
                    });
                    



                  }

                  
          
                  
                })




              }
          },
          cerrar: {
            text: 'Cerrar',
            action: function(){
              console.log("Creación Cancelada");
            }
        }
      }
    });
    
    
  
   

  }

}
