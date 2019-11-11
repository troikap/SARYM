import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ajustarPalabra'
})
export class AjustarPalabraPipe implements PipeTransform {

  transform(palabra: string, largo: number): string {
    let texto_return = "";
    let sumaLargo = 0;
    let palabraArray  = palabra.split(" ");
    
    let i = 0;
    for (palabra of palabraArray) {
      sumaLargo += palabra.length;

      if (sumaLargo <= largo) {
        texto_return += palabra + " ";
        sumaLargo ++; // Sumo uno más porque agrego un espacio
      }
      else {
        if (i != 0) {
          texto_return += "<br>" + palabra + " ";
        }
        else {
          texto_return += palabra + " ";
        }
        sumaLargo = 0;
      } 
      i++;
    }
    return texto_return;
  }
}
