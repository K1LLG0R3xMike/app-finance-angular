import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense, ExpenseInput } from '../types/expense';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FixedExpenseService {

  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  // Obtener gastos fijos por UID
  getFixedExpensesByUser(uid: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.BASE_URL}/fixed_expenses/${uid}`);
  }

  // Crear gasto fijo
  createFixedExpense(expense: ExpenseInput): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL}/fixed_expenses`, expense);
  }
}
