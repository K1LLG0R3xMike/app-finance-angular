import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Expense } from '../../types/expense';
import { ExpenseService } from '../../services/expense.service';
import { FixedExpenseService } from '../../services/fixed-expenses.service';
import { ExpenseInput } from '../../types/expense';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
  standalone: false,
})
export class ExpensesPage {
  auth = getAuth();
  userId: string | null = null;
  expenses: Expense[] = [];
  category: 'gastos' | 'gastos_fijos' = 'gastos';

  constructor(private router: Router , 
              private expenseService: ExpenseService,
              private fixedExpenseService: FixedExpenseService
    ) {}

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
        this.expenseService.getExpensesByUser(this.userId).toPromise(),
        this.fixedExpenseService.getFixedExpensesByUser(this.userId).toPromise(),
      ]);
      this.expenses = [...(ocasionales || []), ...(fijos || [])];
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
