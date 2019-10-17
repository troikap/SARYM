import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform( images: any ): string {
    
    // console.log("pathImagen: ", images);

    if ( !images ) {
      return 'assets/imagenes/logo-sarym.png';
    }
    if ( images.length > 0 ) {
      return images;
    } else {
      return 'assets/imagenes/logo-sarym.png';
    }

  }

}
