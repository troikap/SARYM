import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
import { AlertController, Events } from '@ionic/angular';
// import { AuthenticationService } from 'src/services/authentication/authentication.service';
// import { LoaderHelper } from 'src/helpers/loader-helper/loader-helper';
// import { UserService } from 'src/services/user/user';
// import { IUser } from 'src/models/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  appName = '';
  // signInForm: {
  //   username: string,
  //   password: string
  // } = {password: '', username: ''}

  constructor(
    private router: Router,
    // private translateService: TranslateService,
    private alertCtrl: AlertController,
    // private authService: AuthenticationService,
    // private loaderHelper: LoaderHelper,
    // private userService: UserService,
    private events: Events
    ) { }

  ngOnInit() {
  }

  // signIn() {
  //   this.loaderHelper.show();
  //   this.authService.signIn({user: this.signInForm.username, password: this.signInForm.password})
  //   .then((user: IUser) => {
  //     this.events.publish('initPushNotification', user); 
  //     this.userService.saveUser({user: user}).then(() => {
  //       this.goTo('menu');
  //     });
  //     this.loaderHelper.hide();
  //   }, error => {
  //     this.loaderHelper.hide();
  //     console.error(error);
  //     this.alertCtrl.create({
  //       header: 'Error',
  //       message: error
  //     }).then((alert) => {
  //       alert.present();
  //     });
  //   }).catch((err) => {
  //     this.loaderHelper.hide();
  //     console.error(err);
  //   });
  // }

  // goTo(key: string) {
  //   let page;
  //   switch (key) {
  //     case 'sign-up':
  //       page =  '/sign-up';
  //       break;
  //     case 'menu':
  //       page =  '/tabs/timeline';
  //       break;
  //   }
  //   const navExtras: NavigationExtras = {}
  //   this.router.navigate([page], { replaceUrl: true });
  // }


  // async showRecoveryPassword() {
  //   const title = this.translateService.instant('SIGN_IN.RECOVERY_PASSWORD')
  //   const message = this.translateService.instant('SIGN_IN.ENTRY_USERNAME')
  //   const placehold_username = this.translateService.instant('SIGN_IN.PLACEHOLDER.USERNAME')
  //   const cancel_button = this.translateService.instant('SIGN_IN.CANCEL_BUTTON')
  //   const recovery_button = this.translateService.instant('SIGN_IN.RECOVERY_BUTTON')   

  //   const prompt = await this.alertCtrl.create({
  //     header: title,
  //     message: message,
  //     cssClass: "alert-custom",
  //     inputs: [
  //       {
  //         name: 'username',
  //         placeholder: placehold_username
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: cancel_button,
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: recovery_button,
  //         cssClass: 'alert-button-primary',
  //         handler: data => {
  //           this.authService.forgotPassword({username: data['username']})
  //             .then(response => {
  //               this.showAlert(response.message);   
  //             }, error => console.log).catch(console.log);
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

  // async showAlert(message) {
  //   const ok_button = this.translateService.instant('COMMON.OK')

  //   const alert = await this.alertCtrl.create({
  //     message: message,
  //     buttons: [ok_button]
  //   });

  //   alert.present();
  // }
}
