import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
    // public currentUser :object;
    constructor(private http: Http) {
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

    logout() {
        localStorage.removeItem('token');
        console.clear();
    }

    get currentUser(){
        const token = localStorage.getItem('token');
        if (!token) return null;

        return new JwtHelper().decodeToken(token);

    }


    isLoggedIn() {

        return tokenNotExpired();
        // let jwtHelper = new JwtHelper();
        // let token = localStorage.getItem('token');
        // if (!token)
        //     return false;
        //
        // let expireDate = jwtHelper.getTokenExpirationDate(token);
        // console.log('expireDate=',expireDate);
        // let isExpired = jwtHelper.isTokenExpired(token);
        // console.log('isExpired=',isExpired);
        //
        // return !isExpired;
    }
}

