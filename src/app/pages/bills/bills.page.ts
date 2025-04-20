import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { createExpense } from '../../services/expense.service';
import { createFixedExpense } from '../../services/fixed-expenses.service';
import { ExpenseInput } from '../../types/expense';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
})
export class BillsPage {
  amount: string = '';
  description: string = '';
  category: 'gastos' | 'gastos_fijos' = 'gastos';
  recurrence: string = '';
  auth = getAuth();

  constructor(private router: Router) {}

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
        await createFixedExpense(payload);
      } else {
        await createExpense(payload);
      }
      alert('Gasto guardado exitosamente');
      this.amount = '';
      this.description = '';
      this.recurrence = '';
      this.router.navigateByUrl('/expenses');
    } catch (err) {
      console.error('Error al guardar gasto:', err);
      alert('No se pudo guardar el gasto');
    }
  }
}
