import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    RouterModule.forChild([{  path: '', component: RegisterPage }])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
