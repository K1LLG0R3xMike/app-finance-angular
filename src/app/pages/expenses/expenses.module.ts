import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpensesPageRoutingModule } from './expenses-routing.module';

import { ExpensesPage } from './expenses.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensesPageRoutingModule,
    RouterModule.forChild([{ path: '', component: ExpensesPage }])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ExpensesPage]
})
export class ExpensesPageModule {}
