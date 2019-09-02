import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { UserService } from 'src/services/user/user';
import { Router } from '@angular/router';
// import { LoaderHelper } from 'src/helpers/loader-helper/loader-helper';
// import * as CustomValidator from '../../utils/custom-validators.util';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signUpForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    // private userService: UserService,
    private router: Router,
    // private loaderHelper: LoaderHelper,
    private alertCtrl: AlertController
    ) {
    // this.signUpForm = this.formBuilder.group({ 
    //   email: ['', Validators.compose([Validators.required, Validators.email])],
    //   firstname: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(2)])],
    //   lastname: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(2)])],
    //   birthdate: [''],
    //   phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
    //   username: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(2)])],
    //   password_group: new FormGroup({
    //     password: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(2)])),
    //     repeat_password: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(2)]))
    //   }, {validators: CustomValidator.equalValidator({first_control_name: 'password', second_control_name: 'repeat_password'})})
    // });
  }

  ngOnInit() {

  }

  signUp() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }

    // this.loaderHelper.show();
    const formData = {
      email: this.signUpForm.get('email').value,
      phone: this.signUpForm.get('phone').value,
      lastName: this.signUpForm.get('lastname').value,
      firstName: this.signUpForm.get('firstname').value,
      username: this.signUpForm.get('username').value,
      password: this.signUpForm.get('password_group').get('password').value
    };
  };

    // if (this.signUpForm.get('birthdate').value) {
    //   formData['birthdate'] = this.signUpForm.get('birthdate').value;
    // }

  //   this.userService.registerMember(formData)
  //     .then((data) => {
  //       this.loaderHelper.hide();
  //       if (data) {
  //         this.goTo('menu');
  //       }
  //     }, error => {
  //       this.loaderHelper.hide();
  //       console.error(error);
  //       this.alertCtrl.create({
  //         header: 'Error',
  //         message: error
  //       }).then((alert) => {
  //         alert.present();
  //       });
  //     }).catch((err) => {
  //       this.loaderHelper.hide();
  //       console.error(err);
  //     })
  // }

  // goTo(key: string) {
  //   let page;
  //   switch (key) {
  //     case 'sign-in':
  //       page = 'sign-in';
  //       break;
  //     case 'menu':
  //       page = '/tabs/timeline';
  //   }

  //   this.router.navigateByUrl(page);
  // }
 }
