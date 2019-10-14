import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-ionic',
  templateUrl: './ionic.page.html',
  styleUrls: ['./ionic.page.scss'],
})
export class IonicPage implements OnInit {

  constructor(private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Menu',
      animated: true,
      backdropDismiss: true,
      //mode: 'ios',
      subHeader: 'Opciones',
      translucent: true,
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        cssClass: 'rojo',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


}
