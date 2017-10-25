import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfilePage} from "../../pages/profile/profile";
/**
 * Generated class for the LoginSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-success',
  templateUrl: 'login-success.html',
})
export class LoginSuccessPage {

  constructor(public nav: NavController, public navParams: NavParams) {
    this.nav = nav;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginSuccessPage');
  }

  goProfile(){
      this.nav.push(ProfilePage);
  }

}
