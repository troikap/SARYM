import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  private idReserva: number;

  constructor(
    private navParams: NavParams
  ) {
    this.navParams.get('')
   }

  ngOnInit() {
    
  }

}
