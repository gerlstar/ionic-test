import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../shared/auth-service/auth-service";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit{

    isLoggedIn = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthService) {
      // this.navCtrl.pop();
      // this.isLoggedIn = this.authService.isLoggedIn();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfilePage');
  }

  ngOnInit(){
      // alert("profile on int");
      this.isLoggedIn = this.authService.isLoggedIn();
  }


}
