import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Goal as GoalType, GoalInput } from '../../types/goal';
import {GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.page.html',
  styleUrls: ['./goal.page.scss'],
  standalone: false,

})
export class GoalPage {
  auth = getAuth();
  userId: string | null = null;
  goals: GoalType[] = [];
  showModal = false;

  constructor(private router: Router
    , private goalService: GoalService) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, user => {
      if (user) {
        this.userId = user.uid;
        this.fetchGoals();
      }
    });
  }

  async fetchGoals() {
    if (!this.userId) return;
    try {
      this.goalService.getGoalsByUser(this.userId).subscribe({
        next: (data) => {
          this.goals = data;
        },
        error: (err) => {
          console.error('Error cargando metas:', err);
        },
      });
    } catch (err) {
      console.error('Error cargando metas:', err);
    }
  }

  async handleCreate(newGoal: Omit<GoalInput, 'uid'>) {
    if (!this.userId) return;
    try {
      this.goalService.createGoal({ ...newGoal, uid: this.userId });
      this.showModal = false;
      this.fetchGoals();
    } catch (err) {
      console.error('Error creando meta:', err);
    }
  }

  async handleDelete(id: string) {
    try {
      this.goalService.deleteGoal(id);
      this.fetchGoals();
    } catch (err) {
      console.error('Error eliminando meta:', err);
    }
  }

  get total() {
    return this.goals.reduce((sum, g) => sum + g.price, 0);
  }
}
