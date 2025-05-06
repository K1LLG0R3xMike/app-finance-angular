import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../environments/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  async ngOnInit() {
    // 1) Primero, intentamos procesar el resultado del redirect (si venimos de Google)
    try {
      const result = await getRedirectResult(auth);
      if (result && result.user) {
        await this.handleUser({
          uid: result.user.uid,
          displayName: result.user.displayName ?? undefined,
          email: result.user.email ?? undefined,
          photoURL: result.user.photoURL ?? undefined,
        });
        return;
      }
    } catch (err) {
      console.error('Error al procesar redirección de Google:', err);
      // opcionalmente: this.router.navigate(['/error']);
      // Log the error and optionally navigate to an error page
      console.error('Error al procesar redirección de Google:', err);
      // opcionalmente: this.router.navigate(['/error']);
    }

    // 2) Si ya hay un usuario autenticado (sin venir del redirect), también lo manejamos
    onAuthStateChanged(auth, async user => {
      if (user) {
        await this.handleUser({
          uid: user.uid,
          displayName: user.displayName ?? undefined,
          email: user.email ?? undefined,
          photoURL: user.photoURL ?? undefined,
        });
      }
    });
  }

  private async handleUser(user: { uid: string; displayName?: string; email?: string; photoURL?: string }) {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      console.log('Usuario existente, vamos al dashboard');
      console.log('Datos del usuario:', user);

      this.router.navigate(['/tabs/tab1']);
    } else {
      console.log('Usuario nuevo, creando perfil');
      const userProfile = {
        fullName: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || 'default-profile.png',
      };
      await setDoc(userDocRef, userProfile);
      this.router.navigate(['/user-profile-setup']);
    }
  }
}
