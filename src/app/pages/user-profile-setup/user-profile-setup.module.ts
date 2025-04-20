import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProfileSetupPageRoutingModule } from './user-profile-setup-routing.module';

import { UserProfileSetupPage } from './user-profile-setup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserProfileSetupPageRoutingModule
  ],
  declarations: [UserProfileSetupPage]
})
export class UserProfileSetupPageModule {}
