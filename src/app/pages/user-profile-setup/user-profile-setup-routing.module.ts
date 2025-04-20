import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileSetupPage } from './user-profile-setup.page';

const routes: Routes = [
  {
    path: '',
    component: UserProfileSetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileSetupPageRoutingModule {}
