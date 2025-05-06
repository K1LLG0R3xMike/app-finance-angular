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
      // 1) Cierra la sesión de Firebase
      await signOut(auth);
  
      // 2) Limpia las banderas que controlan el redirect
      localStorage.removeItem('authChecked');
      localStorage.removeItem('postLoginRedirect');
  
      // 3) Desenfoca el elemento actualmente activo
      const active = document.activeElement as HTMLElement;
      if (active) { active.blur(); }
  
      // 4) Navega al signin y fuerza un reload completo para reiniciar AppComponent
      this.router.navigate(['/signin']).then(() => {
        // Esto recarga toda la app y dispara ngOnInit en AppComponent
        window.location.reload();
      });
    } catch (error) {
      console.error('Logout failed', error);
      alert('Error al cerrar sesión');
    }
  }
  
  
}
