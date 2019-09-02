import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.page.html',
  styleUrls: ['./card-page.page.scss'],
})
export class CardPagePage implements OnInit {

image: SafeResourceUrl;

  ngOnInit() { }

  constructor( private camera: Camera ) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log("este es la base 64:  ",base64Image)
     }, (err) => {
      // Handle error
      console.log("La camara largo un error ",err)
     }
   );
  }

  async takePhoto(){
    const result = await this.camera.getPicture();
    this.image = result;
    console.log('SACO FOTO '+ result)
  }
  
  
}
