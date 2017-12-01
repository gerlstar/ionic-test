import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../shared/auth-service/auth-service";
import {KeychainService} from '../../shared/keychain-service/keychain-service';

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
export class ProfilePage implements OnInit {

    isLoggedIn = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService,
                private keyChain: KeychainService) {
        // this.navCtrl.pop();
        // this.isLoggedIn = this.authService.isLoggedIn();
    }

    ionViewCanEnter() {
        const loggedInWithFingerPrint = this.keyChain.getHasKeychain();
        const isLoggedIn = this.authService.isLoggedIn();
        // alert('isLoggedin ='  + isLoggedIn);
        // alert('loggedInWithFingerPrint ='  + loggedInWithFingerPrint);
        if (loggedInWithFingerPrint || isLoggedIn) {
            return true;
        } else {
            return false;
        }
    }

    ngOnInit() {
        // alert("profile on int");
        this.isLoggedIn = this.authService.isLoggedIn();
    }


}
