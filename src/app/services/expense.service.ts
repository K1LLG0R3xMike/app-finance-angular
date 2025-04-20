import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense, ExpenseInput } from '../types/expense';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {

  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  // Obtener gastos por usuario (UID)
  getExpensesByUser(uid: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.BASE_URL}/expenses/${uid}`);
  }

  /** Crear un gasto (occasional o fijo) */
  createExpense(data: ExpenseInput): Observable<{ message: string; expense: Expense }> {
    return this.http.post<{ message: string; expense: Expense }>(`${this.BASE_URL}/expenses`, data);
  }
}
