import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Expense } from '../../types/expense';
import { getExpensesByUser } from '../../services/expense.service';
import { getFixedExpensesByUser } from '../../../services/fixed-expenses.service';
import { ExpenseInput } from '../../types/expense';
import { createExpense } from '../../services/expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
})
export class ExpensesPage {
  auth = getAuth();
  userId: string | null = null;
  expenses: Expense[] = [];
  category: 'gastos' | 'gastos_fijos' = 'gastos';

  constructor(private router: Router) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, user => {
      if (user) {
        this.userId = user.uid;
        this.fetchExpenses();
      }
    });
  }

  async fetchExpenses() {
    if (!this.userId) return;
    try {
      const [ocasionales, fijos] = await Promise.all([
        getExpensesByUser(this.userId),
        getFixedExpensesByUser(this.userId),
      ]);
      this.expenses = [...ocasionales, ...fijos];
    } catch (err) {
      console.error('Error cargando gastos:', err);
    }
  }

  get displayed() {
    return this.expenses.filter(e =>
      this.category === 'gastos' ? !e.recurrence : !!e.recurrence
    );
  }

  get total() {
    return this.displayed.reduce((sum, e) => sum + e.amount, 0);
  }
}
