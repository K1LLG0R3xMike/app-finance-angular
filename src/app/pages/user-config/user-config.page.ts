import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../../environments/firebaseConfig';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.page.html',
  styleUrls: ['./user-config.page.scss'],
  standalone: false,

})
export class UserConfigPage {
  constructor(private router: Router) {}

  async handleLogout() {
    try {
      await signOut(auth);
      this.router.navigate(['/signin']);
    } catch (error) {
      console.error('Logout failed', error);
      alert('Error al cerrar sesión');
    }
  }
}
