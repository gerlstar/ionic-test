import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelloIonicPage } from './hello-ionic';

@NgModule({
    declarations: [
        HelloIonicPage,
    ],
    imports: [
        IonicPageModule.forChild(HelloIonicPage),
    ],
    exports: [
        HelloIonicPage
    ]
})
export class HomeIonicModule {}
