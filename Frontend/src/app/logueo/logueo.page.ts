import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logueo',
  templateUrl: './logueo.page.html',
  styleUrls: ['./logueo.page.scss'],
})
export class LogueoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goTo(key: string) {
    let page;

    switch (key) {
      case 'sign-in':
        page = '/sign-in';
        break;
      case 'sign-up':
        page = '/sign-up';
        break;
      case 'home':
        page = '/home';
        break;
    }

    this.router.navigateByUrl(page);
  }
}
