import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {NavController, NavParams} from 'ionic-angular';

import {HelloIonicPage} from '../../pages/hello-ionic/hello-ionic';
import {LoginSuccessPage} from "../../pages/login-success/login-success";
import {AuthService} from "../../shared/auth-service/auth-service";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})

export class LoginPage {

    authForm: FormGroup;

    constructor(private authService: AuthService, public nav: NavController, public navParams: NavParams,
                public formBuilder: FormBuilder) {

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

    onSubmit(credentials: any): void {
        // if(this.authForm.valid) {
        //     window.localStorage.setItem('username', value.username);
        //     window.localStorage.setItem('password', value.password);
        this.authService.login(credentials)
            .subscribe(result => {
                if (result)
                // this.router.navigate(['/login-success']);
                    this.nav.push(LoginSuccessPage);
                else{
                    console.error('error..');
                }
                // this.invalidLogin = true;
            });


        // }
    }
}