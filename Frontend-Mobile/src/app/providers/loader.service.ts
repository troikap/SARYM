import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(public loadingController: LoadingController) {}

  async presentLoading( message?: string , duration?: number) {
    const loading = await this.loadingController.create({
      message: message,
      duration: duration
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
}



// import { Injectable } from "@angular/core";
// import { LoadingController } from '@ionic/angular';



// @Injectable()
// export class LoaderService {
//   public static loader;
//   public static loaderFull;

//   constructor(private loadingController: LoadingController) { }

//   public show(options?: { timeout?: number, message?: string }) {
//     let message = "";
//     if (options != undefined && options.message != undefined) {
//       message = options.message;
//     }
//     if (LoaderService.loader == undefined || LoaderService.loader == null) {
//       LoaderService.loader = this.loadingController.create({
//         message: message,
//       });

//       LoaderService.loader.present().then(() => {
//         if (options != undefined && options.timeout != undefined) {
//           setTimeout(function () {
//             LoaderService.loader.dismiss().then(() => {
//               LoaderService.clearLoader();
//             }).catch(() => LoaderService.clearLoader());
//           }, options.timeout)
//         }
//       });
//     }
//   }

//   public hide() {
//     return new Promise((resolve, reject) => {
//       if (LoaderService.loader) {
//         LoaderService.loader.dismiss().then(() => {
//           LoaderService.clearLoader();
//           resolve();
//         }).catch(() => LoaderService.clearLoader());
//       }
//       if (LoaderService.loaderFull) {
//         LoaderService.loaderFull.dismiss().then(() => {
//           LoaderService.clearLoader();
//           resolve();
//         }).catch(() => LoaderService.clearLoader());
//       } else {
//         resolve();
//       }
//     })
//   }

//   private static clearLoader() {
//     LoaderService.loader = null;
//     LoaderService.loaderFull = null;
//   }

//   public showFull() {
//     if (LoaderService.loader == undefined || LoaderService.loader == null) {
//       LoaderService.loaderFull = this.loadingController.create({
//         spinner: 'bubbles',
//         cssClass: 'logo-spinner-loader',
//         message: `
//           <div class="logo-spinner-container">
//             <div class="logo-spinner-box">
//               <img src="assets/imgs/logo-mercosur.png" />
//             </div>
//           </div>`
//       });

//       LoaderService.loaderFull.present();
//     }
//   }

// }
