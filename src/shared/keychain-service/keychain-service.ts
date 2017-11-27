import { Injectable } from '@angular/core';
// import {LoginSuccessPage} from "../../pages/login-success/login-success";
import {NavController, NavParams, App,Platform} from 'ionic-angular';

import { KeychainTouchId } from '@ionic-native/keychain-touch-id';

@Injectable()
export class KeychainService{
    nav: NavController;
    hasKeyChain = false;

    constructor(private app:App,
                private keychainTouchId: KeychainTouchId) {
        console.log('Keychain service');

    }

    public getHasKeychain(){
        return this.hasKeyChain;
    }

    public showFingerPrintDlg(keychain:string){
        //first checks if the finger print functionality is available on the device
        return this.keychainTouchId.isAvailable()
            .then((res: any) => {
                alert('showFingerPrintDlg = '+this.hasKeyChain);
                // alert('finger print func available!');
                if (this.hasKeyChain == false){
                    return this.displayFingerPrint(keychain)
                                    .then((res:any) => {
                                        alert('res ='+res);
                                        if (res){
                                            this.hasKeyChain = true;
                                        }
                                        return res;
                                    });

                    // return this.hasKeyChain;
                    // return  this.hasKey(keychain)
                    //     .then((res:any) => {
                    //         //the key doesnt exist so lets open the finger print dialog!
                    //         if (res == false){
                    //             // alert('Failed! Opening the finger print dialog now');
                    //             this.displayFingerPrint(keychain)
                    //                 .then((res:any) => {
                    //                     // alert('res ='+res);
                    //                     return res;
                    //                 });
                    //         }else{
                    //             // alert('key already exists!')
                    //             //key already exists
                    //             return false;
                    //         }
                    //     });
                }else{
                    alert('Keychain is true');
                    return true;
                }

            })
            .catch((error: any) => {
                alert('error!');
                alert(error);
                alert('Fingerprint detection isnt supported by the device.');
            });
    }

    displayFingerPrint(keychain:string){
        //save the ionic key in keychain and value is VANESSA
        return this.keychainTouchId.save(keychain, 'VANESSA')
            .then((res:any) => {
                alert(keychain + ' has been saved in the keychain. ');
                if (res == 'success'){
                    // this.showAlert();
                    return true;
                }else{
                    return false;
                }
            })
            .catch((err: any) => {
                //user may have cancelled the finger print dialog
                alert('err in display: '+err);
                // return false;
            });
    }


    public hasKey(keychain:string){
        // ionicKey = 'IONIC_KEY';
        // this.keychainTouchId.verify(ionicKey, 'VANESSA')
        //     .then((res:any) => {
        //         alert(res);
        //         alert('333');
        //     })
        //     .catch((error: any) => {
        //     //secret key not available
        //
        //        alert('err!');
        //        alert(error);
        //     });

        return this.keychainTouchId.has(keychain)
            .then((res:any) => {
                alert('result = '+res);
                // alert('This key ' + keychain + ' already exists!');
                // this.showConfirm();
                this.hasKeyChain = true;
                return true;
            },(error: any) => {
                //secret key not available
                this.hasKeyChain = false;
                alert('No password stored within the ' + keychain + ' key.');
                alert(error);
                return false;
            });

        // return this.keychainTouchId.has(keychain)
        //     .then((res:any) => {
        //         alert('result = '+res);
        //         // alert('This key ' + keychain + ' already exists!');
        //         // this.showConfirm();
        //         this.hasKeyChain = true;
        //         return true;
        //     })
        //     .catch((error: any) => {
        //         //secret key not available
        //         this.hasKeyChain = false;
        //         alert('No password stored within the '+ keychain + ' key.');
        //         alert(error);
        //         return false;
        //     });
    }

    public deleteKeyChain(keychain:string){
        return this.keychainTouchId.delete(keychain)
            .then((res:any) => {
                this.hasKeyChain = false;
                alert('Success in deleting the key');
                return true;
            },(err:any) => {
                alert('Failed to delete the key');
                return false;
            });

    }

}