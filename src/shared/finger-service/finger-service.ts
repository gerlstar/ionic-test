import {FingerprintAIO, FingerprintOptions} from '@ionic-native/fingerprint-aio';
import { Injectable } from '@angular/core';
import {LoginSuccessPage} from "../../pages/login-success/login-success";
import {NavController, NavParams, App,Platform} from 'ionic-angular';

@Injectable()
export class FingerService{
    fingerprintOptions: FingerprintOptions;
    nav: NavController;

    constructor(private app:App, private fingerAuth: FingerprintAIO) {
        console.log('Hello FingerAuthComponent Component');
        // this.nav = nav;
        // this.nav = app.getActiveNav();
    }

    public showFingerprintAuthDlg() {
        this.fingerprintOptions = {
            clientId: 'fingerprint-Demo',
            clientSecret: 'password', //Only necessary for Android
            disableBackup: true  //Only for Android(optional)
        }
        return this.fingerAuth.isAvailable().then(result => {
            if (result === "OK") {
                return this.fingerAuth.show(this.fingerprintOptions)
                    .then((result: any) => {
                        console.log(result);
                        alert('success')

                        return result.withFingerprint;

                    })
                    .catch((error: any) => {
                        console.log(error);
                        alert('error!')
                        // alert(JSON.stringify(error));
                        alert(JSON.stringify(error, Object.getOwnPropertyNames(error)));
                    });
            }else{
                return false;
            }
        });
    }
}