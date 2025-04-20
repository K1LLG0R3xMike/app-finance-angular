import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoalFormPageRoutingModule } from './goal-form-routing.module';

import { GoalFormPage } from './goal-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoalFormPageRoutingModule
  ],
  declarations: [GoalFormPage]
})
export class GoalFormPageModule {}
