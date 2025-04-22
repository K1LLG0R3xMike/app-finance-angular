import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    RouterModule.forChild([{  path: '', component: DashboardPage }]),
    BaseChartDirective

  ],
  providers: [
    provideCharts(withDefaultRegisterables())
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
