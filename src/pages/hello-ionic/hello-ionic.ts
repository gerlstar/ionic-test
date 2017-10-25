import {Component} from '@angular/core';
import {FingerService} from "../../shared/finger-service/finger-service";
import {Platform} from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';
import {LoginSuccessPage} from "../../pages/login-success/login-success";
// import {FingerprintAIO, FingerprintOptions} from '@ionic-native/fingerprint-aio';

@Component({
    selector: 'page-hello-ionic',
    templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
    constructor(private fingerService: FingerService, private platform: Platform, public nav: NavController,
                public navParams: NavParams) {
        this.nav = nav;
    }

    async showAuth() {
        try {
            await this.platform.ready();

            const s = this.fingerService.showFingerprintAuthDlg();
            s.then(result => {

                if (!result){
                    console.error(result);
                    alert('finger print cancelled')
                    alert(result);
                }else{
                    alert('finger print success')
                    alert(result);
                    this.nav.push(LoginSuccessPage);
                }

                // alert(JSON.stringify(result, Object.getOwnPropertyNames(result)));
            });

        } catch (e) {
            console.error(e);
        }


    }
}
