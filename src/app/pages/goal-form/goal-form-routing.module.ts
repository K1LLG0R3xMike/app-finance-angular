import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoalFormPage } from './goal-form.page';

const routes: Routes = [
  {
    path: '',
    component: GoalFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalFormPageRoutingModule {}
