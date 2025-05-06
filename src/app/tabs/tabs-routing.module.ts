import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../pages/goal/goal.module').then(m => m.GoalPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../pages/expenses/expenses.module').then(m => m.ExpensesPageModule)
      },
      {
        path: '',
        redirectTo: 'tab1',  // ✅ Ruta relativa
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs',  // ✅ Solo redirige a /tabs (no pongas tab1 aquí)
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]  // ✅ Esto faltaba
})
export class TabsPageRoutingModule {}
