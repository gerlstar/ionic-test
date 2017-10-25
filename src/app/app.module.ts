import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {HttpModule, BaseRequestOptions} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MockBackend} from '@angular/http/testing';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio';
import {NavController, NavParams} from 'ionic-angular';
import * as _ from "lodash";

import {fakeBackendProvider} from '../shared/helpers/fake-backend';

import {MyApp} from './app.component';

import {HelloIonicPage} from '../pages/hello-ionic/hello-ionic';
import {ItemDetailsPage} from '../pages/item-details/item-details';
import {ListPage} from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import {FingerAuthPage} from '../pages/finger-auth/finger-auth';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthService} from "../shared/auth-service/auth-service";
import {FingerService} from "../shared/finger-service/finger-service";
import {LoginSuccessPage} from "../pages/login-success/login-success";

@NgModule({
    declarations: [
        MyApp,
        HelloIonicPage,
        ItemDetailsPage,
        ListPage,
        LoginPage,
        LoginSuccessPage,
        FingerAuthPage
    ],
    imports: [
        HttpModule,
        FormsModule,
        BrowserModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HelloIonicPage,
        ItemDetailsPage,
        ListPage,
        LoginPage,
        LoginSuccessPage,
        FingerAuthPage
    ],
    providers: [
        FingerService,
        StatusBar,
        FingerprintAIO,
        SplashScreen,
        AuthService,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        // For creating a mock back-end. You don't need these in a real app.
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ]
})
export class AppModule {
}
