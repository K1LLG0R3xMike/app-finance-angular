import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import {  ExpenseService } from '../../services/expense.service';
import { FixedExpenseService  } from '../../services/fixed-expenses.service';
import { ExpenseInput } from '../../types/expense';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
  standalone: false,
})
export class BillsPage {
  amount: string = '';
  description: string = '';
  category: 'gastos' | 'gastos_fijos' = 'gastos';
  recurrence: string = '';
  auth = getAuth();

  constructor(private router: Router, private expenseService: ExpenseService , private fixedExpenseService: FixedExpenseService) {}

  async handleSave() {
    const user = this.auth.currentUser;
    if (!user) {
      alert('Usuario no autenticado');
      return;
    }
    if (!this.amount || !this.description || (this.category === 'gastos_fijos' && !this.recurrence)) {
      alert('Completa todos los campos');
      return;
    }

    const payload: ExpenseInput = {
      uid: user.uid,
      amount: parseFloat(this.amount),
      description: this.description,
      ...(this.category === 'gastos_fijos' && { recurrence: this.recurrence }),
    };

    try {
      if (this.category === 'gastos_fijos') {
        await this.fixedExpenseService.createFixedExpense(payload).toPromise();
      } else {
        await this.expenseService.createExpense(payload).toPromise();
      }
      alert('Gasto guardado exitosamente');
      console.log('Gasto guardado:', payload);
      this.amount = '';
      this.description = '';
      this.recurrence = '';
      this.router.navigateByUrl('/tabs/tab3');
    } catch (err) {
      console.error('Error al guardar gasto:', err);
      alert('No se pudo guardar el gasto');
    }
  }
}
