import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginSuccessPage } from './login-success';

@NgModule({
  declarations: [
    LoginSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginSuccessPage),
  ],
})
export class LoginSuccessPageModule {}
