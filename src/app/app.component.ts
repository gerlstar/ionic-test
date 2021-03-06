import {Component, ViewChild} from '@angular/core';
import * as _ from "lodash";
import {Platform, MenuController, Nav} from 'ionic-angular';

import {HelloIonicPage} from '../pages/hello-ionic/hello-ionic';
import {ListPage} from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import {ProfilePage} from "../pages/profile/profile";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {AuthService} from "../shared/auth-service/auth-service";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    // make HelloIonicPage the root (or first) page
    rootPage = HelloIonicPage;
    pages: Array<{ title: string, component: any, componentStr: string }>;

    constructor(public platform: Platform,
                public menu: MenuController,
                public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                public authService: AuthService) {
        this.initializeApp();

        // set our app's pages
        this.pages = [
            {title: 'Hello Ionic', component: HelloIonicPage, componentStr: 'HelloIonicPage'},
            {title: 'My First List', component: ListPage, componentStr: 'ListPage'},
            {title: 'Login', component: LoginPage, componentStr: 'LoginPage'},
            {title: 'Profile', component: ProfilePage, componentStr: 'ProfilePage'}
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    }

    openPage2(strC) {
        // console.log(strC);
        const c = _.find(this.pages, function (o) {
            return o.componentStr === strC;
        });
        if (c != undefined) {
            this.openPage(c);
        }


    }

    logout() {
        this.nav.setRoot(HelloIonicPage);
        this.authService.logout();
    }
}
