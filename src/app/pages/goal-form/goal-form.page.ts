import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { GoalInput } from '../../types/goal';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.page.html',
  styleUrls: ['./goal-form.page.scss'],
})
export class GoalFormPage {
  @Input() onSubmit?: (goalData: Omit<GoalInput, 'uid'>) => Promise<void>;
  @Input() onCancel?: () => void;

  name = '';
  description = '';
  price = '';

  private auth = getAuth();
  private db = getFirestore();

  constructor(private router: Router) {}

  async handleSave() {
    const user = this.auth.currentUser;
    if (!user) {
      alert('Usuario no autenticado');
      return;
    }

    if (!this.name && !this.description && !this.price) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const payload: Omit<GoalInput, 'uid'> = {
      name: this.name,
      description: this.description,
      price: parseFloat(this.price),
    };

    try {
      if (this.onSubmit) {
        await this.onSubmit(payload);
      } else {
        await addDoc(collection(this.db, 'metas'), {
          uid: user.uid,
          ...payload
        });
      }

      alert('Meta guardada exitosamente');
      this.name = this.description = this.price = '';

      if (this.onCancel) this.onCancel();
      else this.router.navigate(['/goal']);
    } catch (error) {
      console.error('Error al guardar la meta: ', error);
    }
  }

  handleCancel() {
    if (this.onCancel) this.onCancel();
    else this.router.navigate(['/goal']);
  }
}
