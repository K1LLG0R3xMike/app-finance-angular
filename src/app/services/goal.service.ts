import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoalInput, Goal } from '../types/goal';
import { environment } from 'src/environments/environment';

interface CreateGoalResponse {
  message: string;
  goal: Goal;
}

@Injectable({
  providedIn: 'root',
})
export class GoalService {

  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  // Crear una nueva meta
  createGoal(goal: GoalInput): Observable<CreateGoalResponse> {
    return this.http.post<CreateGoalResponse>(`${this.BASE_URL}/goals`, goal);
  }

  // Obtener metas por UID
  getGoalsByUser(uid: string): Observable<Goal[]> {
    return this.http.get<Goal[]>(`${this.BASE_URL}/goals/${uid}`);
  }

  // Eliminar una meta por ID
  deleteGoal(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.BASE_URL}/goals/${id}`);
  }

  // Actualizar una meta por ID
  updateGoal(id: string, updatedData: Partial<Omit<Goal, 'uid'>>): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.BASE_URL}/goals/${id}`, updatedData);
  }
}
