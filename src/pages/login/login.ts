import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {NavController, NavParams} from 'ionic-angular';
import {Platform} from 'ionic-angular';


import {HelloIonicPage} from '../../pages/hello-ionic/hello-ionic';
import {LoginSuccessPage} from "../../pages/login-success/login-success";
import {AuthService} from "../../shared/auth-service/auth-service";
import {KeychainService} from '../../shared/keychain-service/keychain-service';
import {FingerService} from "../../shared/finger-service/finger-service";
import { AlertController } from 'ionic-angular';
import {ProfilePage} from "../../pages/profile/profile";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})

export class LoginPage {
    ionicKey = 'IONIC_KEY';
    authForm: FormGroup;
    invalidLogin: boolean;

    constructor(private authService: AuthService, public nav: NavController, public navParams: NavParams,
                public formBuilder: FormBuilder,public alertCtrl: AlertController,
                private fingerService: FingerService, private platform: Platform,
                private keychainService: KeychainService) {

        this.nav = nav;

        // this.authForm = formBuilder.group({
        //     username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(8), Validators.maxLength(30)])],
        //     password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        // });

        this.authForm = formBuilder.group({
            email: [''],
            password: ['']
        });
    }

    ngOnInit(){
        // console.log('init login component!');
        const isLoggedIn = this.authService.isLoggedIn2();
        // console.log(isLoggedIn);
        if (isLoggedIn){
            this.nav.pop();
            // this.nav.push(ProfilePage);
        }
    }


    /**
     * Login for submit
     * @param credentials
     */
    onSubmit(credentials: any): void {
        // if(this.authForm.valid) {
        //     window.localStorage.setItem('username', value.username);
        //     window.localStorage.setItem('password', value.password);
        this.authService.login(credentials)
            .subscribe(result => {
                if (result)
                // this.router.navigate(['/login-success']);
                //     this.nav.push(LoginSuccessPage);
                    this.showAlert();
                else{
                    console.error('error logging in..');
                    this.invalidLogin = true;
                }
                // this.invalidLogin = true;
            });


        // }
    }

    /**
     * Finger auth
     * @returns {Promise<void>}
     */
    async showAuth() {
        try {
            await this.platform.ready();

            const s = this.fingerService.showFingerprintAuthDlg();
            console.info('show auth');
            // s.then(result => {
            //
            //     if (!result){
            //         console.error(result);
            //         alert('finger print cancelled')
            //         alert(result);
            //     }else{
            //         // alert('finger print success')
            //         // alert(result);
            //         this.showAlert();
            //         // this.nav.push(LoginSuccessPage);
            //     }
            //
            //     // alert(JSON.stringify(result, Object.getOwnPropertyNames(result)));
            // });

        } catch (e) {
            console.error(e);
        }
    }

    async showKeyChainAuth(){
        try{
            await this.platform.ready();

            const hasKeyChain = this.keychainService.getHasKeychain();
            // alert('hasKeyChain ='+hasKeyChain);
            if (hasKeyChain == false){
                this.keychainService.showFingerPrintDlg(this.ionicKey)
                    .then((res :any) => {
                        // alert('was it successful?'+res);

                        if (res == false){
                            this.showConfirm();
                        }else{
                            // this.authService.s
                            this.showAlert();
                        }
                    });
            }

        }catch (e){
            alert('catch')
            console.error(e);
        }
    }

    showAlert() {
        let alert3 = this.alertCtrl.create({
            title: 'Login successful',
            subTitle: 'You have successfully logged in.',
            buttons: ['OK']
        });
        alert3.present();

        // const v  = this.authService.isLoggedIn();
        // alert('v ='+v);
        this.nav.setRoot(ProfilePage);
    }

    showConfirm(){
        let alert2 = this.alertCtrl.create({
            message: 'Do you want to delete the key',// ' + this.ionicKey,
            title: 'Confirm deletion',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                        alert('Nothing has been deleted.');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.keychainService.deleteKeyChain(this.ionicKey)
                            .then((res:any) => {
                                if (res){
                                    alert(this.ionicKey + ' has been deleted.');
                                }else{
                                    alert('FAiled to delete keychain');
                                }
                            });

                    }
                }
            ]
        });
        alert2.present();
    }
}