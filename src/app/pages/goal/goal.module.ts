import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GoalPageRoutingModule } from './goal-routing.module';

import { GoalPage } from './goal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoalPageRoutingModule,
    RouterModule.forChild([{ path: '', component: GoalPage }])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [GoalPage]
})
export class GoalPageModule {}
