import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import {KeychainService} from '../../shared/keychain-service/keychain-service';

@Injectable()
export class AuthService {
    ionicKey = 'IONIC_KEY';

    // public currentUser :object;
    constructor(private http: Http, private keychainService: KeychainService, public events:Events) {
    }

    login(credentials) {
        return this.http.post('/api/authenticate',
            JSON.stringify(credentials))
            .map(response => {
                console.log(response.json());
                const result = response.json();
                console.log(result);
                if (result && result.token){
                    localStorage.setItem('token', result.token);
                    return true;
                }else{
                    return false;
                }
            });
    }

    //logout using local storage; commented temporarily
    // logout() {
    //     localStorage.removeItem('token');
    //
    //     const fingerPrintToken = localStorage.getItem('fingerPrintToken');
    //     if (fingerPrintToken){
    //         localStorage.removeItem('fingerPrintToken');
    //     }
    //
    //     console.clear();
    // }


    logout() {
        this.keychainService.deleteKeyChain(this.ionicKey)
            .then((res:any) => {
                alert('delete key chain result ='+ res);
            },(err:any) => {
                alert('failed to delete key');
            });
    }

    get currentUser(){
        const token = localStorage.getItem('token');
        if (!token) return null;

        return new JwtHelper().decodeToken(token);

    }

    isLoggedIn2(){
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }else{
            return true;
        }

    }


    //the fingerPrintToken is optional
    isLoggedIn() {

        const regLogin = tokenNotExpired();
        //@todo temp removed so that i can use keychain instead of localstorage
         // const fingerPrintToken = localStorage.getItem('fingerPrintToken');
        // const regLogin = false;
        // const fingerPrintToken = this.keychainService.hasKey(this.ionicKey);
        if (regLogin){
            return true;
        }else{
            // const fingerPrintToken = this.keychainService.hasKey(this.ionicKey);

            const s = this.keychainService.getHasKeychain();
            // alert('has keychain? '+s);

            if (s == false){
                return false;
            }else{
                this.events.publish('isLoggedIn',true);
                return true;
            }
            // if (fingerPrintToken){
            //     return true;
            // }else{
            //     return false;
            // }

        }

    }
}

